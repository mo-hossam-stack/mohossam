import type {
	ProblemSolvingPlatformData,
	ProblemSolvingRatingPoint,
	ProblemSolvingRecentItem,
} from "../../types/problem-solving";
import {
	PLATFORM_META,
	buildProviderState,
	buildRatingPoints,
	formatErrorMessage,
	toActivity,
	uniqueRecentActivity,
} from "./shared";

const CODEFORCES_API = "https://codeforces.com/api";
const CODEFORCES_DELAY_MS = 2100;
const CODEFORCES_HISTORY_LIMIT = 5000;

type CodeforcesEnvelope<T> = {
	status: "OK" | "FAILED";
	comment?: string;
	result: T;
};

type CodeforcesUser = {
	handle: string;
	rating?: number;
	maxRating?: number;
	rank?: string;
	maxRank?: string;
	contribution?: number;
	friendOfCount?: number;
	avatar?: string;
	titlePhoto?: string;
};

type CodeforcesRatingEntry = {
	contestId: number;
	contestName: string;
	rank: number;
	oldRating: number;
	newRating: number;
	ratingUpdateTimeSeconds: number;
};

type CodeforcesSubmission = {
	id: number;
	creationTimeSeconds: number;
	programmingLanguage?: string;
	verdict?: string;
	problem?: {
		contestId?: number;
		index?: string;
		name?: string;
	};
};

export async function getCodeforcesProfile(): Promise<ProblemSolvingPlatformData> {
	const meta = PLATFORM_META.codeforces;

	try {
		const user = await fetchCodeforcesUser();
		await waitForRateLimit();
		const ratingHistory = await fetchCodeforcesRatingHistory();
		await waitForRateLimit();
		const submissions = await fetchCodeforcesSubmissions();

		const solvedSet = new Set<string>();
		const activityMap: Record<string, number> = {};
		const recentAccepted: ProblemSolvingRecentItem[] = [];

		for (const submission of submissions) {
			const problemKey = buildProblemKey(submission);
			const date = new Date(submission.creationTimeSeconds * 1000)
				.toISOString()
				.slice(0, 10);

			if (submission.verdict === "OK") {
				solvedSet.add(problemKey);
				activityMap[date] = (activityMap[date] ?? 0) + 1;

				recentAccepted.push({
					id: `${submission.id}`,
					title: submission.problem?.name ?? "Solved problem",
					url: buildProblemUrl(submission),
					status: "Accepted",
					timestamp: submission.creationTimeSeconds,
					language: submission.programmingLanguage,
					subtitle: `Codeforces ${submission.problem?.contestId ?? ""}${submission.problem?.index ? ` · ${submission.problem.index}` : ""}`.trim(),
				});
			}
		}

		const contestHistory = ratingHistory.map<ProblemSolvingRatingPoint>((entry) => ({
			label: entry.contestName,
			timestamp: entry.ratingUpdateTimeSeconds,
			value: entry.newRating,
			rank: entry.rank,
		}));

		return {
			platform: "codeforces",
			label: meta.label,
			handle: meta.handle,
			profileUrl: meta.profileUrl,
			accent: meta.accent,
			description: `Distinct problems solved, rated contests entered, and algorithmic speed sharpened in live competitive settings.`,
			avatarUrl: user.titlePhoto ?? user.avatar ?? null,
			metrics: {
				solved: solvedSet.size,
				currentRating: user.rating ?? null,
				maxRating: user.maxRating ?? user.rating ?? null,
				contests: ratingHistory.length,
			},
			insights: [
				{ label: "Rank", value: user.rank ?? "Unrated" },
				{ label: "Peak", value: user.maxRank ?? user.rank ?? "—" },
				{ label: "Contribution", value: `${user.contribution ?? 0}` },
				{ label: "Friends Of", value: `${user.friendOfCount ?? 0}` },
			],
			difficultyBreakdown: [],
			activity: toActivity(activityMap),
			recentActivity: uniqueRecentActivity(recentAccepted),
			contestHistory: buildRatingPoints(contestHistory, 9),
			status: buildProviderState({
				ok: true,
				source: meta.source,
			}),
		};
	} catch (error) {
		throw new Error(formatErrorMessage(error));
	}
}

async function fetchCodeforcesUser(): Promise<CodeforcesUser> {
	const response = await fetchCodeforces<CodeforcesUser[]>(
		`user.info?handles=${PLATFORM_META.codeforces.handle}`,
	);

	const [user] = response;

	if (!user) {
		throw new Error("Codeforces profile data is empty.");
	}

	return user;
}

function fetchCodeforcesRatingHistory(): Promise<CodeforcesRatingEntry[]> {
	return fetchCodeforces<CodeforcesRatingEntry[]>(
		`user.rating?handle=${PLATFORM_META.codeforces.handle}`,
	);
}

function fetchCodeforcesSubmissions(): Promise<CodeforcesSubmission[]> {
	return fetchCodeforces<CodeforcesSubmission[]>(
		`user.status?handle=${PLATFORM_META.codeforces.handle}&from=1&count=${CODEFORCES_HISTORY_LIMIT}`,
	);
}

async function fetchCodeforces<T>(path: string): Promise<T> {
	const response = await fetch(`${CODEFORCES_API}/${path}`);

	if (!response.ok) {
		throw new Error(`Codeforces request failed with ${response.status}.`);
	}

	const payload = (await response.json()) as CodeforcesEnvelope<T>;

	if (payload.status !== "OK") {
		throw new Error(payload.comment ?? "Codeforces request was not successful.");
	}

	return payload.result;
}

function buildProblemKey(submission: CodeforcesSubmission): string {
	const contestId = submission.problem?.contestId ?? "practice";
	const index = submission.problem?.index ?? submission.problem?.name ?? submission.id;

	return `${contestId}-${index}`;
}

function buildProblemUrl(submission: CodeforcesSubmission): string {
	const contestId = submission.problem?.contestId;
	const index = submission.problem?.index;

	if (!contestId || !index) {
		return PLATFORM_META.codeforces.profileUrl;
	}

	return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
}

function waitForRateLimit(): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, CODEFORCES_DELAY_MS);
	});
}

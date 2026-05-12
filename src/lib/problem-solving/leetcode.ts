import type {
	ProblemSolvingDifficultyBreakdown,
	ProblemSolvingPlatformData,
	ProblemSolvingRatingPoint,
	ProblemSolvingRecentItem,
} from "../../types/problem-solving";
import {
	PLATFORM_META,
	buildProviderState,
	buildRatingPoints,
	formatErrorMessage,
	safeParseJsonMap,
	toActivity,
	uniqueRecentActivity,
} from "./shared";

const LEETCODE_API = "https://leetcode.com/graphql";

const PROFILE_QUERY = `
	query problemSolvingProfile($username: String!) {
		matchedUser(username: $username) {
			username
			profile {
				realName
				ranking
				reputation
				starRating
				userAvatar
			}
			submitStats {
				acSubmissionNum {
					difficulty
					count
					submissions
				}
			}
			contributions {
				points
				questionCount
				testcaseCount
			}
			submissionCalendar
		}
		recentSubmissionList(username: $username) {
			title
			titleSlug
			statusDisplay
			lang
			timestamp
		}
		allQuestionsCount {
			difficulty
			count
		}
	}
`;

const CONTEST_QUERY = `
	query problemSolvingContest($username: String!) {
		userContestRanking(username: $username) {
			attendedContestsCount
			rating
			globalRanking
			topPercentage
			totalParticipants
			badge {
				name
			}
		}
		userContestRankingHistory(username: $username) {
			attended
			trendDirection
			problemsSolved
			totalProblems
			finishTimeInSeconds
			rating
			ranking
			contest {
				title
				startTime
			}
		}
	}
`;

type LeetCodeProfileResponse = {
	matchedUser: {
		username: string;
		profile: {
			realName?: string;
			ranking?: number;
			reputation?: number;
			starRating?: number;
			userAvatar?: string;
		};
		submitStats: {
			acSubmissionNum: Array<{
				difficulty: string;
				count: number;
				submissions: number;
			}>;
		};
		contributions?: {
			points?: number;
			questionCount?: number;
			testcaseCount?: number;
		};
		submissionCalendar?: string;
	} | null;
	recentSubmissionList: Array<{
		title: string;
		titleSlug: string;
		statusDisplay: string;
		lang: string;
		timestamp: string;
	}>;
	allQuestionsCount: Array<{
		difficulty: string;
		count: number;
	}>;
};

type LeetCodeContestResponse = {
	userContestRanking: {
		attendedContestsCount?: number;
		rating?: number;
		globalRanking?: number;
		topPercentage?: number;
		totalParticipants?: number;
		badge?: { name?: string } | null;
	} | null;
	userContestRankingHistory: Array<{
		attended: boolean;
		problemsSolved?: number;
		totalProblems?: number;
		finishTimeInSeconds?: number;
		rating?: number;
		ranking?: number;
		contest?: {
			title?: string;
			startTime?: number;
		};
	}>;
};

type GraphQlEnvelope<T> = {
	data?: T;
	errors?: Array<{ message: string }>;
};

export async function getLeetCodeProfile(): Promise<ProblemSolvingPlatformData> {
	const meta = PLATFORM_META.leetcode;

	try {
		const [profilePayload, contestPayload] = await Promise.all([
			fetchLeetCode<LeetCodeProfileResponse>(PROFILE_QUERY),
			fetchLeetCode<LeetCodeContestResponse>(CONTEST_QUERY),
		]);

		const matchedUser = profilePayload.matchedUser;

		if (!matchedUser) {
			throw new Error("LeetCode user data is unavailable.");
		}

		const acceptedStats = matchedUser.submitStats.acSubmissionNum;
		const solved = resolveAllDifficultyCount(acceptedStats);
		const breakdown = resolveDifficultyBreakdown(acceptedStats);
		const recentActivity = profilePayload.recentSubmissionList.map<ProblemSolvingRecentItem>((item) => ({
			id: `${item.titleSlug}-${item.timestamp}-${item.lang}`,
			title: item.title,
			url: `https://leetcode.com/problems/${item.titleSlug}/`,
			status: item.statusDisplay,
			timestamp: Number(item.timestamp),
			language: item.lang,
			subtitle: `LeetCode · ${item.lang}`,
		}));

		const contestHistory = contestPayload.userContestRankingHistory
			.filter((entry) => entry.attended && entry.rating)
			.map<ProblemSolvingRatingPoint>((entry) => ({
				label: entry.contest?.title ?? "Contest",
				timestamp: entry.contest?.startTime ?? entry.finishTimeInSeconds ?? 0,
				value: Math.round(entry.rating ?? 0),
				rank: entry.ranking ?? null,
			}));

		const currentRating = contestPayload.userContestRanking?.rating
			? Math.round(contestPayload.userContestRanking.rating)
			: null;
		const peakRating = contestHistory.reduce(
			(max, item) => Math.max(max, item.value),
			currentRating ?? 0,
		);

		return {
			platform: "leetcode",
			label: meta.label,
			handle: meta.handle,
			profileUrl: meta.profileUrl,
			accent: meta.accent,
			description: `Pattern depth, clean accepted solutions, and a steady feedback loop built through consistent practice.`,
			avatarUrl: matchedUser.profile.userAvatar ?? null,
			metrics: {
				solved,
				currentRating,
				maxRating: peakRating > 0 ? peakRating : currentRating,
				contests:
					contestPayload.userContestRanking?.attendedContestsCount ??
					contestHistory.length,
			},
			insights: [],
			difficultyBreakdown: breakdown,
			activity: toActivity(resolveLeetCodeActivityMap(matchedUser.submissionCalendar)),
			recentActivity: uniqueRecentActivity(recentActivity),
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

async function fetchLeetCode<T>(query: string): Promise<T> {
	const response = await fetch(LEETCODE_API, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			origin: "https://leetcode.com",
			referer: `${PLATFORM_META.leetcode.profileUrl}`,
			"user-agent":
				"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
		},
		body: JSON.stringify({
			query,
			variables: { username: PLATFORM_META.leetcode.handle },
		}),
	});

	if (!response.ok) {
		throw new Error(`LeetCode request failed with ${response.status}.`);
	}

	const payload = (await response.json()) as GraphQlEnvelope<T>;

	if (!payload.data) {
		throw new Error(payload.errors?.[0]?.message ?? "LeetCode returned no data.");
	}

	return payload.data;
}

function resolveAllDifficultyCount(
	stats: Array<{ difficulty: string; count: number }>,
): number {
	const allDifficulty = stats.find((item) => item.difficulty.toLowerCase() === "all");

	if (allDifficulty) {
		return allDifficulty.count;
	}

	return stats.reduce((sum, item) => sum + item.count, 0);
}

function resolveDifficultyBreakdown(
	stats: Array<{ difficulty: string; count: number }>,
): ProblemSolvingDifficultyBreakdown[] {
	return stats
		.filter((item) => item.difficulty.toLowerCase() !== "all")
		.map((item) => ({
			label: item.difficulty,
			count: item.count,
		}));
}

function resolveLeetCodeActivityMap(
	payload: string | undefined,
): Record<string, number> {
	const parsed = safeParseJsonMap(payload);

	return Object.entries(parsed).reduce<Record<string, number>>((map, [key, value]) => {
		const timestamp = Number(key);
		if (Number.isNaN(timestamp)) {
			return map;
		}

		const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
		map[date] = value;
		return map;
	}, {});
}

function formatNullableNumber(value: number | undefined): string {
	if (typeof value !== "number" || Number.isNaN(value)) {
		return "—";
	}

	return new Intl.NumberFormat("en-US").format(Math.round(value));
}

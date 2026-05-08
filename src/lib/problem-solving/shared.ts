import type {
	ProblemSolvingActivity,
	ProblemSolvingActivityDay,
	ProblemSolvingPlatform,
	ProblemSolvingPlatformData,
	ProblemSolvingProviderState,
	ProblemSolvingRatingPoint,
	ProblemSolvingRecentItem,
	ProblemSolvingResponse,
	ProblemSolvingSummary,
} from "../../types/problem-solving";

const DAY_MS = 1000 * 60 * 60 * 24;
const DEFAULT_ACTIVITY_DAYS = 84;

type PlatformMeta = {
	label: string;
	handle: string;
	profileUrl: string;
	accent: string;
	description: string;
	source: string;
};

export const PLATFORM_META: Record<ProblemSolvingPlatform, PlatformMeta> = {
	codeforces: {
		label: "Codeforces",
		handle: "MOHAMEDHOSSAM34",
		profileUrl: "https://codeforces.com/profile/MOHAMEDHOSSAM34",
		accent: "#1f8dd6",
		description:
			"Contest pressure, rating climbs, and problem solving under real competitive time limits.",
		source: "codeforces-official-api",
	},
	leetcode: {
		label: "LeetCode",
		handle: "MOHAMEDHOSSAM2112",
		profileUrl: "https://leetcode.com/u/MOHAMEDHOSSAM2112/",
		accent: "#ffa116",
		description:
			"Deliberate daily practice across patterns, clean implementations, and steady algorithmic refinement.",
		source: "leetcode-graphql",
	},
};

export function buildProviderState(
	state: Partial<ProblemSolvingProviderState> & Pick<ProblemSolvingProviderState, "ok" | "source">,
): ProblemSolvingProviderState {
	return {
		cached: false,
		message: null,
		fetchedAt: new Date().toISOString(),
		...state,
	};
}

export function formatErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	return "Unable to load fresh data right now.";
}

export function toActivity(
	activityMap: Record<string, number>,
	rangeLabel = "Last 12 weeks",
	dayCount = DEFAULT_ACTIVITY_DAYS,
): ProblemSolvingActivity {
	const days = buildActivityDays(activityMap, dayCount);
	const total = days.reduce((sum, item) => sum + item.count, 0);
	const activeDays = days.filter((item) => item.count > 0).length;
	const peakDay = days.reduce((max, item) => Math.max(max, item.count), 0);

	return {
		rangeLabel,
		total,
		activeDays,
		peakDay,
		currentStreak: calculateCurrentStreak(days),
		days,
	};
}

export function buildRatingPoints(
	points: ProblemSolvingRatingPoint[],
	limit = 8,
): ProblemSolvingRatingPoint[] {
	return points.slice(-limit);
}

export function createUnavailablePlatform(
	platform: ProblemSolvingPlatform,
	message: string,
	fallback?: ProblemSolvingPlatformData,
): ProblemSolvingPlatformData {
	const meta = PLATFORM_META[platform];

	if (fallback) {
		return {
			...fallback,
			status: buildProviderState({
				ok: false,
				cached: true,
				message,
				source: `${meta.source}-snapshot`,
			}),
		};
	}

	return {
		platform,
		label: meta.label,
		handle: meta.handle,
		profileUrl: meta.profileUrl,
		accent: meta.accent,
		description: meta.description,
		avatarUrl: null,
		metrics: {
			solved: 0,
			currentRating: null,
			maxRating: null,
			contests: 0,
		},
		insights: [{ label: "Status", value: "Temporarily unavailable" }],
		difficultyBreakdown: [],
		activity: toActivity({}, "Last 12 weeks"),
		recentActivity: [],
		contestHistory: [],
		status: buildProviderState({
			ok: false,
			cached: false,
			message,
			source: meta.source,
		}),
	};
}

export function buildSummary(
	platforms: ProblemSolvingPlatformData[],
): ProblemSolvingSummary {
	const totalSolved = platforms.reduce(
		(sum, item) => sum + item.metrics.solved,
		0,
	);
	const combinedContests = platforms.reduce(
		(sum, item) => sum + item.metrics.contests,
		0,
	);
	const activeDays = platforms.reduce(
		(sum, item) => sum + item.activity.activeDays,
		0,
	);
	const ratings = platforms
		.flatMap((item) => [item.metrics.currentRating, item.metrics.maxRating])
		.filter((value): value is number => typeof value === "number" && !Number.isNaN(value));

	return {
		totalSolved,
		combinedContests,
		activeDays,
		strongestRating: ratings.length > 0 ? Math.max(...ratings) : null,
	};
}

export function createResponse(platforms: ProblemSolvingPlatformData[]): ProblemSolvingResponse {
	return {
		generatedAt: new Date().toISOString(),
		summary: buildSummary(platforms),
		platforms,
	};
}

export function safeParseJsonMap(payload: string | null | undefined): Record<string, number> {
	if (!payload) {
		return {};
	}

	try {
		const parsed = JSON.parse(payload) as Record<string, number>;
		return Object.entries(parsed).reduce<Record<string, number>>((map, [key, value]) => {
			const numericValue = Number(value);
			if (!Number.isNaN(numericValue)) {
				map[key] = numericValue;
			}
			return map;
		}, {});
	} catch {
		return {};
	}
}

export function uniqueRecentActivity(items: ProblemSolvingRecentItem[], limit = 5): ProblemSolvingRecentItem[] {
	const seen = new Set<string>();
	const uniqueItems: ProblemSolvingRecentItem[] = [];

	for (const item of items) {
		if (seen.has(item.id)) {
			continue;
		}

		seen.add(item.id);
		uniqueItems.push(item);

		if (uniqueItems.length === limit) {
			break;
		}
	}

	return uniqueItems;
}

function buildActivityDays(
	activityMap: Record<string, number>,
	dayCount: number,
): ProblemSolvingActivityDay[] {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const baseDays = Array.from({ length: dayCount }, (_, index) => {
		const date = new Date(today.getTime() - (dayCount - index - 1) * DAY_MS);
		const isoDate = date.toISOString().slice(0, 10);
		const count = activityMap[isoDate] ?? 0;

		return {
			date: isoDate,
			count,
			level: 0,
		};
	});

	const maxCount = baseDays.reduce((max, item) => Math.max(max, item.count), 0);

	return baseDays.map((item) => ({
		...item,
		level: resolveActivityLevel(item.count, maxCount),
	}));
}

function calculateCurrentStreak(days: ProblemSolvingActivityDay[]): number {
	let streak = 0;

	for (let index = days.length - 1; index >= 0; index -= 1) {
		if (days[index]?.count === 0) {
			if (streak === 0) {
				continue;
			}

			break;
		}

		streak += 1;
	}

	return streak;
}

function resolveActivityLevel(count: number, maxCount: number): 0 | 1 | 2 | 3 | 4 {
	if (count <= 0 || maxCount <= 0) {
		return 0;
	}

	const ratio = count / maxCount;

	if (ratio >= 0.75) {
		return 4;
	}

	if (ratio >= 0.5) {
		return 3;
	}

	if (ratio >= 0.25) {
		return 2;
	}

	return 1;
}

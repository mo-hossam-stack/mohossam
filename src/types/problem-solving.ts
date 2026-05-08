export type ProblemSolvingPlatform = "codeforces" | "leetcode";

export type ProblemSolvingActivityDay = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

export type ProblemSolvingActivity = {
	rangeLabel: string;
	total: number;
	activeDays: number;
	currentStreak: number;
	peakDay: number;
	days: ProblemSolvingActivityDay[];
};

export type ProblemSolvingRecentItem = {
	id: string;
	title: string;
	url: string;
	status: string;
	timestamp: number;
	language?: string;
	subtitle?: string;
};

export type ProblemSolvingRatingPoint = {
	label: string;
	timestamp: number;
	value: number;
	rank?: number | null;
};

export type ProblemSolvingInsight = {
	label: string;
	value: string;
};

export type ProblemSolvingProviderState = {
	ok: boolean;
	cached: boolean;
	message: string | null;
	fetchedAt: string;
	source: string;
};

export type ProblemSolvingMetrics = {
	solved: number;
	currentRating: number | null;
	maxRating: number | null;
	contests: number;
};

export type ProblemSolvingDifficultyBreakdown = {
	label: string;
	count: number;
};

export type ProblemSolvingPlatformData = {
	platform: ProblemSolvingPlatform;
	label: string;
	handle: string;
	profileUrl: string;
	accent: string;
	description: string;
	avatarUrl: string | null;
	metrics: ProblemSolvingMetrics;
	insights: ProblemSolvingInsight[];
	difficultyBreakdown: ProblemSolvingDifficultyBreakdown[];
	activity: ProblemSolvingActivity;
	recentActivity: ProblemSolvingRecentItem[];
	contestHistory: ProblemSolvingRatingPoint[];
	status: ProblemSolvingProviderState;
};

export type ProblemSolvingSummary = {
	totalSolved: number;
	combinedContests: number;
	activeDays: number;
	strongestRating: number | null;
};

export type ProblemSolvingResponse = {
	generatedAt: string;
	summary: ProblemSolvingSummary;
	platforms: ProblemSolvingPlatformData[];
};

export type ProblemSolvingErrorResponse = {
	error: {
		code: string;
		message: string;
	};
	meta: {
		timestamp: string;
	};
};

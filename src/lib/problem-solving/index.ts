import type {
	ProblemSolvingPlatform,
	ProblemSolvingPlatformData,
	ProblemSolvingResponse,
} from "../../types/problem-solving";
import { getCodeforcesProfile } from "./codeforces";
import { getLeetCodeProfile } from "./leetcode";
import {
	createResponse,
	createUnavailablePlatform,
	formatErrorMessage,
} from "./shared";

const CACHE_TTL_MS = 1000 * 60 * 15;

type CacheEntry = {
	data: ProblemSolvingResponse;
	expiresAt: number;
};

let responseCache: CacheEntry | null = null;

const platformSnapshots: Partial<Record<ProblemSolvingPlatform, ProblemSolvingPlatformData>> = {};

export async function getProblemSolvingData(): Promise<ProblemSolvingResponse> {
	const now = Date.now();

	if (responseCache && responseCache.expiresAt > now) {
		return responseCache.data;
	}

	const providers = [
		loadProvider("codeforces", getCodeforcesProfile),
		loadProvider("leetcode", getLeetCodeProfile),
	] as const;

	const platforms = await Promise.all(providers);
	const payload = createResponse(platforms);

	responseCache = {
		data: payload,
		expiresAt: now + CACHE_TTL_MS,
	};

	return payload;
}

async function loadProvider(
	platform: ProblemSolvingPlatform,
	loader: () => Promise<ProblemSolvingPlatformData>,
): Promise<ProblemSolvingPlatformData> {
	try {
		const data = await loader();
		platformSnapshots[platform] = data;
		return data;
	} catch (error) {
		return createUnavailablePlatform(
			platform,
			formatErrorMessage(error),
			platformSnapshots[platform],
		);
	}
}

import type { APIRoute } from "astro";
import { getProblemSolvingData } from "../../lib/problem-solving";
import type { ProblemSolvingErrorResponse } from "../../types/problem-solving";

export const prerender = false;

const CACHE_CONTROL = "public, max-age=0, s-maxage=900, stale-while-revalidate=43200";

export const GET: APIRoute = async () => {
	try {
		const data = await getProblemSolvingData();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": CACHE_CONTROL,
			},
		});
	} catch (error) {
		const body: ProblemSolvingErrorResponse = {
			error: {
				code: "PROBLEM_SOLVING_UNAVAILABLE",
				message:
					error instanceof Error
						? error.message
						: "Unable to load problem solving data.",
			},
			meta: {
				timestamp: new Date().toISOString(),
			},
		};

		return new Response(JSON.stringify(body), {
			status: 500,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "no-store",
			},
		});
	}
};

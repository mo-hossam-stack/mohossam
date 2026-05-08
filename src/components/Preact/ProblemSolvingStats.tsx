import type { ComponentChildren } from "preact";
import { Activity, ExternalLink, LoaderCircle, RefreshCcw, ShieldAlert, Trophy } from "lucide-preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import type {
	ProblemSolvingErrorResponse,
	ProblemSolvingPlatformData,
	ProblemSolvingResponse,
} from "../../types/problem-solving";

type ProblemSolvingState =
	| { status: "loading"; data: null; error: null }
	| { status: "success"; data: ProblemSolvingResponse; error: null }
	| { status: "error"; data: null; error: string };

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit",
});

const INITIAL_STATE: ProblemSolvingState = {
	status: "loading",
	data: null,
	error: null,
};

export default function ProblemSolvingStats() {
	const [state, setState] = useState<ProblemSolvingState>(INITIAL_STATE);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadData = useCallback(async (refresh = false, signal?: AbortSignal) => {
		const requestUrl = refresh
			? `/api/problem-solving?refresh=${Date.now()}`
			: "/api/problem-solving";

		setState((current) => {
			if (current.status === "success") {
				return current;
			}

			return INITIAL_STATE;
		});
		setIsRefreshing(refresh);

		try {
			const response = await fetch(requestUrl, {
				signal,
				headers: {
					accept: "application/json",
				},
			});

			const payload = (await response.json()) as
				| ProblemSolvingResponse
				| ProblemSolvingErrorResponse;

			if (!response.ok || "error" in payload) {
				throw new Error(
					"error" in payload
						? payload.error.message
						: "Unable to load problem-solving stats.",
				);
			}

			setState({ status: "success", data: payload, error: null });
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				return;
			}

			setState({
				status: "error",
				data: null,
				error:
					error instanceof Error
						? error.message
						: "Unable to load problem-solving stats.",
			});
		} finally {
			setIsRefreshing(false);
		}
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		void loadData(false, controller.signal);

		return () => controller.abort();
	}, [loadData]);

	if (state.status === "loading") {
		return <ProblemSolvingSkeleton />;
	}

	if (state.status === "error") {
		return (
			<div className="rounded-[2rem] border border-red-400/20 bg-red-500/5 p-6 text-[var(--text)] shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
				<div className="flex items-start gap-4">
					<div className="rounded-2xl bg-red-500/10 p-3 text-red-300">
						<ShieldAlert size={24} />
					</div>
					<div className="space-y-2">
						<h3 className="font-ubuntu text-[1.4rem]">Live coding data is warming up</h3>
						<p className="max-w-2xl text-sm leading-7 text-[var(--textMuted)]">
							{state.error}. The section shell is ready, but one or more upstream sources did not respond this time.
						</p>
						<button
							className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all duration-300 hover:border-[var(--primaryColor)] hover:text-primary"
							onClick={() => void loadData(true)}
							type="button"
						>
							<RefreshCcw size={16} />
							Try again
						</button>
					</div>
				</div>
			</div>
		);
	}

	const { data } = state;

	return (
		<div className="space-y-6">
			<div className="rounded-[2rem] border border-[var(--borderColor)] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:p-8">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl space-y-3">
						<p className="text-xs uppercase tracking-[0.35em] text-[var(--textDim)]">
							live profile snapshot
						</p>
						<h3 className="font-ubuntu text-[1.9rem] leading-tight text-[var(--text)] lg:text-[2.3rem]">
							From daily reps to contest adrenaline — this is the data trail behind the journey.
						</h3>
						<p className="text-sm leading-7 text-[var(--textMuted)] lg:text-base">
							A combined stream of accepted problems, contests, rating motion, and recent wins pulled from Codeforces and LeetCode.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<SummaryPill icon={<Trophy size={16} />} label="problems solved" value={formatValue(data.summary.totalSolved)} />
						<SummaryPill icon={<Activity size={16} />} label="active days" value={formatValue(data.summary.activeDays)} />
						<SummaryPill icon={<LoaderCircle size={16} />} label="contests" value={formatValue(data.summary.combinedContests)} />
					</div>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
					<SummaryCard label="Total solved" value={formatValue(data.summary.totalSolved)} />
					<SummaryCard label="Combined contests" value={formatValue(data.summary.combinedContests)} />
					<SummaryCard label="Tracked active days" value={formatValue(data.summary.activeDays)} />
					<SummaryCard
						label="Strongest rating"
						value={formatNullableRating(data.summary.strongestRating)}
					/>
				</div>

				<div className="mt-6 flex flex-col gap-3 text-sm text-[var(--textMuted)] sm:flex-row sm:items-center sm:justify-between">
					<p>
						Synced {dateFormatter.format(new Date(data.generatedAt))} · server-side cached for speed and stability.
					</p>
					<button
						className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all duration-300 hover:border-[var(--primaryColor)] hover:text-primary disabled:opacity-60"
						disabled={isRefreshing}
						onClick={() => void loadData(true)}
						type="button"
					>
						<RefreshCcw className={isRefreshing ? "animate-spin" : ""} size={16} />
						Refresh snapshot
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				{data.platforms.map((platform) => (
					<PlatformCard key={platform.platform} platform={platform} />
				))}
			</div>
		</div>
	);
}

function PlatformCard({ platform }: { platform: ProblemSolvingPlatformData }) {
	const isHealthy = platform.status.ok;

	return (
		<article className="group relative overflow-hidden rounded-[2rem] border border-[var(--borderColor)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-transform duration-500 hover:-translate-y-1">
			<div
				className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background: `radial-gradient(circle at top right, ${platform.accent}25, transparent 38%)`,
				}}
			/>
			<div className="relative z-10">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex items-center gap-4">
						<div
							className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/10 text-lg font-semibold text-white"
							style={{ boxShadow: `0 0 30px ${platform.accent}30` }}
						>
							{platform.label.slice(0, 2)}
						</div>
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-[var(--textDim)]">
								{platform.platform}
							</p>
							<h3 className="font-ubuntu text-[1.5rem] text-[var(--text)]">
								{platform.label}
							</h3>
							<a
								className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--textMuted)] transition-colors duration-300 hover:text-primary"
								href={platform.profileUrl}
								rel="noreferrer"
								target="_blank"
							>
								@{platform.handle}
								<ExternalLink size={14} />
							</a>
						</div>
					</div>

					<div className={`rounded-full border px-3 py-2 text-xs ${isHealthy ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-orange-400/20 bg-orange-400/10 text-orange-200"}`}>
						{isHealthy ? "Live" : "Partial / cached"}
					</div>
				</div>

				<p className="mt-4 text-sm leading-7 text-[var(--textMuted)] lg:text-base">
					{platform.description}
				</p>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<MetricPanel label="Solved" value={formatValue(platform.metrics.solved)} />
					<MetricPanel label="Current rating" value={formatNullableRating(platform.metrics.currentRating)} />
					<MetricPanel label="Peak rating" value={formatNullableRating(platform.metrics.maxRating)} />
					<MetricPanel label="Contests" value={formatValue(platform.metrics.contests)} />
				</div>

				{platform.difficultyBreakdown.length > 0 ? (
					<div className="mt-5 rounded-2xl border border-white/5 bg-black/10 p-4">
						<p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--textDim)]">
							solved by difficulty
						</p>
						<div className="grid grid-cols-3 gap-3">
							{platform.difficultyBreakdown.map((item) => (
								<div className="rounded-xl border border-white/5 bg-white/5 p-3 text-center" key={`${platform.platform}-${item.label}`}>
									<p className="text-xs uppercase tracking-[0.2em] text-[var(--textDim)]">
										{item.label}
									</p>
									<p className="mt-2 font-ubuntu text-xl text-[var(--text)]">
										{formatValue(item.count)}
									</p>
								</div>
							))}
						</div>
					</div>
				) : null}

				<div className="mt-5 flex flex-wrap gap-2">
					{platform.insights.map((insight) => (
						<span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-[var(--textMuted)]" key={`${platform.platform}-${insight.label}`}>
							<span className="mr-2 uppercase tracking-[0.2em] text-[10px] text-[var(--textDim)]">
								{insight.label}
							</span>
							<span className="text-[var(--text)]">{insight.value}</span>
						</span>
					))}
				</div>

				{platform.status.message ? (
					<p className="mt-4 text-xs leading-6 text-[var(--textDim)]">
						{platform.status.message}
					</p>
				) : null}
			</div>
		</article>
	);
}

function SummaryCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-[1.35rem] border border-white/5 bg-black/10 p-4">
			<p className="text-xs uppercase tracking-[0.22em] text-[var(--textDim)]">{label}</p>
			<p className="mt-2 font-ubuntu text-[1.45rem] text-[var(--text)]">{value}</p>
		</div>
	);
}

function SummaryPill({
	icon,
	label,
	value,
}: {
	icon: ComponentChildren;
	label: string;
	value: string;
}) {
	return (
		<div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--textMuted)]">
			<span className="text-primary">{icon}</span>
			<span>{label}</span>
			<span className="font-medium text-[var(--text)]">{value}</span>
		</div>
	);
}

function MetricPanel({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-[1.25rem] border border-white/5 bg-black/10 p-4">
			<p className="text-xs uppercase tracking-[0.25em] text-[var(--textDim)]">{label}</p>
			<p className="mt-2 font-ubuntu text-[1.3rem] text-[var(--text)]">{value}</p>
		</div>
	);
}

function ProblemSolvingSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			<div className="rounded-[2rem] border border-white/5 bg-white/5 p-6">
				<div className="h-5 w-32 rounded-full bg-white/10" />
				<div className="mt-4 h-10 max-w-2xl rounded-2xl bg-white/10" />
				<div className="mt-3 h-5 max-w-xl rounded-full bg-white/10" />
				<div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div className="h-24 rounded-[1.35rem] bg-white/10" key={`summary-${index}`} />
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				{Array.from({ length: 2 }).map((_, index) => (
					<div className="h-[420px] rounded-[2rem] bg-white/5" key={`platform-${index}`} />
				))}
			</div>
		</div>
	);
}

function formatValue(value: number) {
	return numberFormatter.format(value);
}

function formatNullableRating(value: number | null) {
	return typeof value === "number" ? numberFormatter.format(value) : "—";
}

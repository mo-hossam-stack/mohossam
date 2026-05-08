import type { ProblemSolvingPlatformData } from "../../types/problem-solving";

type Props = {
	platforms: ProblemSolvingPlatformData[];
};

const LEVEL_STYLES = [
	"bg-white/5",
	"bg-[var(--primaryLiteAlt)]",
	"bg-[var(--primaryLite)]",
	"bg-[var(--secondaryLite)]",
	"bg-[var(--primaryColor)]",
];

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
});

const rankFormatter = new Intl.NumberFormat("en-US");

export default function ProblemSolvingActivity({ platforms }: Props) {
	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{platforms.map((platform) => (
				<article
					className="rounded-[1.75rem] border border-[var(--borderColor)] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)]"
					key={platform.platform}
				>
					<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="text-xs uppercase tracking-[0.35em] text-[var(--textDim)]">
								{platform.label} activity
							</p>
							<h3 className="font-ubuntu text-[1.45rem] text-[var(--text)]">
								{platform.activity.rangeLabel}
							</h3>
						</div>
						<div className="flex flex-wrap gap-2 text-xs text-[var(--textMuted)]">
							<MetricChip label="active days" value={platform.activity.activeDays} />
							<MetricChip label="streak" value={`${platform.activity.currentStreak}d`} />
							<MetricChip label="peak day" value={platform.activity.peakDay} />
						</div>
					</div>

					<div className="overflow-x-auto pb-2">
						<div className="grid min-w-[520px] grid-flow-col grid-rows-7 gap-1">
							{platform.activity.days.map((day) => (
								<div
									className={`h-3.5 w-3.5 rounded-[4px] border border-white/5 ${LEVEL_STYLES[day.level]}`}
									key={day.date}
									title={`${day.date} · ${day.count} solved/submissions`}
								/>
							))}
						</div>
					</div>

					<div className="mt-3 flex items-center justify-between text-xs text-[var(--textDim)]">
						<span>Less</span>
						<div className="flex gap-1">
							{LEVEL_STYLES.map((level) => (
								<span
									className={`h-3 w-3 rounded-[4px] border border-white/5 ${level}`}
									key={level}
								/>
							))}
						</div>
						<span>More</span>
					</div>

					<div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
						<div className="rounded-2xl border border-white/5 bg-black/10 p-4">
							<p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--textDim)]">
								recent wins
							</p>
							<ul className="space-y-3">
								{platform.recentActivity.length > 0 ? (
									platform.recentActivity.map((item) => (
										<li className="flex items-start justify-between gap-3" key={item.id}>
											<div>
												<a
													className="text-sm font-medium text-[var(--text)] transition-colors duration-300 hover:text-primary"
													href={item.url}
													rel="noreferrer"
													target="_blank"
												>
													{item.title}
												</a>
												<p className="mt-1 text-xs text-[var(--textMuted)]">
													{item.subtitle ?? item.status}
												</p>
											</div>
											<div className="text-right">
												<p className="text-xs font-medium text-[var(--text)]">
													{item.status}
												</p>
												<p className="mt-1 text-[11px] text-[var(--textDim)]">
													{timeFormatter.format(new Date(item.timestamp * 1000))}
												</p>
											</div>
										</li>
									))
								) : (
									<li className="text-sm text-[var(--textMuted)]">
										Fresh activity will appear here when the provider responds.
									</li>
								)}
							</ul>
						</div>

						<div className="rounded-2xl border border-white/5 bg-black/10 p-4">
							<p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--textDim)]">
								rating pulse
							</p>
							<div className="flex h-full min-h-[140px] items-end gap-2">
								{platform.contestHistory.length > 0 ? (
									platform.contestHistory.map((point) => (
										<div className="flex flex-1 flex-col items-center gap-2" key={`${platform.platform}-${point.timestamp}`}>
											<div
												className="w-full rounded-full bg-[var(--gradient)] opacity-90"
												style={{
													height: `${resolveBarHeight(platform.contestHistory, point.value)}%`,
												}}
											/>
											<div className="text-center text-[11px] text-[var(--textDim)]">
												<p>{formatContestLabel(point.label)}</p>
												{typeof point.rank === "number" ? (
													<p>#{rankFormatter.format(point.rank)}</p>
												) : null}
											</div>
										</div>
									))
								) : (
									<p className="text-sm text-[var(--textMuted)]">
										Contest history will render here when rating data is available.
									</p>
								)}
							</div>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}

function MetricChip({ label, value }: { label: string; value: number | string }) {
	return (
		<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
			<span className="text-[var(--textDim)]">{label}</span>
			<span className="ml-2 text-[var(--text)]">{value}</span>
		</span>
	);
}

function resolveBarHeight(
	points: ProblemSolvingPlatformData["contestHistory"],
	value: number,
) {
	const peak = points.reduce((max, point) => Math.max(max, point.value), 0);

	if (!peak) {
		return 20;
	}

	return Math.max(20, Math.round((value / peak) * 100));
}

function formatContestLabel(label: string) {
	return label.length > 12 ? `${label.slice(0, 12)}…` : label;
}

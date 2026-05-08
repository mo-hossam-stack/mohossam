import { useEffect, useRef } from "preact/hooks";

export default function ProblemSolvingEffects() {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		const section = root?.closest<HTMLElement>("[data-problem-solving]");

		if (!root || !section) {
			return;
		}

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

		if (reduceMotion || coarsePointer) {
			root.dataset.motion = "reduced";
			return;
		}

		let frame = 0;

		const update = (clientX: number, clientY: number) => {
			cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => {
				const rect = section.getBoundingClientRect();
				const x = (clientX - rect.left) / rect.width - 0.5;
				const y = (clientY - rect.top) / rect.height - 0.5;

				root.style.setProperty("--ps-tilt-x", `${(x * 10).toFixed(2)}`);
				root.style.setProperty("--ps-tilt-y", `${(y * 10).toFixed(2)}`);
				root.style.setProperty("--ps-shift-x", `${(x * 26).toFixed(2)}px`);
				root.style.setProperty("--ps-shift-y", `${(y * 18).toFixed(2)}px`);
				root.style.setProperty("--ps-glow-x", `${((x + 0.5) * 100).toFixed(2)}%`);
				root.style.setProperty("--ps-glow-y", `${((y + 0.5) * 100).toFixed(2)}%`);
			});
		};

		const reset = () => {
			root.style.setProperty("--ps-tilt-x", "0");
			root.style.setProperty("--ps-tilt-y", "0");
			root.style.setProperty("--ps-shift-x", "0px");
			root.style.setProperty("--ps-shift-y", "0px");
			root.style.setProperty("--ps-glow-x", "50%");
			root.style.setProperty("--ps-glow-y", "50%");
		};

		const handlePointerMove = (event: PointerEvent) => {
			update(event.clientX, event.clientY);
		};

		section.addEventListener("pointermove", handlePointerMove, { passive: true });
		section.addEventListener("pointerleave", reset);
		reset();

		return () => {
			cancelAnimationFrame(frame);
			section.removeEventListener("pointermove", handlePointerMove);
			section.removeEventListener("pointerleave", reset);
		};
	}, []);

	return (
		<div
			className="pointer-events-none absolute inset-0 overflow-hidden"
			ref={rootRef}
			style={{
				"--ps-tilt-x": "0",
				"--ps-tilt-y": "0",
				"--ps-shift-x": "0px",
				"--ps-shift-y": "0px",
				"--ps-glow-x": "50%",
				"--ps-glow-y": "50%",
			} as Record<string, string>}
		>
			<div
				className="absolute inset-0 opacity-80"
				style={{
					background:
						"radial-gradient(circle at var(--ps-glow-x) var(--ps-glow-y), hsla(var(--primary),0.18), transparent 28%), radial-gradient(circle at 80% 20%, hsla(var(--secondary),0.16), transparent 30%)",
				}}
			/>
			<div
				className="absolute left-[6%] top-28 h-28 w-28 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm"
				style={{
					transform:
						"translate3d(var(--ps-shift-x), var(--ps-shift-y), 0) rotateX(calc(var(--ps-tilt-y) * -1deg)) rotateY(calc(var(--ps-tilt-x) * 1deg))",
				}}
			/>
			<div
				className="absolute right-[8%] top-40 h-24 w-24 rounded-full border border-white/10 bg-[var(--secondaryLite)] blur-[1px]"
				style={{
					transform:
						"translate3d(calc(var(--ps-shift-x) * -0.65), calc(var(--ps-shift-y) * 0.75), 0) rotateX(calc(var(--ps-tilt-y) * 1deg)) rotateY(calc(var(--ps-tilt-x) * -1deg))",
				}}
			/>
			<div
				className="absolute bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
				style={{
					transform:
						"translate3d(calc(var(--ps-shift-x) * 0.4), calc(var(--ps-shift-y) * -0.6), 0) rotateX(calc(var(--ps-tilt-y) * -0.7deg)) rotateY(calc(var(--ps-tilt-x) * 0.7deg)) rotate(22deg)",
				}}
			/>
		</div>
	);
}

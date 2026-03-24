import { useCallback, useEffect, useState } from "react";

export function useCountdown(initialSeconds: number | undefined) {
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds ?? 0);
	const [trackedInitial, setTrackedInitial] = useState(initialSeconds);

	if (trackedInitial !== initialSeconds) {
		setTrackedInitial(initialSeconds);
		setSecondsLeft(initialSeconds ?? 0);
	}

	const reset = useCallback(
		(seconds?: number) => {
			setSecondsLeft(seconds ?? initialSeconds ?? 0);
		},
		[initialSeconds],
	);

	useEffect(() => {
		if (secondsLeft <= 0) return;

		const timer = setInterval(() => {
			setSecondsLeft((prev) => Math.max(0, prev - 1));
		}, 1000);

		return () => clearInterval(timer);
	}, [secondsLeft]);

	const totalSeconds = Math.floor(secondsLeft);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const formatted = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

	return { secondsLeft, hours, minutes, seconds, formatted, reset };
}

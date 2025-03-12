import { useEffect, useState } from "react";

export const useFullscreen = () => {
	const [isFullscreen, setIsFullscreen] = useState(
		!!document.fullscreenElement,
	);

	const toggle = () => {
		document.body.requestFullscreen();
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	return [isFullscreen, toggle] as const;
};

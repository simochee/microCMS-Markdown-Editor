import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useRemark } from "react-remark";

export const Route = createFileRoute("/preview")({
	component: () => {
		const [html, setMarkdownSource] = useRemark();

		useEffect(() => {
			const handleMessage = (e: MessageEvent) => {
				if (
					e.origin !== location.origin ||
					e.data.action !== "RESPONSE:PREVEW_CONTENT"
				) {
					return;
				}

				setMarkdownSource(e.data.content);
			};

			window.addEventListener("message", handleMessage);
			window.opener.postMessage(
				{ action: "REQUEST:PREVEW_CONTENT" },
				location.origin,
			);

			return () => {
				window.removeEventListener("message", handleMessage);
			};
		}, [setMarkdownSource]);

		return <article className="prose max-w-2xl mx-auto py-10">{html}</article>;
	},
});

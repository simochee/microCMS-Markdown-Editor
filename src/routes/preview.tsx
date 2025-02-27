import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/preview")({
	component: () => {
		const [content, setContent] = useState("");

		useEffect(() => {
			const handleMessage = (e: MessageEvent) => {
				if (
					e.origin !== location.origin ||
					e.data.action !== "RESPONSE:PREVEW_CONTENT"
				)
					return;

				setContent(e.data.content);
			};

			window.addEventListener("message", handleMessage);
			window.opener.postMessage(
				{ action: "REQUEST:PREVEW_CONTENT" },
				location.origin,
			);

			return () => {
				window.removeEventListener("message", handleMessage);
			};
		}, []);

		return (
			<div>
				<p>Preview</p>
				<pre>{content}</pre>
			</div>
		);
	},
});

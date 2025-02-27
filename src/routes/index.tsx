import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-sans-jp/400.css";
import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "~/components/Editor";

export const Route = createFileRoute("/")({
	component: () => {
		return (
			<div>
				<Editor />
			</div>
		);
	},
});

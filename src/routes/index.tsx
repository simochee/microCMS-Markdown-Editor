import "@fontsource/ibm-plex-mono/400.css";
import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "~/components/Editor";
import { getInitialValue } from "~/utils/microcms";

let initialValue: string;

export const Route = createFileRoute("/")({
	loader: async () => {
		initialValue = await getInitialValue();
	},
	component: () => {
		return (
			<div>
				<Editor initialValue={initialValue} />
			</div>
		);
	},
});

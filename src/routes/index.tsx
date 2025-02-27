import "@fontsource/ibm-plex-mono/400.css";
import { createFileRoute } from "@tanstack/react-router";
import { Editor } from "~/components/Editor";
import { useInitialValue } from "~/hooks/useInitialValue";

export const Route = createFileRoute("/")({
	component: () => {
		const initialValue = useInitialValue();

		return (
			<div>
				<Editor initialValue={initialValue} />
			</div>
		);
	},
});

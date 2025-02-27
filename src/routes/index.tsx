import "@fontsource/ibm-plex-mono/400.css";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useMeasure } from "react-use";
import { Editor } from "~/components/Editor";
import { useFieldExtension } from "~/hooks/useFieldExtension";

export const Route = createFileRoute("/")({
	component: () => {
		const [, { updateStyle }] = useFieldExtension();
		const [ref, { height }] = useMeasure<HTMLDivElement>();

		useEffect(() => {
			updateStyle("100%", height);
		}, [height, updateStyle]);

		return (
			<div ref={ref}>
				<Editor />
			</div>
		);
	},
});

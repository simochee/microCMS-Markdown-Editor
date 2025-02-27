import "@fontsource/ibm-plex-mono/400.css";
import { createFileRoute } from "@tanstack/react-router";
import { setupFieldExtension } from "microcms-field-extension-api";
import { useEffect, useState } from "react";
import { useMeasure } from "react-use";
import { Editor } from "~/components/Editor";
import { useInitialValue } from "~/hooks/useInitialValue";

export const Route = createFileRoute("/")({
	component: () => {
		const initialValue = useInitialValue();

		const [ref, { height }] = useMeasure<HTMLDivElement>();
		const [fieldId, setFieldId] = useState<string>();

		useEffect(
			() =>
				setupFieldExtension({
					origin: "*",
					onDefaultData({ data }) {
						setFieldId(data.id);
					},
				}),
			[],
		);

		useEffect(() => {
			if (!fieldId) return;

			window.parent.postMessage(
				{
					id: fieldId,
					action: "MICROCMS_UPDATE_STYLE",
					message: {
						height,
						width: "100%",
					},
				},
				"*",
			);
		}, [fieldId, height]);

		return (
			<div ref={ref}>
				<Editor initialValue={initialValue} />
			</div>
		);
	},
});

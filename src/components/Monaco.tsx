import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { getSingletonHighlighter } from "shiki/bundle/web";

type Props = {
	minimap: boolean;
};

export const Monaco: React.FC<Props> = ({ minimap }) => {
	const handleMount: OnMount = async (_editor, monaco) => {
		const highlighter = await getSingletonHighlighter({
			themes: ["catppuccin-latte"],
			langs: ["markdown"],
		});

		shikiToMonaco(highlighter, monaco);
	};

	return (
		<MonacoEditor
			height={700}
			language="markdown"
			options={{
				fontFamily: "IBM Plex Mono, IBM Plex Sans JP, monospace",
				minimap: { enabled: minimap },
			}}
			onMount={handleMount}
		/>
	);
};

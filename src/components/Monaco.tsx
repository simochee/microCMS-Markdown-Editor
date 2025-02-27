import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { getSingletonHighlighter } from "shiki/bundle/web";
import { useWindowSize } from "~/hooks/useWindowSize";

type Props = {
	minimap: boolean;
	onMount: OnMount;
};

export const Monaco: React.FC<Props> = ({ minimap, onMount }) => {
	const [windowWidth] = useWindowSize();

	const handleMount: OnMount = async (editor, monaco) => {
		const highlighter = await getSingletonHighlighter({
			themes: ["catppuccin-latte"],
			langs: ["markdown"],
		});

		shikiToMonaco(highlighter, monaco);

		onMount(editor, monaco);
	};

	return (
		<MonacoEditor
			width={windowWidth}
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

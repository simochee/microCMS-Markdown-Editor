import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { getSingletonHighlighter } from "shiki/bundle/web";
import { useWindowSize } from "~/hooks/useWindowSize";

type Props = {
	initialValue: string;
	minimap: boolean;
	onMount: OnMount;
};

export const Monaco: React.FC<Props> = ({ initialValue, minimap, onMount }) => {
	const [windowWidth] = useWindowSize();

	const handleMount: OnMount = async (editor, monaco) => {
		const highlighter = await getSingletonHighlighter({
			themes: ["catppuccin-latte"],
			langs: [
				"markdown",
				"typescript",
				"tsx",
				"json",
				"yaml",
				"astro",
				"vue",
				"html",
				"css",
				"sass",
				"shell",
				"vue-html",
			],
		});

		shikiToMonaco(highlighter, monaco);

		onMount(editor, monaco);
	};

	return (
		<MonacoEditor
			width={windowWidth}
			height={700}
			language="markdown"
			defaultValue={initialValue}
			options={{
				fontFamily: "IBM Plex Mono",
				fontSize: 16,
				wordWrap: "on",
				language: "markdown",
				minimap: { enabled: minimap },
			}}
			onMount={handleMount}
		/>
	);
};

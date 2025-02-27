import MonacoEditor, {
	type OnChange,
	type OnMount,
} from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import type { editor } from "monaco-editor";
import { useEffect, useRef } from "react";
import { getSingletonHighlighter } from "shiki/bundle/web";

type Props = {
	initialValue: string;
	minimap: boolean;
	readOnly: boolean;
	onMount: OnMount;
	onChange: OnChange;
};

export const Monaco: React.FC<Props> = ({
	initialValue,
	minimap,
	readOnly,
	onMount,
	onChange,
}) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const handleMount: OnMount = async (editor, monaco) => {
		editorRef.current = editor;

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

	useEffect(() => {
		editorRef.current?.setValue(initialValue);
	}, [initialValue]);

	return (
		<MonacoEditor
			height={700}
			language="markdown"
			defaultValue={initialValue}
			options={{
				readOnly,
				fontFamily: "IBM Plex Mono",
				fontSize: 16,
				wordWrap: "on",
				language: "markdown",
				minimap: { enabled: minimap },
			}}
			onMount={handleMount}
			onChange={onChange}
		/>
	);
};

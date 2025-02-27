import { EditorFooter } from "./EditorFooter";
import { EditorHeader } from "./EditorHeader";
import { Monaco } from "./Monaco";
import type { OnMount } from "@monaco-editor/react";
import type { Position } from "monaco-editor";
import { useState } from "react";

export const Editor = () => {
	const [minimap, setMinimap] = useState(false);
	const [position, setPosition] = useState<Position | null>(null);
	const [selectedLength, setSelectedLength] = useState<number | null>(null);
	const [content, setContent] = useState<string>("");

	const handleMount: OnMount = (editor, _monaco) => {
		// カーソル位置を取得
		setPosition(editor.getPosition());
		editor.onDidChangeCursorPosition(({ position }) => {
			setPosition(position);
		});

		// 選択範囲を取得
		editor.onDidChangeCursorSelection(({ selection }) => {
			const text = editor.getModel()?.getValueInRange(selection) || "";

			setSelectedLength(text.length || null);
		});

		// 値が変更されたら、文字数と単語数を取得
		setContent(editor.getModel()?.getValue() || "");
		editor.onDidChangeModelContent(() => {
			setContent(editor.getModel()?.getValue() || "");
		});
	};

	return (
		<div className="grid grid-rows-[auto_1fr_auto] font-mono">
			<EditorHeader minimap={minimap} onChangeMinimap={setMinimap} />
			<Monaco minimap={minimap} onMount={handleMount} />
			<EditorFooter
				column={position?.column ?? 1}
				lineNumber={position?.lineNumber ?? 1}
				selectedLength={selectedLength}
				content={content}
			/>
		</div>
	);
};

import { EditorFooter } from "./EditorFooter";
import { EditorHeader } from "./EditorHeader";
import { Monaco } from "./Monaco";
import type { OnChange, OnMount } from "@monaco-editor/react";
import type { Position } from "monaco-editor";
import { useState } from "react";
import { useFieldExtension } from "~/hooks/useFieldExtension";

export const Editor: React.FC = () => {
	const [initialValue, { sendValue }] = useFieldExtension();

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

	// 値を microCMS に送信
	const handleChange: OnChange = (value) => {
		if (value == null) return;

		sendValue(value);
	};

	return (
		<div className="grid grid-rows-[auto_1fr_auto] font-mono">
			<EditorHeader
				loading={initialValue === null}
				minimap={minimap}
				onChangeMinimap={setMinimap}
			/>
			<Monaco
				initialValue={initialValue ?? ""}
				minimap={minimap}
				readOnly={initialValue === null}
				onMount={handleMount}
				onChange={handleChange}
			/>
			<EditorFooter
				column={position?.column ?? 1}
				lineNumber={position?.lineNumber ?? 1}
				selectedLength={selectedLength}
				content={content}
			/>
		</div>
	);
};

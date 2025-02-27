import { EditorFooter } from "./EditorFooter";
import { EditorHeader } from "./EditorHeader";
import { Monaco } from "./Monaco";
import type { OnMount } from "@monaco-editor/react";
import type { Position } from "monaco-editor";
import { useState } from "react";

export const Editor = () => {
	const [minimap, setMinimap] = useState(false);

	const [position, setPosition] = useState<Position | null>(null);

	const handleMount: OnMount = (editor, _monaco) => {
		setPosition(editor.getPosition());
		editor.onDidChangeCursorPosition(({ position }) => {
			setPosition(position);
		});

		editor.onDidChangeCursorSelection(console.log);
	};

	return (
		<div className="grid grid-rows-[auto_1fr_auto] font-mono">
			<EditorHeader minimap={minimap} onChangeMinimap={setMinimap} />
			<Monaco minimap={minimap} onMount={handleMount} />
			<EditorFooter
				column={position?.column ?? 1}
				lineNumber={position?.lineNumber ?? 1}
			/>
		</div>
	);
};

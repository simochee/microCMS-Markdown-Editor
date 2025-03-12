import "@fontsource/ibm-plex-mono/400.css";
import type { OnChange, OnMount } from "@monaco-editor/react";
import { createFileRoute } from "@tanstack/react-router";
import type { Position } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { useMeasure, useWindowSize } from "react-use";
import { Editor } from "~/components/Editor";
import { EditorFooter } from "~/components/EditorFooter";
import { EditorHeader } from "~/components/EditorHeader";
import { useFieldExtension } from "~/hooks/useFieldExtension";
import { useFullscreen } from "~/hooks/useFullscreen";

export const Route = createFileRoute("/")({
	component: () => {
		const { height: windowHeight } = useWindowSize();
		const [ref, { height }] = useMeasure<HTMLDivElement>();
		const [isFullscreen, toggleFullscreen] = useFullscreen();

		const [initialValue, { sendValue, updateStyle }] = useFieldExtension();

		const [minimap, setMinimap] = useState(false);
		const [position, setPosition] = useState<Position | null>(null);
		const [selectedLength, setSelectedLength] = useState<number | null>(null);
		const [content, setContent] = useState("");

		const windowRef = useRef<Window | null>(null);

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

		const handlePreview = () => {
			if (!windowRef.current || windowRef.current.closed) {
				windowRef.current = window.open("/preview", "_blank");
				window.addEventListener("message", (e) => {
					if (
						e.origin !== location.origin ||
						e.data.action !== "REQUEST:PREVEW_CONTENT"
					)
						return;

					console.log(e.data, { action: "PREVIEW_CONTENT", content });

					windowRef.current?.postMessage(
						{ action: "RESPONSE:PREVEW_CONTENT", content },
						location.origin,
					);
				});
			} else {
				windowRef.current.focus();
				windowRef.current.postMessage(
					{ action: "RESPONSE:PREVEW_CONTENT", content },
					location.origin,
				);
			}
		};

		useEffect(() => {
			updateStyle("100%", height);
		}, [height, updateStyle]);

		return (
			<div
				ref={ref}
				className="grid grid-rows-[auto_1fr_auto] font-mono"
				style={{
					height: isFullscreen ? windowHeight : "auto",
				}}
			>
				<EditorHeader
					loading={initialValue === null}
					minimap={minimap}
					onChangeMinimap={setMinimap}
				/>
				<Editor
					initialValue={initialValue ?? ""}
					minimap={minimap}
					readOnly={initialValue === null}
					height={isFullscreen ? "100%" : 700}
					onMount={handleMount}
					onChange={handleChange}
				/>
				<EditorFooter
					column={position?.column ?? 1}
					lineNumber={position?.lineNumber ?? 1}
					selectedLength={selectedLength}
					content={content}
					onPreview={handlePreview}
					onFullScreen={toggleFullscreen}
				/>
			</div>
		);
	},
});

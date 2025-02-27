import latte from "@catppuccin/vscode/themes/latte.json" with { type: "json" };
import MonacoEditor, { type BeforeMount } from "@monaco-editor/react";
import { useSize } from "react-use";

type Props = {
	minimap: boolean;
};

export const Monaco: React.FC<Props> = ({ minimap }) => {
	const handleBeforeMount: BeforeMount = (monaco) => {
		const rules = latte.tokenColors.flatMap(({ scope, settings }) => {
			const scopes = Array.isArray(scope) ? scope : scope.split(",");

			return scopes.map((token) => ({
				token,
				...settings,
			}));
		});

		monaco.editor.defineTheme("catppuccin-latte", {
			base: "vs",
			inherit: true,
			rules,
			colors: latte.colors,
		});
	};

	const [sized] = useSize(({ width, height }) => (
		<div className="w-full h-full">
			<MonacoEditor
				width={width}
				height={height}
				language="markdown"
				theme="catppuccin-latte"
				options={{
					fontFamily: "IBM Plex Mono, IBM Plex Sans JP, monospace",
					minimap: { enabled: minimap },
				}}
				beforeMount={handleBeforeMount}
			/>
		</div>
	));

	return sized;
};

import latte from "@catppuccin/vscode/themes/latte.json" with { type: "json" };
import type { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

export const THEME_NAME = "catppuccin-latte";

/**
 * Monaco Editor に Catppuccin Latte テーマを定義する
 */
export const defineTheme = (monaco: Monaco) => {
	const rules: editor.ITokenThemeRule[] = latte.tokenColors.flatMap(
		({ scope, settings }) => {
			const scopes = Array.isArray(scope) ? scope : scope.split(",");

			return scopes.map((token) => ({
				token,
				...settings,
			}));
		},
	);

	monaco.editor.defineTheme(THEME_NAME, {
		base: "vs",
		inherit: true,
		rules,
		colors: latte.colors,
	});
};

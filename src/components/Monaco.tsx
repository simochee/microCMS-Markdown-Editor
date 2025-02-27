import MonacoEditor, { type BeforeMount } from "@monaco-editor/react";
import { useSize } from "react-use";
import { defineTheme, THEME_NAME } from "~/utils/editor";

type Props = {
	minimap: boolean;
};

export const Monaco: React.FC<Props> = ({ minimap }) => {
	const handleBeforeMount: BeforeMount = (monaco) => {
		defineTheme(monaco);
	};

	const [sized] = useSize(({ width, height }) => (
		<div className="w-full h-full">
			<MonacoEditor
				width={width}
				height={height}
				language="markdown"
				theme={THEME_NAME}
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

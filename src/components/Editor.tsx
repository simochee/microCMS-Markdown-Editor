import { EditorFooter } from "./EditorFooter";
import { EditorHeader } from "./EditorHeader";
import { Monaco } from "./Monaco";
import { useState } from "react";

export const Editor = () => {
	const [minimap, setMinimap] = useState(false);

	return (
		<div className="grid grid-rows-[auto_1fr_auto] font-mono">
			<EditorHeader minimap={minimap} onChangeMinimap={setMinimap} />
			<Monaco minimap={minimap} />
			<EditorFooter />
		</div>
	);
};

import { Monaco } from "./Monaco";
import { useState } from "react";
import {
	VscMarkdown,
	VscMapVertical,
	VscMapVerticalFilled,
} from "react-icons/vsc";

export const Editor = () => {
	const [minimap, setMinimap] = useState(false);

	const MinimapIcon = minimap ? VscMapVerticalFilled : VscMapVertical;

	return (
		<div className="grid grid-rows-[auto_1fr_auto] font-mono">
			<header className="bg-editor-commandCenter-background flex items-center pr-3">
				<p className="text-xs flex items-center h-9 gap-2 pl-4 pr-5 bg-editor-tab-activeBackground border-t border-editor-tab-activeBorderTop text-editor-tab-activeForeground">
					<VscMarkdown className="text-xl" />
					article.md
				</p>
				<div className="ml-auto">
					<button
						type="button"
						className="size-6 rounded grid place-items-center bg-editor-commandCenter-background hover:bg-editor-commandCenter-activeBackground text-editor-commandCenter-foreground"
						onClick={() => setMinimap((minimap) => !minimap)}
					>
						<MinimapIcon />
					</button>
				</div>
			</header>
			<Monaco minimap={minimap} />
			<footer className="bg-editor-statusBar-background">Footer</footer>
		</div>
	);
};

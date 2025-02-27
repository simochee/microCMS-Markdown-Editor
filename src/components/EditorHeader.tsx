import {
	VscMarkdown,
	VscMapVertical,
	VscMapVerticalFilled,
	VscMenu,
	VscLoading,
} from "react-icons/vsc";

type Props = {
	loading: boolean;
	minimap: boolean;
	onChangeMinimap: (minimap: boolean) => void;
};

export const EditorHeader: React.FC<Props> = ({
	loading,
	minimap,
	onChangeMinimap,
}) => {
	const MinimapIcon = minimap ? VscMapVerticalFilled : VscMapVertical;

	return (
		<header className="bg-editor-commandCenter-background flex items-center pr-3">
			<p className="text-xs flex items-center h-9 gap-2 pl-4 pr-5 bg-editor-tab-activeBackground border-t border-editor-tab-activeBorderTop text-editor-tab-activeForeground">
				<VscMarkdown className="text-xl" />
				article.md
				{loading && (
					<VscLoading className="size-4 animate-spin text-editor-tab-inactiveForeground" />
				)}
			</p>
			<nav className="ml-auto flex gap-1">
				<button
					type="button"
					className="size-6 rounded grid place-items-center bg-editor-commandCenter-background hover:bg-editor-commandCenter-activeBackground text-editor-commandCenter-foreground"
					onClick={() => onChangeMinimap(!minimap)}
				>
					<MinimapIcon />
				</button>
				<button
					type="button"
					className="size-6 rounded grid place-items-center bg-editor-commandCenter-background hover:bg-editor-commandCenter-activeBackground text-editor-commandCenter-foreground"
				>
					<VscMenu />
				</button>
			</nav>
		</header>
	);
};

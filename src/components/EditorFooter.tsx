import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { VscPreview, VscGithub } from "react-icons/vsc";
import { open } from "~/utils/navigation";

type StatusBarItemProps = React.ComponentProps<"button"> & {
	icon?: IconType;
	accent?: boolean;
};

const StatusBarItem: React.FC<StatusBarItemProps> = ({
	icon: Icon,
	accent,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className={clsx(
				"flex gap-1 items-center justify-center h-6 text-xs cursor-pointer",
				accent
					? "bg-editor-statusBarItem-remoteBackground text-editor-statusBarItem-remoteForeground hover:text-black px-2"
					: "bg-editor-commandCenter-background hover:bg-editor-commandCenter-activeBackground text-editor-commandCenter-foreground px-1",
			)}
		>
			{Icon && <Icon className="size-4" />}
			{children}
		</button>
	);
};

type Props = {
	column: number;
	lineNumber: number;
	selectedLength: number | null;
	content: string;
};

export const EditorFooter: React.FC<Props> = ({
	column,
	lineNumber,
	selectedLength,
	content,
}) => {
	return (
		<footer className="bg-editor-commandCenter-background">
			<div className="flex justify-between pr-3">
				<nav className="flex gap-2">
					<StatusBarItem icon={VscPreview} accent>
						記事をプレビュー
					</StatusBarItem>
				</nav>
				<nav className="flex gap-2">
					<StatusBarItem>
						行 {lineNumber}、列 {column}
						{selectedLength && ` (${selectedLength} 個選択)`}
					</StatusBarItem>
					<StatusBarItem>{content.length} 文字</StatusBarItem>
					<StatusBarItem
						icon={VscGithub}
						onClick={() =>
							open("https://github.com/simochee/microCMS-Markdown-Editor")
						}
					/>
				</nav>
			</div>
		</footer>
	);
};

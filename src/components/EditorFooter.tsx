import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { VscPreview, VscGithub } from "react-icons/vsc";

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
				"flex gap-1 items-center justify-center h-6 text-xs",
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
};

export const EditorFooter: React.FC<Props> = ({ column, lineNumber }) => {
	return (
		<footer className="bg-editor-commandCenter-background">
			<div className="flex justify-between pr-3">
				<nav className="flex gap-3">
					<StatusBarItem icon={VscPreview} accent>
						記事をプレビュー
					</StatusBarItem>
				</nav>
				<nav className="flex gap-3">
					<StatusBarItem>
						行 {lineNumber}、列 {column}
					</StatusBarItem>
					<StatusBarItem>1,024 文字、128 単語</StatusBarItem>
					<StatusBarItem icon={VscGithub} />
				</nav>
			</div>
		</footer>
	);
};

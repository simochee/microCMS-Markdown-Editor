import type { IconType } from "react-icons";
import { VscPreview, VscGithub } from "react-icons/vsc";

type StatusBarItemProps = React.ComponentProps<"button"> & {
	icon?: IconType;
};

const StatusBarItem: React.FC<StatusBarItemProps> = ({
	icon: Icon,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className="flex gap-1 items-center justify-center h-6 text-xs px-1 bg-editor-commandCenter-background hover:bg-editor-commandCenter-activeBackground text-editor-commandCenter-foreground"
		>
			{Icon && <Icon className="size-4" />}
			{children}
		</button>
	);
};

export const EditorFooter: React.FC = () => {
	return (
		<footer className="bg-editor-commandCenter-background">
			<div className="flex justify-between px-3">
				<nav className="flex gap-3">
					<StatusBarItem icon={VscPreview}>記事をプレビュー</StatusBarItem>
				</nav>
				<nav className="flex gap-3">
					<StatusBarItem>行 24、列 13</StatusBarItem>
					<StatusBarItem>1,024 文字、128 単語</StatusBarItem>
					<StatusBarItem icon={VscGithub} />
				</nav>
			</div>
		</footer>
	);
};

import { Monaco } from "./Monaco";

export const Editor = () => {
	return (
		<div className="w-full h-screen grid grid-rows-[auto_1fr_auto]">
			<header className="bg-slate-200">
				<p>Header</p>
			</header>
			<Monaco minimap />
			<footer className="bg-slate-200">Footer</footer>
		</div>
	);
};

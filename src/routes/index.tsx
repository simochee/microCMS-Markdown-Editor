import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => {
		return (
			<div>
				<h1>Editor</h1>
			</div>
		);
	},
});

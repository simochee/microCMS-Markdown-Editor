import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
	component: () => {
		return (
			<div>
				<p>Preview</p>
			</div>
		);
	},
});

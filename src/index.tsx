import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "~/index.css";
import { routeTree } from "~/routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootEl = document.getElementById("root");

if (!rootEl) {
	throw new Error("Failed to find the root element");
}

createRoot(rootEl).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);

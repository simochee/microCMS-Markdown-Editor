import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<p>Hello World</p>
	</StrictMode>,
);

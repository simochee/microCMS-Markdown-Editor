/**
 * リンクを開く
 */
export const open = (url: string | URL) => {
	const href = typeof url === "string" ? url : url.href;

	window.open(href, "_blank", "noopener");
};

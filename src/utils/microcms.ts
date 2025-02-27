/**
 * microCMS から初期値を取得する
 */
export const getInitialValue = () =>
	new Promise<string>((resolve, reject) => {
		// iframe 内ではない場合は空文字を返す
		if (window.parent === window || window.top === window) {
			resolve("");

			return;
		}

		// 10秒以内にメッセージが来ない場合はエラーを返す
		const timer = setTimeout(() => {
			window.removeEventListener("message", handleMessage);

			reject(new Error("microCMS から初期値を取得できませんでした。"));
		}, 10_000);

		const handleMessage = (e: MessageEvent) => {
			if (e.isTrusted && e.data.action === "MICROCMS_GET_DEFAULT_DATA") {
				window.removeEventListener("message", handleMessage);
				clearTimeout(timer);

				resolve(e.data.message);
			}
		};

		window.addEventListener("message", handleMessage);
	});

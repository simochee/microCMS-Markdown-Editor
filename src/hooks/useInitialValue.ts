import { setupFieldExtension } from "microcms-field-extension-api";
import { useEffect, useState } from "react";

export const useInitialValue = () => {
	const [initialValue, setInitialValue] = useState<string | null>(null);

	useEffect(() => {
		// iframe 内ではない場合は、初期値を設定
		if (window.parent === window || window.top === window) {
			setTimeout(() => {
				setInitialValue("# Hello World\n");
			}, 1_500);

			return;
		}

		return setupFieldExtension({
			origin: "*",
			onDefaultData({ data }) {
				setInitialValue(data.message?.data ?? "");
			},
		});
	}, []);

	return initialValue;
};

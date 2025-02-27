import {
	sendFieldExtensionMessage,
	setupFieldExtension,
} from "microcms-field-extension-api";
import { useEffect, useState } from "react";

const ORIGIN = import.meta.env.VITE_MICROCMS_ORIGIN || "*";

export const useFieldExtension = () => {
	const [id, setId] = useState<string>();
	const [initialValue, setInitialValue] = useState<string | null>(null);

	useEffect(
		() =>
			setupFieldExtension({
				origin: ORIGIN,
				onDefaultData({ data }) {
					setId(data.id);
					setInitialValue(data.message?.data);
				},
			}),
		[],
	);

	const sendValue = (value: string) => {
		if (!id) return;

		sendFieldExtensionMessage({ id, message: { data: value } }, ORIGIN);
	};

	const updateStyle = (width: number | string, height: number | string) => {
		if (!id) return;

		window.parent.postMessage(
			{
				id,
				action: "MICROCMS_UPDATE_STYLE",
				message: {
					height,
					width,
				},
			},
			"*",
		);
	};

	return [initialValue, { sendValue, updateStyle }] as const;
};

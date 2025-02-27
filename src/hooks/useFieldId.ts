import { setupFieldExtension } from "microcms-field-extension-api";
import { useEffect, useState } from "react";

export const useFieldId = () => {
	const [fieldId, setFieldId] = useState<string>();

	useEffect(
		() =>
			setupFieldExtension({
				origin: "*",
				onDefaultData({ data }) {
					setFieldId(data.id);
				},
			}),
		[],
	);

	return fieldId;
};

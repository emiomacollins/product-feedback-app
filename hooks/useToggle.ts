import { useState } from 'react';

export default function useToggle(initialValue: boolean = false) {
	const [expanded, setExpanded] = useState(initialValue);

	return {
		expanded,
		setExpanded,
		toggle() {
			setExpanded(!expanded);
		},
	};
}

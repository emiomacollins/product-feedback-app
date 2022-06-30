import { useEffect, useRef } from 'react';
import useToggle from './useToggle';

export default function useToggleWithClickAway(initialValue: boolean = false) {
	const { expanded, setExpanded, toggle } = useToggle(initialValue);
	const ref = useRef<any>();

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (ref.current?.contains(e.target)) return;
			setExpanded(false);
		};

		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, [setExpanded]);

	return { ref, expanded, setExpanded, toggle };
}

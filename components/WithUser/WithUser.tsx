import { cloneElement } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { setWithUserPopup } from '../../lib/redux/slices/ui';

interface Props {
	children: JSX.Element;
	onClick: () => void;
	message: string;
}

export default function WithUser({ children, onClick, message }: Props) {
	const { user } = useAuth();
	const dispatch = useDispatch();

	const handleClick = () => {
		if (user) return onClick();
		dispatch(setWithUserPopup({ message }));
	};

	return cloneElement(children, { onClick: handleClick });
}

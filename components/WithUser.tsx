import Link from 'next/link';
import { MouseEventHandler, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { routes } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { cardStyles } from './styled-components/Card';
import { overlayStyles } from './styled-components/Overlay';

interface Props {
	children: ReactNode;
	onClick: () => void;
	message: string;
}

export default function WithUser({ children, onClick, message, ...props }: Props) {
	const { user } = useAuth();
	const [expanded, setExpanded] = useState(false);
	const canFocus = expanded ? {} : { tabIndex: -1 };

	const handleShowPopup = () => {
		if (user) return onClick();
		setExpanded(true);
	};

	const handleClosePopup: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		setExpanded(false);
	};

	return (
		<Container onClick={handleShowPopup} {...props}>
			<Overlay expanded={expanded} onClick={handleClosePopup}>
				<Popup onClick={(e) => e.stopPropagation()}>
					<Heading>{message}</Heading>
					<Link href={routes.login}>
						<Button {...canFocus}>Sign in</Button>
					</Link>
				</Popup>
			</Overlay>
			{children}
		</Container>
	);
}

const Container = styled.div`
	border: 0;
	background: transparent;
`;

const Overlay = styled.div`
	${overlayStyles}
	display: grid;
	place-content: center;
	background: rgba(0, 0, 0, 0.7);
	z-index: 99;
	padding-bottom: 10rem;
`;

const Popup = styled.div`
	${cardStyles}
	display: grid;
	gap: 3rem;
	padding: 3rem;
	min-width: 300px;
	text-align: center;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
	user-select: none;
`;

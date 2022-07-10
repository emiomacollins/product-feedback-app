import Link from 'next/link';
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { routes } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import { cardStyles } from './styled-components/Card';
import { contentStyles } from './styled-components/Content';
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

	const handleClick = () => {
		if (user) return onClick();
		setExpanded(true);
	};

	const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();
		setExpanded(false);
	};

	useEffect(() => {
		document.documentElement.style.overflow = expanded ? 'hidden' : 'unset';
	}, [expanded]);

	return (
		<Container onClick={handleClick} {...props}>
			<Overlay expanded={expanded} onClick={handleClose}>
				<Popup onClick={(e) => e.stopPropagation()}>
					<Heading>{message}</Heading>

					<Link href={routes.login}>
						<Button $color='blue' {...canFocus}>
							Sign in
						</Button>
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
	align-content: center;
	background: rgba(0, 0, 0, 0.7);
	z-index: 99;
	padding-bottom: 10rem;
`;

const Popup = styled.div`
	${cardStyles}
	${contentStyles}
    max-width: 350px;
	display: grid;
	gap: 2rem;
	padding: 3rem;
	text-align: center;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
	user-select: none;
`;

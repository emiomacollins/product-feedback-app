import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { routes } from '../../constants/routes';
import { getWithUserPopup, setWithUserPopup } from '../../lib/redux/slices/ui';
import Button from '../Button';
import { cardStyles } from '../styled-components/Card';
import { contentStyles } from '../styled-components/Content';
import { overlayStyles } from '../styled-components/Overlay';

export default function WithUserPopup() {
	const dispatch = useDispatch();
	const withUserPopup = useSelector(getWithUserPopup);
	const expanded = withUserPopup ? true : false;
	const canFocus = expanded ? {} : { tabIndex: -1 };

	const handleClose = () => {
		dispatch(setWithUserPopup(null));
	};

	useEffect(() => {
		document.documentElement.style.position = expanded ? 'fixed' : 'unset';
	}, [expanded]);

	return (
		<Overlay expanded={expanded} onClick={handleClose}>
			<Container onClick={(e) => e.stopPropagation()}>
				<Heading>{withUserPopup?.message || <br />}</Heading>
				<Link href={routes.login}>
					<Button $color='blue' {...canFocus}>
						Sign in
					</Button>
				</Link>
			</Container>
		</Overlay>
	);
}

const Overlay = styled.div`
	${overlayStyles}
	display: grid;
	align-content: center;
	background: rgba(0, 0, 0, 0.7);
	z-index: 99;
	padding-bottom: 10rem;
`;

const Container = styled.div`
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

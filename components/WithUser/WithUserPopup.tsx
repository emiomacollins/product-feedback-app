import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import lockIconPath from '../../assets/svgs/lock-icon.svg';
import { routes } from '../../constants/routes';
import { getWithUserPopup, setWithUserPopup } from '../../lib/redux/slices/ui';
import Button from '../Button';
import { cardStyles } from '../styled-components/Card';
import { contentStyles } from '../styled-components/Content';
import { Grid } from '../styled-components/Grid';
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
		document.documentElement.style.overflowY = expanded ? 'hidden' : 'unset';
	}, [expanded]);

	return (
		<Overlay expanded={expanded} onClick={handleClose}>
			<Container onClick={(e) => e.stopPropagation()}>
				<Grid gap={0.7}>
					<Icon src={lockIconPath.src} alt='' />
					<Heading>{withUserPopup?.message || <br />}</Heading>
				</Grid>
				<Link href={routes.auth}>
					<Button {...canFocus} onClick={handleClose}>
						Sign In
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
	z-index: 999;
	padding-bottom: 10rem;
`;

const Container = styled.div`
	${cardStyles}
	${contentStyles}
    max-width: 370px;
	display: grid;
	gap: 2rem;
	padding: 3rem;
	text-align: center;
`;

const Icon = styled.img`
	justify-self: center;
	width: 3.5rem;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
	user-select: none;
	line-height: 1.3;
	max-width: 90%;
	text-align: center;
	margin-inline: auto;
`;

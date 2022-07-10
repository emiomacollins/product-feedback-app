import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import userIconPath from '../../assets/svgs/user-icon.svg';
import Button from '../../components/Button';
import { Card } from '../../components/styled-components/Card';
import { routes } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import useToggleWithClickAway from '../../hooks/useToggleWithClickAway';

export default function ProfileDropdown() {
	const { user } = useAuth();
	const { expanded, toggle, ref } = useToggleWithClickAway();
	const hasImage = user?.photoURL ? true : false;

	return (
		<Container ref={ref}>
			<Toggle hasImage={hasImage} onClick={toggle}>
				<Image src={user?.photoURL || userIconPath} alt='' layout='fill' />
			</Toggle>

			<Dropdown expanded={expanded}>
				<Link href={routes.login}>
					<Button $color='blue'>{user ? 'Sign out' : 'Sign in'}</Button>
				</Link>
			</Dropdown>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
`;

interface ToggleProps {
	hasImage: boolean;
}

const Toggle = styled.button<ToggleProps>`
	width: 4.5rem;
	aspect-ratio: 1;
	border-radius: 100%;
	position: relative;

	img {
		border-radius: 100%;
	}

	${(p) =>
		p.hasImage &&
		css`
			border: 2.5px solid var(--light);
		`}
`;

interface ExpandedProps {
	expanded: boolean;
}

const Dropdown = styled(Card)<ExpandedProps>`
	--scale: 0;
	position: absolute;
	top: calc(100% + 1.5rem);
	right: -1rem;
	box-shadow: var(--shadow-500);
	padding: 2rem;
	pointer-events: none;
	opacity: 0;
	transform: scale(var(--scale));
	transition: all 0.2s;
	/* background: var(--light); */

	${(p) =>
		p.expanded &&
		css`
			pointer-events: visible;
			opacity: 1;
			--scale: 1;
		`}
`;

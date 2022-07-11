import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import noUserIconPath from '../../assets/svgs/user-icon.svg';
import Button from '../../components/Button';
import { Card } from '../../components/styled-components/Card';
import { routes } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import useToggleWithClickAway from '../../hooks/useToggleWithClickAway';

interface Props {
	withDropdown?: boolean;
}

export default function ProfileDropdown({ withDropdown = true, ...props }: Props) {
	const { user, photoUrl } = useAuth();
	const { expanded, toggle, ref } = useToggleWithClickAway();

	return (
		<Container ref={ref} {...props}>
			<Toggle showBorder={user ? true : false} onClick={toggle}>
				<Image src={photoUrl || noUserIconPath} alt='' layout='fill' />
			</Toggle>

			{withDropdown && (
				<Dropdown expanded={expanded}>
					<Link href={routes.auth}>
						<Button $color='blue'>{user ? 'Sign Out' : 'Sign In'}</Button>
					</Link>
				</Dropdown>
			)}
		</Container>
	);
}

const Container = styled.div`
	position: relative;
`;

interface ToggleProps {
	showBorder: boolean;
}

const Toggle = styled.button<ToggleProps>`
	width: 4.5rem;
	aspect-ratio: 1;
	border-radius: 100%;
	position: relative;

	img {
		border-radius: 100%;
		object-fit: cover;
	}

	${(p) =>
		p.showBorder &&
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

	${(p) =>
		p.expanded &&
		css`
			pointer-events: visible;
			opacity: 1;
			--scale: 1;
		`}
`;

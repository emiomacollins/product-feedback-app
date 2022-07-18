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
	const canFocus = expanded ? {} : { tabIndex: -1 };
	const signedIn = user ? true : false;

	return (
		<Container ref={ref} {...props}>
			<Toggle signedIn={signedIn} onClick={toggle}>
				<ProfilePic
					src={photoUrl || noUserIconPath.src}
					alt=''
					signedIn={signedIn}
				/>
			</Toggle>

			{withDropdown && (
				<Dropdown expanded={expanded}>
					<Link href={routes.auth}>
						<Button {...canFocus} $color='blue'>
							{user ? 'Sign Out' : 'Sign In'}
						</Button>
					</Link>
				</Dropdown>
			)}
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	display: flex;
`;

interface SignedInProps {
	signedIn: boolean;
}

const Toggle = styled.button<SignedInProps>`
	border-radius: 100%;
	&:focus {
		outline-offset: -1px;
	}

	${(p) =>
		p.signedIn &&
		css`
			color: var(--light);
			box-shadow: 0 0 0 2.5px;

			.darkmode & {
				color: var(--blue);
			}

			&:focus {
				outline-offset: 0.5rem;
			}
		`}
`;

const ProfilePic = styled.img<SignedInProps>`
	width: 3.6rem;
	aspect-ratio: 1;
	object-fit: cover;
	border-radius: 100%;
	display: flex;

	${(p) =>
		!p.signedIn &&
		css`
			width: 4.5rem;
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

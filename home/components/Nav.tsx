import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import gradientPath from '../../assets/images/gradient-mobile.png';
import closeIconPath from '../../assets/svgs/icon-close.svg';
import hamburgerIconPath from '../../assets/svgs/icon-hamburger.svg';
import Button from '../../components/Button';
import { contentStyles } from '../../components/styled-components/Content';
import { Flex } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { Overlay } from '../../components/styled-components/Overlay';
import { routes } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import useToggle from '../../hooks/useToggle';
import Filters from './Filters';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';
import RoadmapCard from './RoadmapCard';

export default function Nav() {
	const { user, fullName, username } = useAuth();
	const { expanded, toggle, setExpanded } = useToggle();
	const navRef = useRef<HTMLDivElement>(null);
	const [navHeight, setNavHeight] = useState(0);
	const handleClose = () => setExpanded(false);

	useEffect(() => {
		const calculateNavHeight = () => {
			const height = navRef.current?.clientHeight;
			setNavHeight(height ? +height : 0);
		};
		calculateNavHeight();
		window.addEventListener('resize', calculateNavHeight);
		return () => window.removeEventListener('resize', calculateNavHeight);
	}, []);

	useEffect(() => {
		document.documentElement.style.overflow = expanded ? 'hidden' : 'unset';
	}, [expanded]);

	return (
		<Container navHeight={navHeight}>
			<Content ref={navRef as any}>
				<Logo />

				<Hamburger onClick={toggle}>
					<Icon visible={expanded}>
						<Image src={closeIconPath} alt='' />
					</Icon>
					<Icon visible={!expanded}>
						<Image src={hamburgerIconPath} alt='' />
					</Icon>
				</Hamburger>
			</Content>

			<StyledOverlay expanded={expanded} onClick={handleClose} />

			<Sidebar expanded={expanded}>
				<Grid gap={1}>
					<Flex>
						{user && (
							<Fragment>
								<StyledProfileDropdown withDropdown={false} />
								<Grid gap={0}>
									<DisplayName>{fullName}</DisplayName>
									<Username>@{username}</Username>
								</Grid>
							</Fragment>
						)}
					</Flex>

					<Link href={routes.auth}>
						<Button $color='blue' onClick={handleClose}>
							Sign {user ? 'Out' : 'In'}
						</Button>
					</Link>
				</Grid>

				<Filters onClick={handleClose} />
				<RoadmapCard />
			</Sidebar>
		</Container>
	);
}

interface NavHeightProps {
	navHeight: number;
}

const Container = styled.div<NavHeightProps>`
	--nav-height: ${(p) => p.navHeight}px;
	margin-top: calc(-1 * var(--app-padding));
	background: url(${gradientPath.src});
	background-repeat: no-repeat;
	background-size: cover;
	color: var(--white);
	position: relative;
	z-index: 99;
`;

const Content = styled.div`
	${contentStyles}
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 2rem;
	padding-block: 1.5rem;
`;

const Hamburger = styled.button`
	padding: 1.25rem;
	margin-right: -1rem;
	-webkit-tap-highlight-color: transparent;
`;

interface IconProps {
	visible: boolean;
}

const Icon = styled.div<IconProps>`
	display: ${(p) => (p.visible ? 'flex' : 'none')};
`;

interface ExpandedProps {
	expanded: boolean;
}

const absoluteStyles = css<ExpandedProps>`
	position: absolute;
	top: var(--nav-height);
	height: calc(100vh - var(--nav-height));

	${(p) =>
		!p.expanded &&
		css`
			pointer-events: none;
			opacity: 0;
		`}
`;

const Sidebar = styled.div<ExpandedProps>`
	${absoluteStyles}
	right: 0;
	padding: 2rem;
	width: clamp(300px, 70%, 350px);
	background: var(--light);
	display: grid;
	gap: 2rem;
	align-content: flex-start;
	overflow-y: auto;
	transform: translateX(100%);
	transition: all 0.2s;

	${(p) =>
		p.expanded &&
		css`
			transform: translateX(0);
		`}
`;

const StyledOverlay = styled(Overlay)`
	${absoluteStyles}
	left: 0;
	width: 100%;
`;

const StyledProfileDropdown = styled(ProfileDropdown)`
	justify-self: left;
`;

const DisplayName = styled.p`
	color: var(--blue-dark);
	font-weight: 500;
`;

const Username = styled.p`
	color: var(--gray);
	font-size: var(--size-350);
	line-height: 1;
`;

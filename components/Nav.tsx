import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import closeIconPath from '../assets/svgs/icon-close.svg';
import hamburgerIconPath from '../assets/svgs/icon-hamburger.svg';
import useToggle from '../hooks/useToggle';
import { contentStyles } from './styled-components/Content';
import { Grid } from './styled-components/Grid';
import { Overlay } from './styled-components/Overlay';

export default function Nav() {
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
				<Grid gap={0}>
					<h2>Frontend Mentor</h2>
					<SubHeading>Feedback Board</SubHeading>
				</Grid>

				<Button onClick={toggle}>
					<Icon visible={expanded}>
						<Image src={closeIconPath} alt='' />
					</Icon>
					<Icon visible={!expanded}>
						<Image src={hamburgerIconPath} alt='' />
					</Icon>
				</Button>
			</Content>

			<StyledOverlay expanded={expanded} onClick={handleClose} />

			<Sidebar expanded={expanded}></Sidebar>
		</Container>
	);
}

interface NavHeightProps {
	navHeight: number;
}

const Container = styled.div<NavHeightProps>`
	--nav-height: ${(p) => p.navHeight}px;
	background: var(--gradient);
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

const SubHeading = styled.p`
	color: var(--light);
	opacity: 0.8;
	font-size: 350;
`;

const Button = styled.button`
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

const fixedStyles = css<ExpandedProps>`
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
	${fixedStyles}
	right: 0;
	background: var(--light);
	width: clamp(300px, 70%, 400px);
`;

const StyledOverlay = styled(Overlay)`
	${fixedStyles}
	left: 0;
	width: 100%;
`;

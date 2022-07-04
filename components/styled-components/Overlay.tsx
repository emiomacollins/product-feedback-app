import styled from 'styled-components';

interface Props {
	expanded: boolean;
}

export const Overlay = styled.div<Props>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--black);
	opacity: ${(p) => (p.expanded ? 0.5 : 0)};
	transition: 0.2s;
	mix-blend-mode: normal;
`;

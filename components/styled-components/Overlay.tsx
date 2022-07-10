import styled, { css } from 'styled-components';

interface Props {
	expanded: boolean;
}

export const overlayStyles = css<Props>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	pointer-events: none;
	transition: 0.2s;

	${(p) =>
		p.expanded &&
		css`
			opacity: 1;
			pointer-events: visible;
		`}
`;

export const Overlay = styled.div`
	${overlayStyles}
	background: var(--black);
	mix-blend-mode: normal;

	${(p) =>
		p.expanded &&
		css`
			opacity: 0.5;
			pointer-events: visible;
		`}
`;

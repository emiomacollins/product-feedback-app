import styled, { css } from 'styled-components';

interface Props {
	gap?: number;
}

export const gridStyles = css<Props>`
	display: grid;
	gap: ${(p) => p.gap ?? 1}rem;
`;

export const Grid = styled.div`
	${gridStyles}
`;

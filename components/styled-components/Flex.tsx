import styled, { css } from 'styled-components';

interface Props {
	gap?: number;
}

export const flexStyles = css<Props>`
	display: flex;
	align-items: center;
	gap: ${(p) => p.gap ?? 1}rem;
`;

export const Flex = styled.div`
	${flexStyles}
`;

import styled, { css } from 'styled-components';

interface Props {
	gap?: number;
	$wrap?: boolean;
	spaceBetween?: boolean;
}

export const flexStyles = css<Props>`
	${({ gap, $wrap: wrap, spaceBetween }) => css`
		display: flex;
		align-items: center;
		gap: ${gap ?? 1}rem;
		flex-wrap: ${wrap ? 'wrap' : 'no-wrap'};
		${spaceBetween &&
		css`
			justify-content: space-between;
		`}
	`}
`;

export const Flex = styled.div`
	${flexStyles}
`;

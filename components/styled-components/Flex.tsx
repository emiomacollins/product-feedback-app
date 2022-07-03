import styled, { css } from 'styled-components';

interface Props {
	gap?: number;
	$wrap?: boolean;
}

export const flexStyles = css<Props>`
	${({ gap, $wrap: wrap }) => css`
		display: flex;
		align-items: center;
		gap: ${gap ?? 1}rem;
		flex-wrap: ${wrap ? 'wrap' : 'no-wrap'};
	`}
`;

export const Flex = styled.div`
	${flexStyles}
`;

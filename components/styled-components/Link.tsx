import styled, { css } from 'styled-components';
import { Color } from '../../types/colors';

interface Props {
	color?: Color;
}

export const Link = styled.a<Props>`
	${({ color }) => css`
		color: var(--${color || 'blue'});

		&:focus {
			outline-color: currentColor;
		}
	`}
`;

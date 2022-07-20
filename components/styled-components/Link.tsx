import styled from 'styled-components';
import { Color } from '../../types/colors';

interface Props {
	color?: Color;
}

export const Link = styled.a<Props>`
	color: var(--${(p) => p.color || 'blue'});
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}

	&:focus {
		outline-color: currentColor;
	}
`;

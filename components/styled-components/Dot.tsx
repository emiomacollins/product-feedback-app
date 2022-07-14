import styled from 'styled-components';
import { Color } from '../../types/colors';

interface Props {
	color: Color;
}

export const Dot = styled.span<Props>`
	width: 1rem;
	aspect-ratio: 1;
	border-radius: 100%;
	background: var(--${(p) => p.color});
`;

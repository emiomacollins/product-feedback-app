import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../types/colors';

interface StyleProps {
	color?: Color;
}

interface Props extends StyleProps {
	children: ReactNode;
}

export default function Button({ children, ...styleProps }: Props) {
	return <Container {...styleProps}>{children}</Container>;
}

export const Container = styled.button<StyleProps>`
	padding: 1rem 2rem;
	color: var(--white);
	font-weight: 600;
	background: var(--purple);
	border-radius: var(--radius-400);
	white-space: nowrap;
	transition: all 0.2s;

	&:hover,
	&:active {
		opacity: 0.9;
	}

	&:active {
		transform: scale(0.97);
	}

	${({ color }) => css`
		background: var(--${color});
	`}
`;

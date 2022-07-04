import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../types/colors';

interface StyleProps {
	$color?: Color;
}

interface Props extends StyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export default forwardRef(function Button(
	{ children, ...styleAndElementProps }: Props,
	ref: Ref<Element>
) {
	return (
		<Container ref={ref as any} {...styleAndElementProps}>
			{children}
		</Container>
	);
});

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

	&:disabled {
		opacity: 0.6;
	}

	${({ $color: color }) => css`
		background: var(--${color});
	`}
`;

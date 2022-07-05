import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../types/colors';
import Spinner from './styled-components/Spinner';

interface StyleProps {
	$color?: Color;
}

interface LoadingProps {
	isLoading?: boolean;
}
interface Props
	extends StyleProps,
		ButtonHTMLAttributes<HTMLButtonElement>,
		LoadingProps {
	children: ReactNode;
}

function Button({ children, isLoading, ...props }: Props, ref: Ref<Element>) {
	return (
		<Container ref={ref as any} {...props}>
			{isLoading && <StyledSpinner color='white' />}
			<Children isLoading={isLoading}>{children}</Children>
		</Container>
	);
}

export default forwardRef(Button);

export const Container = styled.button<StyleProps>`
	padding: 1rem 2rem;
	color: var(--white);
	font-weight: 600;
	background: var(--purple);
	border-radius: var(--radius-400);
	white-space: nowrap;
	transition: all 0.2s;
	position: relative;

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

const Children = styled.div<LoadingProps>`
	opacity: ${(p) => (p.isLoading ? 0 : 1)};
`;

const StyledSpinner = styled(Spinner)`
	height: 2rem;
`;

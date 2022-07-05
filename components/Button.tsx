import { ButtonHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../types/colors';
import Spinner from './styled-components/Spinner';

interface Size {
	width: number;
	height: number;
}
interface StyleProps {
	$color?: Color;
	size?: Size | null;
}

interface Props extends StyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isLoading?: boolean;
}

function Button({ children, isLoading, ...props }: Props) {
	const [size, setSize] = useState<Size | null>(null);
	const ref = useRef<Element>();

	useEffect(() => {
		const { clientHeight = 0, clientWidth = 0 } = ref.current || {};
		setSize({ width: clientWidth, height: clientHeight });
	}, []);

	return (
		<Container ref={ref as any} {...props} size={size}>
			{isLoading ? <StyledSpinner color='white' /> : children}
		</Container>
	);
}

export default Button;

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

	${({ $color: color, size }) => css`
		background: var(--${color});
		${size &&
		css`
			min-width: ${size.width}px;
			min-height: ${size.height}px;
		`}
	`}
`;

const StyledSpinner = styled(Spinner)`
	height: 2rem;
`;

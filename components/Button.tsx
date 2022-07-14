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
	tooltip?: string;
}

function Button(props: Props, ref: Ref<Element>) {
	const { children, isLoading, tooltip, ...restProps } = props;

	return (
		<Container>
			{tooltip && <Tooltip>{tooltip}</Tooltip>}
			<Btn ref={ref as any} {...restProps}>
				{isLoading && <StyledSpinner color='white' />}
				<Children isLoading={isLoading}>{children}</Children>
			</Btn>
		</Container>
	);
}

export default forwardRef(Button);

const Tooltip = styled.div`
	position: absolute;
	top: calc(100% + 1rem);
	right: 0;
	color: var(--blue-dark);
	background: var(--white);
	box-shadow: var(--shadow-400);
	white-space: nowrap;
	padding: 1.5rem;
	border-radius: var(--radius-300);
	font-weight: 500;
	pointer-events: none;
	opacity: 0;
	transition: all 0.2s;
	z-index: 1;
`;

const Container = styled.div`
	position: relative;
	display: grid;

	&:hover {
		${Tooltip} {
			opacity: 1;
		}
	}
`;

export const Btn = styled.button<StyleProps>`
	padding: 1rem 2rem;
	color: var(--white);
	font-weight: 600;
	background: var(--${(p) => p.$color || 'purple'});
	border-radius: var(--radius-400);
	white-space: nowrap;
	transition: all 0.2s;
	position: relative;

	&:hover {
		opacity: 0.9;
	}

	&:active {
		transform: scale(0.97);
	}

	&:disabled {
		opacity: var(--disabled-opacity);
		cursor: default;

		&:active {
			transform: scale(1);
		}
	}

	&:focus {
		outline-color: var(--${(p) => p.$color || 'purple'});
	}

	${({ $color }) => css`
		${$color === 'transparent' &&
		css`
			color: var(--blue);
		`}
	`}
`;

const Children = styled.div<LoadingProps>`
	opacity: ${(p) => (p.isLoading ? 0 : 1)};
`;

const StyledSpinner = styled(Spinner)`
	height: 2rem;
`;

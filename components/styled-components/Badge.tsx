import styled, { css } from 'styled-components';

interface Props {
	$active?: boolean;
	plain?: boolean;
}

export const Badge = styled.button<Props>`
	background: var(--light);
	text-transform: capitalize;
	border-radius: var(--radius-400);
	padding: 0.5rem 1.5rem;
	color: var(--blue);
	font-weight: 600;
	transition: all 0.2s;

	&:hover,
	&:focus {
		background: var(--blue-light-300);
	}

	&:focus {
		outline: 0;
	}

	&:disabled {
		opacity: var(--disabled-opacity);
	}

	${(p) =>
		p.plain &&
		css`
			cursor: default;

			&:hover {
				background: var(--light);
			}
		`}

	${(p) =>
		p.$active &&
		css`
			background: var(--blue) !important;
			color: var(--white);

			&:hover {
				background: var(--blue);
			}
		`}
`;

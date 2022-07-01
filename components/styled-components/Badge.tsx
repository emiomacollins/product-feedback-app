import styled, { css } from 'styled-components';

interface Props {
	active: boolean;
}

export const Badge = styled.button<Props>`
	background: var(--light);
	text-transform: capitalize;
	border-radius: var(--radius-500);
	padding: 0.5rem 1.5rem;
	color: var(--blue);
	font-weight: 600;
	transition: all 0.2s;

	&:hover {
		background: var(--blue-light-300);
	}

	${(p) =>
		p.active &&
		css`
			background: var(--blue);
			color: var(--white);

			&:hover {
				background: var(--blue);
			}
		`}
`;

import styled, { css } from 'styled-components';

export const cardStyles = css`
	padding: 2.5rem;
	border-radius: var(--radius-400);
	background: var(--white);
`;

export const Card = styled.div`
	${cardStyles}
`;

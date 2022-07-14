import styled, { css } from 'styled-components';

export const cardStyles = css`
	padding: var(--card-padding);
	border-radius: var(--radius-400);
	background: var(--white);
`;

export const Card = styled.div`
	${cardStyles}
`;

import styled, { css } from 'styled-components';

export interface TextboxStyleProps {
	isError?: boolean;
}

export const textboxStyles = css<TextboxStyleProps>`
	padding: 1.5rem 2rem;
	background: var(--light);
	border: 0;
	border-radius: var(--radius-300);
	border: 1px solid ${(p) => (p.isError ? 'var(--red)' : 'transparent')};
	transition: all 0.2s;
	color: var(--blue-dark);

	&::placeholder {
		color: inherit;
		opacity: 0.5;
	}

	&:focus {
		border-color: var(--blue);
		outline: 0;
	}
`;

export const Textbox = styled.input`
	${textboxStyles}
`;

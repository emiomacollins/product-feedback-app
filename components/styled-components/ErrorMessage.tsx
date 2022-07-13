import styled from 'styled-components';

export const ErrorMessage = styled.p`
	color: var(--red);
	&::first-letter {
		text-transform: capitalize;
	}
`;

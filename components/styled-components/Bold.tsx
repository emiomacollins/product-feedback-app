import styled from 'styled-components';

interface Props {
	weight?: number;
}

export const Bold = styled.span<Props>`
	font-weight: ${(p) => p.weight || 600};
`;

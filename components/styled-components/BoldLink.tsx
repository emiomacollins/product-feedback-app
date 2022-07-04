import styled from 'styled-components';
import { Link } from './Link';

export const BoldLink = styled(Link)`
	font-weight: 600;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

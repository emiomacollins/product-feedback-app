import styled from 'styled-components';
import { Grid } from '../../components/styled-components/Grid';

interface Props {
	className?: string;
}

export default function Logo(props: Props) {
	return (
		<Container gap={0} {...props}>
			<h2>Your Product</h2>
			<SubHeading>Feedback Forum</SubHeading>
		</Container>
	);
}

const Container = styled(Grid)`
	color: var(--white);
`;

const SubHeading = styled.p`
	opacity: 0.8;
	font-size: 350;
`;

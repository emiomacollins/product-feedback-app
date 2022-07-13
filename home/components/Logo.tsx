import styled from 'styled-components';
import { Grid } from '../../components/styled-components/Grid';

interface Props {
	className?: string;
}

export default function Logo(props: Props) {
	return (
		<Container gap={0} {...props}>
			<Heading>Your Product</Heading>
			<SubHeading>Feedback Forum</SubHeading>
		</Container>
	);
}

const Container = styled(Grid)`
	color: var(--white);
`;

const Heading = styled.h2`
	font-size: var(--size-650);
`;

const SubHeading = styled.p`
	opacity: 0.8;
	font-size: var(--size-350);
`;

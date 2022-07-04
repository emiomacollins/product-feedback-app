import Link from 'next/link';
import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/custom/ArrowDownIcon';
import Button from '../../components/Button';
import { BoldLink } from '../../components/styled-components/BoldLink';
import { cardStyles } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import Textbox from '../../components/Textbox';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';

export default function CreateFeedback() {
	return (
		<Container>
			<Link href={routes.home}>
				<BoldLink color='gray'>
					<Flex>
						<StyledArrowIcon color='gray' /> <span>Go back</span>
					</Flex>
				</BoldLink>
			</Link>

			<Form>
				<Grid gap={5}>
					<Heading>Create New Feedback</Heading>

					<Grid>
						<Textbox
							label='Feedback Title'
							description='Add a short, descriptive headline'
						/>
					</Grid>

					<Buttons>
						{/* For editing add delete here */}
						<Flex>
							<Button $color='blue-dark'>Cancel</Button>
							<Button>Add Feedback</Button>
						</Flex>
					</Buttons>
				</Grid>
			</Form>
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	max-width: 600px;
	display: grid;
	gap: 4rem;
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(90deg);
`;

const Form = styled.form`
	${cardStyles}
	padding: 2rem 2.5rem;

	@media ${Breakpoints.tabletUp} {
		padding: 4rem 3rem;
	}
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

const Buttons = styled.div`
	${flexStyles}
	justify-self: right;
	justify-content: space-between;
`;

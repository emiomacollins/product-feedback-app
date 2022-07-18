import styled from 'styled-components';
import NotFoundIcon from '../../assets/svgs/custom/NotFoundIcon';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';

interface Props {
	message?: string;
	CustomButton?: JSX.Element;
	details?: string;
}

export default function NoFeedbackMessage({
	message,
	CustomButton,
	details,
	...props
}: Props) {
	return (
		<Container {...props}>
			<NotFoundIcon />
			<Grid>
				<Heading>{message || 'There is no feedback yet'}</Heading>
				<Text>
					{details ||
						'Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.'}
				</Text>
			</Grid>
			{CustomButton || <AddFeedbackButton />}
		</Container>
	);
}

const Container = styled.div`
	text-align: center;
	background: var(--white);
	color: var(--gray);
	border-radius: var(--radius-400);
	min-height: 55vh;
	padding: 3rem;
	display: grid;
	gap: 3rem;
	place-content: center;
	justify-items: center;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

const Text = styled.p`
	text-align: center;

	@media ${Breakpoints.tabletUp} {
		max-width: 70%;
		margin-inline: auto;
	}
`;

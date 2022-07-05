import Image from 'next/image';
import styled from 'styled-components';
import EmptyIconPath from '../../assets/svgs/illustration-empty.svg';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import { contentStyles } from '../../components/styled-components/Content';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';

export default function NoFeedbackMessage() {
	return (
		<Container>
			<Icon>
				<Image src={EmptyIconPath} alt='' />
			</Icon>
			<Grid>
				<Heading>There is no feedback yet</Heading>
				<Text>
					Got a suggestion? Found a bug that needs to be squashed? We love
					hearing about new ideas to improve our app.
				</Text>
			</Grid>
			<AddFeedbackButton />
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

	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

const Icon = styled.div`
	position: relative;
	width: clamp(8rem, 8vw, 12rem);
	aspect-ratio: 1;

	img {
		object-fit: contain;
	}
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

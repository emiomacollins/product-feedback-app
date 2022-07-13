import Image from 'next/image';
import styled from 'styled-components';
import EmptyIconPath from '../../assets/svgs/illustration-empty.svg';
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
			<Icon>
				<Image src={EmptyIconPath} alt='' />
			</Icon>
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

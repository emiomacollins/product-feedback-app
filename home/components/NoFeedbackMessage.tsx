import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import PlusIconPath from '../../assets/svgs/icon-plus.svg';
import EmptyIconPath from '../../assets/svgs/illustration-empty.svg';
import Button from '../../components/Button';
import { contentStyles } from '../../components/styled-components/Content';
import { Flex } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';

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
			<Link href={routes.createFeedback}>
				<Button>
					<Flex gap={0.5}>
						<Image src={PlusIconPath} alt='' width={20} height={20} />
						<span>Add Feedback</span>
					</Flex>
				</Button>
			</Link>
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

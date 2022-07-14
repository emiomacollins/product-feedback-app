import styled from 'styled-components';
import { Card } from '../../../components/styled-components/Card';
import { contentStyles } from '../../../components/styled-components/Content';
import { Dot } from '../../../components/styled-components/Dot';
import { Flex } from '../../../components/styled-components/Flex';
import { Grid, gridStyles } from '../../../components/styled-components/Grid';
import { Breakpoints } from '../../../constants/breakpoints';
import FeedbackCard from '../../../home/components/FeedbackCard/FeedbackCard';
import { Color } from '../../../types/colors';
import { Feedback } from '../../../types/feedback';

interface Props {
	status: string;
	heading: string;
	description: string;
	feedbacks: Feedback[] | undefined;
	color: Color;
}

export default function FeedbackList({
	status,
	heading,
	description,
	feedbacks,
	color,
}: Props) {
	return (
		<Container>
			<Grid gap={0.6}>
				<Heading>{heading}</Heading>
				<p>{description}</p>
			</Grid>

			{feedbacks?.map((feedback) => (
				<StatusCard key={feedback.id} color={color}>
					<StatusCardHeading>
						<Dot color={color} />
						<p>{status}</p>
					</StatusCardHeading>
					<StyledFeedbackCard feedback={feedback} mobileOnly={true} />
				</StatusCard>
			))}
		</Container>
	);
}

const Container = styled.div`
	padding-block: 3rem;
	display: grid;
	gap: 3rem;

	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

interface StatusCardProps {
	color: Color;
}

const StatusCard = styled(Card)<StatusCardProps>`
	${gridStyles}
	position: relative;
	gap: 0;
	padding: 0;
	padding-top: 2rem;
	border-radius: var(--radius-300);
	overflow: hidden;

	&:after {
		content: '';
		width: 100%;
		height: 6px;
		position: absolute;
		top: 0;
		left: 0;
		background: var(--${(p) => p.color});
	}
`;

const StatusCardHeading = styled(Flex)`
	margin-left: var(--card-padding);

	@media ${Breakpoints.tabletUp} {
		margin-left: 2.5rem;
	}

	@media ${Breakpoints.desktopUp} {
		margin-left: var(--card-padding);
	}
`;

const StyledFeedbackCard = styled(FeedbackCard)`
	@media ${Breakpoints.tabletUp} {
		padding: 2rem 2.5rem;
	}
	@media ${Breakpoints.desktopUp} {
		padding: var(--card-padding);
	}
`;

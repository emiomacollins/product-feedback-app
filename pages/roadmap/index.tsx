import { useState } from 'react';
import styled, { css } from 'styled-components';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import GoBackLink from '../../components/curried/GoBackLink';
import { Card } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { Grid, gridStyles } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import fetchFeedbacks from '../../hooks/useFeedbacks/api/fetchFeedbacks';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { Color } from '../../types/colors';
import { Feedback, FeedbackStatus } from '../../types/feedback';

interface Props {
	initialFeedbacks: Feedback[];
}

const statuses = Object.values(FeedbackStatus).filter(
	(status) => status != FeedbackStatus.suggestion
);

export default function Roadmap({ initialFeedbacks }: Props) {
	const [currentStatus, setCurrentStatus] = useState(FeedbackStatus.inProgress);
	const { statusCounts } = useFeedbacks({ initialValue: initialFeedbacks });
	const statusInfoMap: { [status: string]: string } = {
		[FeedbackStatus.planned]: 'Ideas prioritized for research',
		[FeedbackStatus.inProgress]: 'Features currently being developed',
		[FeedbackStatus.live]: 'Released features',
	};

	return (
		<Container>
			<Header>
				<HeaderContent>
					<Grid gap={0.5}>
						<StyledGoBackLink color='white' />
						<h2>Roadmap</h2>
					</Grid>
					<AddFeedbackButton />
				</HeaderContent>
			</Header>

			<Switch>
				{statuses.map((status) => (
					<StatusToggle
						key={`toggle-${status}`}
						active={status === currentStatus}
						onClick={() => setCurrentStatus(status)}
					>
						{status} ({statusCounts?.[status] || 0})
					</StatusToggle>
				))}
			</Switch>

			<Content>
				<Grid>
					<Heading>
						{currentStatus} ({statusCounts?.[currentStatus] || 0})
					</Heading>
					<p>{statusInfoMap[currentStatus]}</p>
				</Grid>
			</Content>
		</Container>
	);
}

const Container = styled.div``;

const Header = styled(Card)`
	background: var(--blue-dark);
	color: var(--white);

	@media ${Breakpoints.tabletDown} {
		margin-top: calc(-1 * var(--app-padding));
		padding: 2rem 0;
		border-radius: 0;
	}
`;

const HeaderContent = styled.div`
	${flexStyles}
	justify-content: space-between;
	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

const StyledGoBackLink = styled(GoBackLink)`
	padding-block: 0;
`;

const Switch = styled.div`
	${gridStyles}
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	gap: 0;
`;

interface StatusToggleProps {
	active: boolean;
}

const StatusToggle = styled.button<StatusToggleProps>`
	background: var(--transparent);
	position: relative;
	padding-block: 2rem;
	text-align: center;
	color: var(--gray-transparent);
	font-weight: 600;
	border-bottom: 1.2px solid var(--black-transparent-100);

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 4px;
		bottom: -1.2px;
		left: 0;
	}

	${(p) =>
		p.active &&
		css`
			color: var(--gray);

			&::before {
				background: var(--purple);
			}
		`}

	&:focus {
		outline: 0;
		color: var(--gray);
	}
`;

const Content = styled.div`
	${contentStyles}
	padding-block: 3rem;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

interface StatusCardProps {
	color: Color;
}

const StatusCard = styled(Card)<StatusCardProps>``;

export async function getServerSideProps() {
	const initialFeedbacks = await fetchFeedbacks();
	return {
		props: {
			initialFeedbacks,
		},
	};
}

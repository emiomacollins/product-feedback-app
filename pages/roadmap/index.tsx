import { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import GoBackLink from '../../components/curried/GoBackLink';
import Show from '../../components/Show';
import { Card } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { Grid, gridStyles } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import fetchFeedbacks from '../../hooks/useFeedbacks/api/fetchFeedbacks';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { Color } from '../../types/colors';
import { Feedback, FeedbackStatus, statusColors } from '../../types/feedback';
import FeedbackList from './components/FeedbackList';

interface Props {
	initialFeedbacks: Feedback[];
}

const statuses = Object.values(FeedbackStatus).filter(
	(status) => status != FeedbackStatus.suggestion
);

export default function Roadmap({ initialFeedbacks }: Props) {
	const [currentStatus, setCurrentStatus] = useState(FeedbackStatus.inProgress);
	const currentColor = statusColors[currentStatus];

	const {
		statusCounts,
		query: { data: feedbacks },
	} = useFeedbacks({
		options: {
			initialData: initialFeedbacks,
		},
	});

	const statusInfoMap: { [status: string]: string } = {
		[FeedbackStatus.planned]: 'Ideas prioritized for research',
		[FeedbackStatus.inProgress]: 'Features currently being developed',
		[FeedbackStatus.live]: 'Released features',
	};

	const filteredFeedbacks = useMemo(
		() => feedbacks?.filter(({ status }) => status === currentStatus),
		[currentStatus, feedbacks]
	);

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

			<Show on={Breakpoints.tabletDown}>
				<Switch>
					{statuses.map((status) => (
						<StatusToggle
							key={`toggle-${status}`}
							active={status === currentStatus}
							onClick={() => setCurrentStatus(status)}
							color={currentColor}
						>
							{status} ({statusCounts?.[status] || 0})
						</StatusToggle>
					))}
				</Switch>

				<FeedbackList
					status={currentStatus}
					heading={`${currentStatus} (${statusCounts?.[currentStatus] || 0})`}
					description={statusInfoMap[currentStatus]}
					feedbacks={filteredFeedbacks}
					color={currentColor}
				/>
			</Show>

			<Show on={Breakpoints.tabletUp}>
				<Content>
					<Row>
						{statuses.map((status) => (
							<FeedbackList
								key={`list-${status}`}
								status={status}
								heading={`${status} (${statusCounts?.[status] || 0})`}
								description={statusInfoMap[status]}
								feedbacks={feedbacks?.filter(
									({ status: feedbackStatus }) =>
										feedbackStatus === status
								)}
								color={statusColors[status]}
							/>
						))}
					</Row>
				</Content>
			</Show>
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

const Content = styled.div`
	padding-block: 1rem;
	@media ${Breakpoints.desktopUp} {
		padding-block: 2rem;
	}
`;

const rowStyles = css`
	${gridStyles}
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	align-items: flex-start;
`;

const Switch = styled.div`
	${rowStyles}
	gap: 0;
`;

const Row = styled.div`
	${rowStyles}
	gap: 1.5rem;

	@media ${Breakpoints.desktopUp} {
		gap: 3rem;
	}
`;

interface StatusToggleProps {
	active: boolean;
	color: Color;
}

const StatusToggle = styled.button<StatusToggleProps>`
	background: var(--transparent);
	position: relative;
	padding-block: 2rem;
	text-align: center;
	color: var(--gray-transparent);
	font-weight: 600;
	border-bottom: 1.2px solid var(--black-transparent-100);
	white-space: nowrap;

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
				background: var(--${(p) => p.color});
			}
		`}

	&:focus {
		outline: 0;
		color: var(--gray);
	}
`;

export async function getServerSideProps() {
	const initialFeedbacks = await fetchFeedbacks();
	return {
		props: {
			initialFeedbacks,
		},
	};
}

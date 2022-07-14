import Link from 'next/link';
import styled from 'styled-components';
import { Bold } from '../../components/styled-components/Bold';
import { BoldLink } from '../../components/styled-components/BoldLink';
import { Card } from '../../components/styled-components/Card';
import { Dot } from '../../components/styled-components/Dot';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { routes } from '../../constants/routes';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { FeedbackStatus, statusColors } from '../../types/feedback';

interface Props {
	onClick?: () => void;
}

export default function RoadmapCard({ onClick }: Props) {
	const { query, statusCounts } = useFeedbacks();
	const { data: feedbacks } = query;

	return (
		<Roadmap>
			<RoadmapRow>
				<Heading>Roadmap</Heading>
				<Link href={routes.roadmap} passHref>
					<BoldLink onClick={onClick}>View</BoldLink>
				</Link>
			</RoadmapRow>

			<Grid>
				{Object.values(FeedbackStatus).map((status, i) => {
					if (status === FeedbackStatus.suggestion) return null;

					return (
						<RoadmapRow key={`roadmap-${status}`}>
							<Flex gap={2}>
								<Dot color={statusColors[status]} />
								{status}
							</Flex>
							<Bold weight={800}>{statusCounts?.[status] || 0}</Bold>
						</RoadmapRow>
					);
				})}
			</Grid>
		</Roadmap>
	);
}

const Roadmap = styled(Card)`
	display: grid;
	gap: 2rem;
	color: var(--gray);
`;

const RoadmapRow = styled.div`
	${flexStyles}
	justify-content: space-between;
	gap: 2rem;
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

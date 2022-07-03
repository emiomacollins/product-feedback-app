import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Bold } from '../../components/styled-components/Bold';
import { Card } from '../../components/styled-components/Card';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { routes } from '../../constants/routes';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { Color } from '../../types/colors';
import { FeedbackStatus } from '../../types/feedback';

export default function RoadmapCard() {
	const { query } = useFeedbacks();
	const { data: feedbacks } = query;

	const statusCounts = useMemo(() => {
		return feedbacks?.reduce((obj: { [status: string]: number }, feedback) => {
			const currentCount = obj[feedback.status];
			return {
				...obj,
				[feedback.status]: currentCount ? currentCount + 1 : 1,
			};
		}, {});
	}, [feedbacks]);

	return (
		<Roadmap>
			<RoadmapRow>
				<Heading>Roadmap</Heading>
				<Link href={routes.roadmap} passHref>
					<BoldLink>View</BoldLink>
				</Link>
			</RoadmapRow>

			<Grid>
				{Object.values(FeedbackStatus).map((status, i) => {
					// ignore suggestion status
					if (i === 0) return null;
					const colors: Color[] = ['orange', 'purple', 'blue'];

					return (
						<RoadmapRow key={`roadmap-${status}`}>
							<Flex gap={2}>
								<Dot color={colors[i - 1]} />
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

interface DotProps {
	color: Color;
}

const Dot = styled.span<DotProps>`
	width: 1rem;
	aspect-ratio: 1;
	border-radius: 100%;
	background: var(--${(p) => p.color || 'purple'});
`;

const BoldLink = styled.a`
	font-weight: 600;
`;
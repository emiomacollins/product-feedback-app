import { useEffect } from 'react';
import styled from 'styled-components';
import { contentStyles } from '../../components/styled-components/Content';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import toggleUpvote from './FeedbackCard/api';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import NoFeedbackMessage from './NoFeedbackMessage';

export default function FeedbackList() {
	const { processedFeedbacks } = useFeedbacks();

	useEffect(() => {
		toggleUpvote({ isPing: true, feedbackId: '' });
	}, []);

	return (
		<Container gap={2}>
			{processedFeedbacks.length > 0 ? (
				processedFeedbacks.map((feedback) => (
					<FeedbackCard key={feedback.id} feedback={feedback} />
				))
			) : (
				<NoFeedbackMessage />
			)}
		</Container>
	);
}

const Container = styled(Grid)`
	margin-bottom: 2rem;

	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

import styled from 'styled-components';
import { contentStyles } from '../../components/styled-components/Content';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import FeedbackCard from './FeedbackCard/FeedbackCard';
import NoFeedbackMessage from './NoFeedbackMessage';

export default function FeedbackList() {
	const { processedFeedbacks } = useFeedbacks();

	if (processedFeedbacks?.length === 0) return <NoFeedbackMessage />;

	return (
		<Container gap={2}>
			{processedFeedbacks?.map((feedback) => (
				<FeedbackCard key={feedback.id} feedback={feedback} />
			))}
		</Container>
	);
}

const Container = styled(Grid)`
	margin-bottom: 2rem;
	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

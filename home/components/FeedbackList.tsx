import styled from 'styled-components';
import { contentStyles } from '../../components/styled-components/Content';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import FeedbackCard from './FeedbackCard';
import NoFeedbackMessage from './NoFeedbackMessage';

export default function FeedbackList() {
	const {
		query: { data: feedbacks },
	} = useFeedbacks();

	if (feedbacks?.length === 0) return <NoFeedbackMessage />;

	return (
		<Container gap={2}>
			{feedbacks?.map((feedback) => (
				<FeedbackCard key={feedback.id} feedback={feedback} />
			))}
		</Container>
	);
}

const Container = styled(Grid)`
	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

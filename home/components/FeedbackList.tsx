import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { contentStyles } from '../../components/styled-components/Content';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import {
	getFeedbackCategoryFilter,
	getFeedbackSort,
} from '../../lib/redux/slices/feedback';
import { FeedbackSortBy } from '../../types/feedback';
import FeedbackCard from './FeedbackCard';
import NoFeedbackMessage from './NoFeedbackMessage';

export default function FeedbackList() {
	const {
		query: { data: feedbacks },
	} = useFeedbacks();

	const sortBy = useSelector(getFeedbackSort);
	const categoryFilter = useSelector(getFeedbackCategoryFilter);

	const processedFeedbacks = useMemo(() => {
		if (!feedbacks) return undefined;

		const sortedFeedbacks = [...feedbacks].sort((feedback1, feedback2) => {
			if (sortBy === FeedbackSortBy.mostUpvotes) {
				return Object.keys(feedback1.upVotes).length >
					Object.keys(feedback2.upVotes).length
					? -1
					: 1;
			}

			if (sortBy === FeedbackSortBy.leastUpvotes) {
				return Object.keys(feedback1.upVotes).length >
					Object.keys(feedback2.upVotes).length
					? 1
					: -1;
			}

			if (sortBy === FeedbackSortBy.mostComments) {
				return feedback1.comments.length > feedback2.comments.length ? 1 : -1;
			}

			if (sortBy === FeedbackSortBy.leastComments) {
				return feedback1.comments.length > feedback2.comments.length ? -1 : 1;
			}

			return 1;
		});

		const filteredFeedbacks = sortedFeedbacks.filter((feedback) => {
			return categoryFilter ? feedback.category === categoryFilter : true;
		});

		return filteredFeedbacks;
	}, [sortBy, categoryFilter, feedbacks]);

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
	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}
`;

import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from './api';

export function useFeedbacks() {
	const queryClient = useQueryClient();
	const fetchFeedbacksKey = 'fetchFeedbacks';

	const query = useQuery(fetchFeedbacksKey, api.fetchFeedbacks, {
		cacheTime: Infinity,
	});

	const toggleUpvoteMutation = useMutation('toggleUpvote', api.toggleUpvote, {
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbacksKey);
		},
	});

	return {
		query,
		toggleUpvoteMutation,
	};
}

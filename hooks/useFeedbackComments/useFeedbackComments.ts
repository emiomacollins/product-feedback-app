import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FeedbackComment } from '../../types/feedback';
import { fetchFeedbackComments } from './api/fetchFeedbackComments';

interface Props {
	id: string;
	initialValue?: FeedbackComment[];
}

export const fetchFeedbackCommentsKey = `fetchFeedbackComments`;

export function useFeedbackComments({ id, initialValue }: Props) {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries(fetchFeedbackCommentsKey);
	}, [id, queryClient]);

	const query = useQuery(
		[fetchFeedbackCommentsKey, id],
		({ queryKey }) => {
			const feedbackId = queryKey[1];
			return fetchFeedbackComments(feedbackId);
		},
		{
			initialData: initialValue,
		}
	);

	return query;
}

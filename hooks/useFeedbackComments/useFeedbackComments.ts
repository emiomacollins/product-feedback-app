import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { FeedbackComment } from '../../types/feedback';
import { fetchFeedbackComments } from './api/fetchFeedbackComments';

interface Props {
	feedbackId: string;
	initialValue?: FeedbackComment[];
}

export const fetchFeedbackCommentsKey = `fetchFeedbackComments`;

export function useFeedbackComments({ feedbackId, initialValue }: Props) {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries(fetchFeedbackCommentsKey);
	}, [feedbackId, queryClient]);

	const query = useQuery(
		[fetchFeedbackCommentsKey, feedbackId],
		({ queryKey }) => {
			const feedbackId = queryKey[1];
			return fetchFeedbackComments(feedbackId);
		},
		{
			initialData: initialValue,
		}
	);

	return { ...query, data: query.data as FeedbackComment[] };
}

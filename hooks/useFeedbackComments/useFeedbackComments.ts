import { useQuery, UseQueryOptions } from 'react-query';
import { FeedbackComment } from '../../types/feedback';
import { fetchFeedbackComments } from './api/fetchFeedbackComments';

export const fetchFeedbackCommentsKey = `fetchFeedbackComments`;

interface Props {
	id: string;
	initialValue?: FeedbackComment[];
	options?: UseQueryOptions;
}

export function useFeedbackComments({ id, initialValue, options }: Props) {
	const query = useQuery(
		[fetchFeedbackCommentsKey, id],
		({ queryKey }) => {
			const feedbackId = queryKey[1];
			return fetchFeedbackComments(feedbackId);
		},
		options as any
	);

	return query;
}

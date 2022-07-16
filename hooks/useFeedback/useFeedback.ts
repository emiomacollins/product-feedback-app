import { useQuery, UseQueryOptions } from 'react-query';
import fetchFeedback from './api/fetchFeedback';

export const fetchFeedbackKey = `fetchFeedback`;

interface Props {
	id: string;
	options?: UseQueryOptions;
}

export function useFeedback({ id, options }: Props) {
	const query = useQuery(
		[fetchFeedbackKey, id],
		() => fetchFeedback(id),
		options as any
	);

	return query;
}

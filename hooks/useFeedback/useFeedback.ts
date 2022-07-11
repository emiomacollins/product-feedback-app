import { useQuery } from 'react-query';
import { Feedback } from '../../types/feedback';
import fetchFeedback from './api/fetchFeedback';

export const fetchFeedbackKey = `fetchFeedback`;

interface Props {
	id: string;
	initialValue?: Feedback | null;
}

export function useFeedback({ id, initialValue }: Props) {
	const query = useQuery([fetchFeedbackKey, id], () => fetchFeedback(id), {
		cacheTime: 0, // for edit-feedback page (background update of the query won't change the form)
		initialData: initialValue,
	});

	return query;
}

import { useQuery } from 'react-query';
import { Feedback } from '../../types/feedback';
import fetchFeedback from './api/fetchFeedback';

export const fetchFeedbackKey = `fetchFeedback`;

interface Props {
	id: string;
	initialValue?: Feedback;
}

export function useFeedback({ id, initialValue }: Props) {
	const query = useQuery([fetchFeedbackKey, id], () => fetchFeedback(id), {
		// for edit-feedback page (background update of the query won't change the form)
		cacheTime: 0,
		initialData: initialValue,
	});

	return { ...query, data: query.data as Feedback };
}

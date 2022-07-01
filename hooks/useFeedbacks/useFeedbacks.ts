import { useQuery } from 'react-query';
import fetchFeedbacks from './api';

export function useFeedbacks() {
	const query = useQuery('fetchFeedbacks', fetchFeedbacks, {
		cacheTime: Infinity,
	});

	return {
		query,
	};
}

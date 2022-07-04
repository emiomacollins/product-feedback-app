import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import {
	getFeedbackCategoryFilter,
	getFeedbackSort,
} from '../../lib/redux/slices/feedback';
import { Feedback, FeedbackSortBy } from '../../types/feedback';
import feedbacksApi from './api';

export function useFeedbacks(initialFeedbacks?: Feedback[]) {
	const queryClient = useQueryClient();
	const fetchFeedbacksKey = 'fetchFeedbacks';
	const sortBy = useSelector(getFeedbackSort);
	const categoryFilter = useSelector(getFeedbackCategoryFilter);

	const query = useQuery(fetchFeedbacksKey, feedbacksApi.fetchFeedbacks, {
		cacheTime: Infinity,
		initialData: initialFeedbacks,
	});

	const processedFeedbacks = useMemo(() => {
		const { data: feedbacks } = query;
		if (!feedbacks) return null;

		type Order = 'asc' | 'desc';

		const sortByUpVotes = (order: Order, a: Feedback, b: Feedback) => {
			const oneGreater =
				Object.keys(a.upVotes).length > Object.keys(b.upVotes).length;
			if (order === 'asc') return oneGreater ? -1 : 1;
			if (order === 'desc') return oneGreater ? 1 : -1;
			return 1;
		};

		const sortByComments = (order: Order, a: Feedback, b: Feedback) => {
			const oneGreater = a.comments.length > b.comments.length;
			if (order === 'asc') return oneGreater ? -1 : 1;
			if (order === 'desc') return oneGreater ? 1 : -1;
			return 1;
		};

		type sortCallback = (a: Feedback, b: Feedback) => number;

		const sortByFunctionMappings: { [FeedbackSortBy: string]: sortCallback } = {
			[FeedbackSortBy.mostUpvotes]: (...args) => sortByUpVotes('asc', ...args),
			[FeedbackSortBy.leastUpvotes]: (...args) => sortByUpVotes('desc', ...args),
			[FeedbackSortBy.mostComments]: (...args) => sortByComments('asc', ...args),
			[FeedbackSortBy.leastComments]: (...args) => sortByComments('desc', ...args),
		};

		const sortedFeedbacks = [...feedbacks].sort(sortByFunctionMappings[sortBy]);
		const filteredFeedbacks = sortedFeedbacks.filter((feedback) => {
			return categoryFilter ? feedback.category === categoryFilter : true;
		});

		return filteredFeedbacks;
	}, [sortBy, categoryFilter, query]);

	const toggleUpvoteMutation = useMutation('toggleUpvote', feedbacksApi.toggleUpvote, {
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbacksKey);
		},
	});

	return {
		query,
		processedFeedbacks,
		toggleUpvoteMutation,
	};
}

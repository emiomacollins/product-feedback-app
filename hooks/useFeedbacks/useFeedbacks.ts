import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import {
	getFeedbackCategoryFilter,
	getFeedbackSort,
} from '../../lib/redux/slices/feedback';
import { Feedback, FeedbackSortBy } from '../../types/feedback';
import fetchFeedbacks from './api/fetchFeedbacks';

export const fetchFeedbacksKey = 'fetchFeedbacks';

interface Props {
	initialValue?: Feedback[];
}

export function useFeedbacks({ initialValue }: Props = {}) {
	const sortBy = useSelector(getFeedbackSort);
	const categoryFilter = useSelector(getFeedbackCategoryFilter);

	const query = useQuery(fetchFeedbacksKey, fetchFeedbacks, {
		staleTime: Infinity,
		initialData: initialValue,
	});

	const processedFeedbacks = useMemo(() => {
		const { data: feedbacks } = query;
		if (!feedbacks) return [];

		type Order = 'asc' | 'desc';
		type sortCallback = (a: Feedback, b: Feedback) => number;

		const sortByMostRecent: sortCallback = (a, b) => {
			const dateA = new Date(a.dateAdded);
			const dateB = new Date(b.dateAdded);
			return dateA > dateB ? -1 : 1;
		};

		const sortByUpVotes = (order: Order, a: Feedback, b: Feedback) => {
			const oneGreater =
				Object.keys(a.upVotes).length > Object.keys(b.upVotes).length;
			if (order === 'asc') return oneGreater ? -1 : 1;
			if (order === 'desc') return oneGreater ? 1 : -1;
			return 1;
		};

		const sortByComments = (order: Order, a: Feedback, b: Feedback) => {
			const oneGreater = a.commentCount > b.commentCount;
			if (order === 'asc') return oneGreater ? -1 : 1;
			if (order === 'desc') return oneGreater ? 1 : -1;
			return 1;
		};

		const sortByFunctionMappings: { [FeedbackSortBy: string]: sortCallback } = {
			[FeedbackSortBy.mostRecent]: sortByMostRecent,
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

	type StatusCounts = { [status: string]: number };
	const statusCounts = useMemo(() => {
		const { data: feedbacks } = query;

		return feedbacks?.reduce((obj: StatusCounts, feedback) => {
			const currentCount = obj[feedback.status];
			return {
				...obj,
				[feedback.status]: currentCount ? currentCount + 1 : 1,
			};
		}, {});
	}, [query]);

	return {
		query,
		processedFeedbacks,
		statusCounts,
	};
}

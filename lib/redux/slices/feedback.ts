import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackCategory, FeedbackSortBy } from '../../../types/feedback';
import { Store } from '../store';

interface State {
	categoryFilter: FeedbackCategory | null;
	sort: FeedbackSortBy;
}

const initialState: State = {
	categoryFilter: null,
	sort: Object.values(FeedbackSortBy)[0],
};

const feedbacks = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		setFeedbackCategoryFilter(
			state,
			{ payload }: PayloadAction<FeedbackCategory | null>
		) {
			state.categoryFilter = payload;
		},
		setFeedbackSort(state, { payload }: PayloadAction<FeedbackSortBy>) {
			state.sort = payload;
		},
	},
});

export const { setFeedbackCategoryFilter, setFeedbackSort } = feedbacks.actions;

const feedbackReducer = feedbacks.reducer;
export default feedbackReducer;

const getState = (store: Store) => store.feedback;

export const getFeedbackCategoryFilter = createSelector(
	getState,
	({ categoryFilter: filter }) => filter
);

export const getFeedbackSort = createSelector(
	getState,
	({ sort }): FeedbackSortBy => sort
);

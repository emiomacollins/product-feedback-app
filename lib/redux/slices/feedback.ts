import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackCategory, FeedbackSort } from '../../../types/feedback';
import { Store } from '../store';

interface State {
	filter: FeedbackCategory | null;
	sort: FeedbackSort;
}

const initialState: State = {
	filter: null,
	sort: FeedbackSort.mostUpvotes,
};

const feedbacks = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		setFeedbackFilter(state, { payload }: PayloadAction<FeedbackCategory | null>) {
			state.filter = payload;
		},
		setFeedbackSort(state, { payload }: PayloadAction<FeedbackSort>) {
			state.sort = payload;
		},
	},
});

export const { setFeedbackFilter, setFeedbackSort } = feedbacks.actions;

const feedbackReducer = feedbacks.reducer;
export default feedbackReducer;

const getState = (store: Store) => store.feedback;
export const getFeedbackFilter = createSelector(getState, ({ filter }) => filter);
export const getFeedbackSort = createSelector(getState, ({ sort }): FeedbackSort => sort);

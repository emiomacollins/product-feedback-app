import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../store';

interface WithUserPopup {
	message: string;
}
interface State {
	withUserPopup: WithUserPopup | null;
}

const initialState: State = {
	withUserPopup: null,
};

const ui = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setWithUserPopup(state, { payload }: PayloadAction<WithUserPopup | null>) {
			state.withUserPopup = payload;
		},
	},
});

export const { setWithUserPopup } = ui.actions;

const uiReducer = ui.reducer;
export default uiReducer;

const getState = (store: Store) => store.ui;
export const getWithUserPopup = createSelector(
	getState,
	({ withUserPopup }) => withUserPopup
);

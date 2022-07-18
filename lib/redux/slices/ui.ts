import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../store';

interface WithUserPopup {
	message: string;
}
interface State {
	withUserPopup: WithUserPopup | null;
	theme: string;
}

const initialState: State = {
	withUserPopup: null,
	theme: 'lightmode',
};

const ui = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setWithUserPopup(state, { payload }: PayloadAction<WithUserPopup | null>) {
			state.withUserPopup = payload;
		},
		setTheme(state, { payload }: PayloadAction<string>) {
			state.theme = payload;
		},
	},
});

export const { setWithUserPopup, setTheme } = ui.actions;

const uiReducer = ui.reducer;
export default uiReducer;

const getState = (store: Store) => store.ui;
export const getWithUserPopup = createSelector(
	getState,
	({ withUserPopup }) => withUserPopup
);
export const getTheme = createSelector(getState, ({ theme }) => theme);

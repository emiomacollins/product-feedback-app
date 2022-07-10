import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const ui = createSlice({
	name: 'ui',
	initialState,
	reducers: {},
});

// export const {} = ui.actions;

const uiReducer = ui.reducer;
export default uiReducer;

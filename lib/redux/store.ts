import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './slices/feedback';
import uiReducer from './slices/ui';

export const store = configureStore({
	reducer: {
		feedback: feedbackReducer,
		ui: uiReducer,
	},
});

export type Store = ReturnType<typeof store.getState>;

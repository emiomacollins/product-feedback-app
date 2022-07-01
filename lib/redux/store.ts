import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './slices/feedback';

export const store = configureStore({
	reducer: {
		feedback: feedbackReducer,
	},
});

export type Store = ReturnType<typeof store.getState>;

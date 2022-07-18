import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import feedbackReducer from './slices/feedback';
import uiReducer from './slices/ui';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['ui'],
};

export const store = configureStore({
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({ serializableCheck: false });
	},
	reducer: persistReducer(
		persistConfig,
		combineReducers({
			feedback: feedbackReducer,
			ui: uiReducer,
		})
	),
});

export type Store = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import toolkitSlice from './toolkitSlice';
import { kinopoiskAPI } from './service';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
	toolkit: toolkitSlice,
	[kinopoiskAPI.reducerPath]: kinopoiskAPI.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(kinopoiskAPI.middleware),
});

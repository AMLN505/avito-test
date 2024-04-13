import { createSlice } from '@reduxjs/toolkit';

interface IState {
	pageTotalCount: number;
	searchData: string[];
	isLoading: boolean;
	error: string;
	isAuth: boolean;
}

const initialState: IState = {
	pageTotalCount: 1,
	searchData: [],
	isLoading: false,
	error: '',
	isAuth: false,
};

const toolkitSlice = createSlice({
	name: 'toolkit',
	initialState,
	reducers: {
		updatePageTotalCount(state, action) {
			state.pageTotalCount = action.payload;
		},
		updateSearchData(state, action) {
			state.searchData = action.payload;
		},
		updateIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		updateError(state, action) {
			state.error = action.payload;
		},
		updateisAuth(state, action) {
			state.isAuth = action.payload;
		},
	},
});

export const {
	updatePageTotalCount,
	updateSearchData,
	updateIsLoading,
	updateError,
	updateisAuth,
} = toolkitSlice.actions;

export default toolkitSlice.reducer;

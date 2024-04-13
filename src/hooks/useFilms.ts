import { useEffect } from 'react';
import { kinopoiskAPI } from '../store/service';
import { useAppDispatch } from './useRedux';
import {
	updateError,
	updateIsLoading,
	updatePageTotalCount,
} from '../store/toolkitSlice';
import { useSearchParams } from 'react-router-dom';

export enum ESearchParams {
	page = 'page',
	limit = 'limit',
	year = 'year',
	country = 'country',
	ageRating = 'ageRating',
	searchQuery = 'searchQuery',
}

export function useFilms() {
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();

	const paramsObj = {
		page:
			searchParams.get(ESearchParams.page) !== null
				? searchParams.get(ESearchParams.page)
				: 1,
		limit:
			searchParams.get(ESearchParams.limit) !== null
				? searchParams.get(ESearchParams.limit)
				: '10',
		year: searchParams.get(ESearchParams.year),
		country: searchParams.get(ESearchParams.country),
		ageRating: searchParams.get(ESearchParams.ageRating),
		query: searchParams.get(ESearchParams.searchQuery),
	};

	const { data, error, isFetching } =
		paramsObj.query === null
			? kinopoiskAPI.useGetFilteredFilmsQuery({
					page: paramsObj.page,
					limit: paramsObj.limit,
					year: paramsObj.year,
					country: paramsObj.country,
					ageRating: paramsObj.ageRating,
				})
			: kinopoiskAPI.useGetSearchedFilmsQuery({
					page: paramsObj.page,
					limit: paramsObj.limit,
					query: paramsObj.query,
				});

	useEffect(() => {
		if (data?.pages !== undefined) {
			dispatch(updatePageTotalCount(data.pages));
		}
	}, [data?.pages]);

	useEffect(() => {
		dispatch(updateIsLoading(isFetching));
	}, [isFetching]);

	useEffect(() => {
		if (error !== undefined && 'status' in error) {
			dispatch(updateError(String(error.status)));
		} else {
			dispatch(updateError(''));
		}
	}, [error]);

	return data;
}

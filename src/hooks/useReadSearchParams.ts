import { useSearchParams } from 'react-router-dom';
import { ESearchParams } from './useFilms';

interface ISearcParams {
	[key: string]: any;
}

export function useReadSearchParams() {
	const [searchParams, setSearchParams] = useSearchParams();

	const searchParamsObj: ISearcParams = {
		country: searchParams.get(ESearchParams.country),
		ageRating: searchParams.get(ESearchParams.ageRating),
		year: searchParams.get(ESearchParams.year),
		limit: searchParams.get(ESearchParams.limit),
		searchQuery: searchParams.get(ESearchParams.searchQuery),
		page: searchParams.get(ESearchParams.page),
	};

	for (const key in searchParamsObj) {
		if (searchParamsObj[key] === null) {
			delete searchParamsObj[key];
		}
	}

	return searchParamsObj;
}

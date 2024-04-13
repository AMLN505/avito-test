import React from 'react';
import styles from './countryfilter.module.css';
import { Box, Select, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { ESearchParams } from '../../../../hooks/useFilms';
import { useReadSearchParams } from '../../../../hooks/useReadSearchParams';
import { useAppSelector } from '../../../../hooks/useRedux';
import { kinopoiskAPI } from '../../../../store/service';

export function CountryFilter() {
	const { data, error, isFetching } = kinopoiskAPI.useGetCountriesQuery(null);

	const { isLoading } = useAppSelector((state) => state.toolkit);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentSearchParams = useReadSearchParams();

	const country = searchParams.get(ESearchParams.country);

	return (
		<Box mb={20}>
			<Text mb={10}>Страна производства</Text>
			{error !== undefined && 'status' in error ? (
				<Select placeholder={`Ошибка ${error.status}`} disabled />
			) : (
				<Select
					searchable
					placeholder={
						isFetching
							? 'Список стран загружается...'
							: 'Выберите страну из списка'
					}
					data={data}
					disabled={isFetching || isLoading ? true : false}
					nothingFoundMessage="Такая страна не найдена..."
					value={country}
					onChange={(e) => {
						const searchQuery = ESearchParams.searchQuery;
						if (searchQuery in currentSearchParams) {
							delete currentSearchParams[searchQuery];
						}
						if (e !== null) {
							setSearchParams(
								{
									...currentSearchParams,
									page: '1',
									country: e,
								},
								{ replace: true },
							);
						}
					}}
				/>
			)}
		</Box>
	);
}

import React, { useContext } from 'react';
import styles from './countryselect.module.css';
import { Box, Select, Text } from '@mantine/core';
import { RandomContext } from '../../../context/RandomContext';
import { kinopoiskAPI } from '../../../store/service';
import { useAppSelector } from '../../../hooks/useRedux';

export function CountrySelect() {
	const { data, error, isFetching } = kinopoiskAPI.useGetCountriesQuery(null);
	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Box mb={30}>
			<Text mb={10}>Страна</Text>
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
					disabled={isLoading || isFetching ? true : false}
					nothingFoundMessage="Такая страна не найден..."
					value={searchParams.country}
					onChange={(e) => {
						setSearchParams({ ...searchParams, country: e });
					}}
				/>
			)}
		</Box>
	);
}

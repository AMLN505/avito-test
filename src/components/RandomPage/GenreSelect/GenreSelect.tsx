import React, { useContext } from 'react';
import styles from './genreselect.module.css';
import { Box, Select, Text } from '@mantine/core';
import { RandomContext } from '../../../context/RandomContext';
import { kinopoiskAPI } from '../../../store/service';
import { useAppSelector } from '../../../hooks/useRedux';

export function GenreSelect() {
	const { data, error, isFetching } = kinopoiskAPI.useGetGenresQuery(null);
	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Box mb={20}>
			<Text mb={10}>Жанр</Text>
			{error !== undefined && 'status' in error ? (
				<Select placeholder={`Ошибка ${error.status}`} disabled />
			) : (
				<Select
					searchable
					placeholder={
						isFetching
							? 'Список жанров загружается...'
							: 'Выберите жанр из списка'
					}
					data={data}
					disabled={isLoading || isFetching ? true : false}
					nothingFoundMessage="Такой жанр не найден..."
					value={searchParams.genre}
					onChange={(e) => {
						setSearchParams({ ...searchParams, genre: e });
					}}
				/>
			)}
		</Box>
	);
}

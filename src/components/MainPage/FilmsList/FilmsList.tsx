import React from 'react';
import styles from './filmslist.module.css';
import { FilmsListItem } from './FilmsListItem';
import { Box, Title } from '@mantine/core';
import { PaginationBlock } from '../PaginationBlock';
import { randomId } from '@mantine/hooks';
import { useFilms } from '../../../hooks/useFilms';
import { useAppSelector } from '../../../hooks/useRedux';
import { DataError } from '../../DataError';
import { DataLoader } from '../../DataLoader';

export function FilmsList() {
	const data = useFilms();
	const { isLoading, error, pageTotalCount } = useAppSelector(
		(state) => state.toolkit,
	);

	if (isLoading) {
		return <DataLoader />;
	} else if (error) {
		return <DataError status={error} />;
	} else {
		if (data?.docs.length === 0) {
			return (
				<Title ta={'center'} order={2}>
					Фильмов с такими параметрами нет
				</Title>
			);
		} else
			return (
				<Box>
					{data?.docs.map((film) => (
						<FilmsListItem
							key={randomId()}
							name={film.name}
							id={film.id}
							countries={film.countries}
							ageRating={film.ageRating}
							year={film.year}
						/>
					))}
					{pageTotalCount > 1 && <PaginationBlock />}
				</Box>
			);
	}
}

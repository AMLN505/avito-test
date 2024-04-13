import React from 'react';
import styles from './filmpage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box } from '@mantine/core';
import { MainInfo } from './MainInfo';
import { PersonList } from './PersonList';
import { ImagesCarousel } from './ImagesCarousel';
import { SimilarFilms } from './SimilarFilms';
import { Reviews } from './Reviews';
import { SerialInfo } from './SerialInfo';
import { kinopoiskAPI } from '../../store/service';
import { DataError } from '../DataError';
import { DataLoader } from '../DataLoader';

export function FilmPage() {
	const params = useParams();
	const navigate = useNavigate();
	const { data, error, isFetching } = kinopoiskAPI.useGetFilmInfoQuery(
		params.id,
	);

	if (isFetching) {
		return <DataLoader />;
	} else if (error !== undefined && 'status' in error) {
		return <DataError status={String(error.status)} />;
	} else
		return (
			<Box>
				<Button mb={40} color="#EB4E00" onClick={() => navigate(-1)}>
					Назад
				</Button>
				{params.id !== undefined && <ImagesCarousel id={params.id} />}
				{data !== undefined && (
					<Box>
						<MainInfo
							name={data.name}
							countries={data.countries}
							year={data.year}
							kp={data.rating.kp}
							imdb={data.rating.imdb}
							ageRating={data.ageRating}
							description={data.description}
						/>
						<PersonList persons={data.persons} />
						{params.id !== undefined && data.isSeries && (
							<SerialInfo id={params.id} />
						)}
						<SimilarFilms films={data.similarMovies} />
						{params.id !== undefined && <Reviews id={params.id} />}
					</Box>
				)}
			</Box>
		);
}

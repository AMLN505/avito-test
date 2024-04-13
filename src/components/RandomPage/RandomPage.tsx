import React from 'react';
import styles from './randompage.module.css';
import { Button, Title } from '@mantine/core';
import { GenreSelect } from './GenreSelect';
import { RandomContextProvider } from '../../context/RandomContext';
import { CountrySelect } from './CountrySelect';
import { IsSeriesSelect } from './IsSeriesSelect';
import { YearSelect } from './YearSelect';
import { RatingSelect } from './RatingSelect';
import { StudioInput } from './StudioInput';
import { GetRandomButton } from './GetRandomButton';
import { useNavigate } from 'react-router-dom';

export function RandomPage() {
	const navigate = useNavigate();

	return (
		<RandomContextProvider>
			<Button mb={40} color="#EB4E00" onClick={() => navigate(-1)}>
				Назад
			</Button>
			<Title order={1} mb={40}>
				Случайный фильм
			</Title>
			<GenreSelect />
			<CountrySelect />
			<IsSeriesSelect />
			<YearSelect />
			<RatingSelect />
			<StudioInput />
			<GetRandomButton />
		</RandomContextProvider>
	);
}

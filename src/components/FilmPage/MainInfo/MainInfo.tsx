import React from 'react';
import styles from './maininfo.module.css';
import { Title, Text, Box } from '@mantine/core';

interface IMainInfo {
	name: string;
	countries: string[];
	year: number;
	kp: number;
	imdb: number;
	ageRating: number;
	description: string;
}

export function MainInfo({
	name,
	countries,
	year,
	kp,
	imdb,
	ageRating,
	description,
}: IMainInfo) {
	const concatedCountries = countries.join(', ');

	return (
		<Box mb={40}>
			<Title order={1} mb={40}>
				{name}
			</Title>
			<Box mb={40}>
				<Title order={2}>Основная информация</Title>
				<Text>Страны: {concatedCountries}</Text>
				<Text>Год: {year}</Text>
				<Text>КП: {kp}</Text>
				<Text>IMDB: {imdb}</Text>
				<Text>Возрастной рейтинг: {ageRating}</Text>
			</Box>

			{description ? (
				<Box mb={40}>
					<Title order={2}>Описание:</Title>
					<Text>{description}</Text>
				</Box>
			) : (
				<Title mb={15} order={2} c={'#EB4E00'}>
					Нет описания
				</Title>
			)}
		</Box>
	);
}

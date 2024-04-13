import React from 'react';
import styles from './filmslistitem.module.css';
import { Card, Title, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { checkData } from '../../../../utils/checkData';

interface ICountry {
	name: string;
}

export interface IFilmsListItem {
	name: string;
	id: number;
	countries: Array<ICountry>;
	ageRating: number;
	year: number;
}

export function FilmsListItem({
	name,
	id,
	countries,
	ageRating,
	year,
}: IFilmsListItem) {
	const concatedCountries = countries.map((a) => a.name).join(', ');
	const navigate = useNavigate();

	return (
		<Card
			c={'white'}
			bg={'#141414'}
			padding="lg"
			shadow="sm"
			radius="md"
			mb={30}
			withBorder
		>
			<Title order={3}>{name}</Title>
			<Text>Страны: {checkData(concatedCountries)}</Text>
			<Text>Год: {year}</Text>
			<Text mb={15}>Возрастной рейтинг: {ageRating}</Text>
			<Button bg={'#EB4E00'} maw={200} onClick={() => navigate(`/films/${id}`)}>
				Подробнее
			</Button>
		</Card>
	);
}

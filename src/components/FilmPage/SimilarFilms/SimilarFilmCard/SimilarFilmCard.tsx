import React from 'react';
import styles from './similarfilmcard.module.css';
import { Button, Card, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface ISimilarFilmCard {
	name: string;
	id: number;
}

export function SimilarFilmCard({ name, id }: ISimilarFilmCard) {
	const router = useNavigate();

	return (
		<Card
			c={'white'}
			bg={'#141414'}
			padding="lg"
			shadow="sm"
			radius="md"
			mb={30}
			h={'100%'}
			withBorder
		>
			<Title order={3} mb={'auto'}>
				{name}
			</Title>
			<Button bg={'#EB4E00'} maw={200} onClick={() => router(`/films/${id}`)}>
				Подробнее
			</Button>
		</Card>
	);
}

import React from 'react';
import styles from './similarfilms.module.css';
import { Box, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { SimilarFilmCard } from './SimilarFilmCard';

interface ISimilarFilms {
	films: { name: string; id: number }[];
}

export function SimilarFilms({ films }: ISimilarFilms) {
	return films.length !== 0 ? (
		<Box mb={40}>
			<Title order={2} mb={15}>
				Похожие фильмы
			</Title>
			<Carousel
				mb={20}
				height={300}
				slideSize={{ base: '100%', sm: '50%', md: '33.3333%' }}
				slideGap={{ base: 0, sm: 'md' }}
				loop
				align="start"
			>
				{films.map((item) => (
					<Carousel.Slide key={item.id}>
						<SimilarFilmCard name={item.name} id={item.id} />
					</Carousel.Slide>
				))}
			</Carousel>
		</Box>
	) : (
		<Title c={'#EB4E00'} order={2} mb={40}>
			Нет информации о похожих фильмах
		</Title>
	);
}

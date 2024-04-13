import React from 'react';
import styles from './imagescarousel.module.css';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Image, Title } from '@mantine/core';
import { kinopoiskAPI } from '../../../store/service';
import { DataError } from '../../DataError';
import { DataLoader } from '../../DataLoader';

interface IImagesCarousel {
	id: string;
}

export function ImagesCarousel({ id }: IImagesCarousel) {
	const { data, error, isFetching } = kinopoiskAPI.useGetImagesQuery(id);

	if (isFetching) {
		return <DataLoader />;
	} else if (error !== undefined && 'status' in error) {
		return <DataError status={String(error.status)} />;
	} else
		return data?.length !== 0 ? (
			<Carousel
				mb={40}
				height={400}
				slideSize={{ base: '100%', sm: '50%', md: '33.3333%' }}
				slideGap={{ base: 0, sm: 'md' }}
				loop
				align="start"
			>
				{data?.map((image) => (
					<Carousel.Slide key={image.id}>
						<Image h={400} fit="contain" src={image.url} />
					</Carousel.Slide>
				))}
			</Carousel>
		) : (
			<Title mb={40} c={'#EB4E00'} order={2}>
				Нет информации об изображениях
			</Title>
		);
}

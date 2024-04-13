import React, { useState } from 'react';
import styles from './reviews.module.css';
import { Box, Title, Pagination } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { ReviewCard } from './ReviewCard';
import { kinopoiskAPI } from '../../../store/service';
import { DataError } from '../../DataError';
import { DataLoader } from '../../DataLoader';

interface IReviews {
	id: string;
}

export function Reviews({ id }: IReviews) {
	const [activePage, setPage] = useState(1);

	const { data, error, isFetching } = kinopoiskAPI.useGetReviewsQuery({
		page: activePage,
		id: id,
	});

	if (isFetching) {
		return <DataLoader />;
	} else if (error !== undefined && 'status' in error) {
		return <DataError status={String(error.status)} />;
	} else
		return data?.reviews.length !== 0 ? (
			<Box>
				<Title order={2} mb={20}>
					Отзывы
				</Title>
				{data?.reviews.map((item) => (
					<ReviewCard
						key={randomId()}
						author={item.author}
						review={item.review}
					/>
				))}
				{data?.pages > 1 && (
					<Pagination
						color="#EB4E00"
						mt={15}
						total={data?.pages}
						value={activePage}
						onChange={setPage}
					></Pagination>
				)}
			</Box>
		) : (
			<Title mb={40} order={2} c={'#EB4E00'}>
				Нет информации об отзывах
			</Title>
		);
}

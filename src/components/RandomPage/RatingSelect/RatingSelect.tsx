import React, { useContext } from 'react';
import styles from './ratingselect.module.css';
import { Box, RangeSlider, Text } from '@mantine/core';
import { RandomContext } from '../../../context/RandomContext';
import { getRangeValue } from '../../../utils/getRangeValue';
import { useAppSelector } from '../../../hooks/useRedux';

export function RatingSelect() {
	const marks = [
		{ value: 0, label: '0' },
		{ value: 10, label: '10' },
	];

	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Box mb={40}>
			<Text mb={10}>Рейтинг Кинопоиска</Text>
			<RangeSlider
				minRange={0}
				min={0}
				max={10}
				marks={marks}
				color="#EB4E00"
				value={getRangeValue(searchParams.kpRating, [0, 10])}
				disabled={isLoading ? true : false}
				onChangeEnd={(e) => {
					setSearchParams({
						...searchParams,
						kpRating: e[0] !== e[1] ? `${e[0]}-${e[1]}` : `${e[0]}`,
					});
				}}
			/>
		</Box>
	);
}

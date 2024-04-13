import React from 'react';
import styles from './agefilter.module.css';
import { Box, RangeSlider, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { ESearchParams } from '../../../../hooks/useFilms';
import { useReadSearchParams } from '../../../../hooks/useReadSearchParams';
import { useAppSelector } from '../../../../hooks/useRedux';
import { getRangeValue } from '../../../../utils/getRangeValue';

export function AgeFilter() {
	const marks = [
		{ value: 0, label: '0' },
		{ value: 18, label: '18' },
	];

	const { isLoading } = useAppSelector((state) => state.toolkit);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentSearchParams = useReadSearchParams();
	const ageRating = searchParams.get(ESearchParams.ageRating);

	return (
		<Box mb={30}>
			<Text mb={10}>Возрастной рейтинг</Text>
			<RangeSlider
				minRange={0}
				min={0}
				max={18}
				marks={marks}
				color="#EB4E00"
				disabled={isLoading ? true : false}
				value={getRangeValue(ageRating, [0, 18])}
				onChangeEnd={(e) => {
					const searchQuery = ESearchParams.searchQuery;
					if (searchQuery in currentSearchParams) {
						delete currentSearchParams[searchQuery];
					}
					setSearchParams(
						{
							...currentSearchParams,
							page: '1',
							ageRating: e[0] !== e[1] ? `${e[0]}-${e[1]}` : `${e[0]}`,
						},
						{ replace: true },
					);
				}}
			/>
		</Box>
	);
}

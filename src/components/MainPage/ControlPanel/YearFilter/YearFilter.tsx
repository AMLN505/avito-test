import React from 'react';
import styles from './yearfilter.module.css';
import { Box, RangeSlider, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { ESearchParams } from '../../../../hooks/useFilms';
import { useReadSearchParams } from '../../../../hooks/useReadSearchParams';
import { useAppSelector } from '../../../../hooks/useRedux';
import { getRangeValue } from '../../../../utils/getRangeValue';

export function YearFilter() {
	const marks = [
		{ value: 1874, label: '1874' },
		{ value: 2050, label: '2050' },
	];

	const { isLoading } = useAppSelector((state) => state.toolkit);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentSearchParams = useReadSearchParams();
	const year = searchParams.get(ESearchParams.year);

	return (
		<Box mb={30}>
			<Text mb={10}>Год производства</Text>
			<RangeSlider
				minRange={0}
				min={1874}
				max={2050}
				marks={marks}
				color="#EB4E00"
				value={getRangeValue(year, [1874, 2050])}
				disabled={isLoading ? true : false}
				onChangeEnd={(e) => {
					const searchQuery = ESearchParams.searchQuery;
					if (searchQuery in currentSearchParams) {
						delete currentSearchParams[searchQuery];
					}
					setSearchParams(
						{
							...currentSearchParams,
							page: '1',
							year: e[0] !== e[1] ? `${e[0]}-${e[1]}` : `${e[0]}`,
						},
						{ replace: true },
					);
				}}
			/>
		</Box>
	);
}

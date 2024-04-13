import React, { useContext } from 'react';
import styles from './yearselect.module.css';
import { Box, RangeSlider, Text } from '@mantine/core';
import { getRangeValue } from '../../../utils/getRangeValue';
import { RandomContext } from '../../../context/RandomContext';
import { useAppSelector } from '../../../hooks/useRedux';

export function YearSelect() {
	const marks = [
		{ value: 1874, label: '1874' },
		{ value: 2050, label: '2050' },
	];

	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Box mb={40}>
			<Text mb={10}>Год производства</Text>
			<RangeSlider
				minRange={0}
				min={1874}
				max={2050}
				marks={marks}
				color="#EB4E00"
				disabled={isLoading ? true : false}
				value={getRangeValue(searchParams.year, [1874, 2050])}
				onChangeEnd={(e) => {
					setSearchParams({
						...searchParams,
						year: e[0] !== e[1] ? `${e[0]}-${e[1]}` : `${e[0]}`,
					});
				}}
			/>
		</Box>
	);
}

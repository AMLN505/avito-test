import React, { useContext } from 'react';
import styles from './studioinput.module.css';
import { Box, TextInput, Text } from '@mantine/core';
import { RandomContext } from '../../../context/RandomContext';
import { useAppSelector } from '../../../hooks/useRedux';

export function StudioInput() {
	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Box mb={30}>
			<Text mb={10}>Сеть производства</Text>
			<TextInput
				placeholder="Введите названии сети производства"
				disabled={isLoading ? true : false}
				onChange={(e) =>
					setSearchParams({ ...searchParams, studio: e.currentTarget.value })
				}
			/>
		</Box>
	);
}

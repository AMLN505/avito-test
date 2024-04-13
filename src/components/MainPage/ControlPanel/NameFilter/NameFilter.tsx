import React, { useEffect, useState } from 'react';
import styles from './namefilter.module.css';
import { Autocomplete, Box, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { ESearchParams } from '../../../../hooks/useFilms';
import { useReadSearchParams } from '../../../../hooks/useReadSearchParams';
import { useAppSelector, useAppDispatch } from '../../../../hooks/useRedux';
import { updateSearchData } from '../../../../store/toolkitSlice';

export function NameFilter() {
	const { isLoading, searchData } = useAppSelector((state) => state.toolkit);
	const dispatch = useAppDispatch();

	const [value, setValue] = useState('');
	const debouncedValue = useDebounce(value, 1000);
	const currentSearchParams = useReadSearchParams();

	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get(ESearchParams.searchQuery);

	useEffect(() => {
		if (debouncedValue) {
			setSearchParams(
				{
					page: '1',
					searchQuery: value,
					limit:
						'limit' in currentSearchParams ? currentSearchParams.limit : '10',
				},
				{ replace: true },
			);

			const newSearchData = [...searchData];
			if (searchData.length + 1 === 20) {
				newSearchData.pop();
			}
			if (!newSearchData.includes(debouncedValue)) {
				newSearchData.unshift(debouncedValue);
				dispatch(updateSearchData(newSearchData));
			}
		}
	}, [debouncedValue]);

	useEffect(() => {
		const onLoadValue = searchQuery;
		if (onLoadValue !== null) {
			setValue(onLoadValue);
		} else {
			setValue('');
		}
	}, [searchQuery]);

	return (
		<Box mb={40}>
			<Text mb={10}>Поиск по названию</Text>
			<Autocomplete
				placeholder="Введите название фильма"
				data={searchData}
				value={value}
				disabled={isLoading ? true : false}
				onChange={(e) => {
					setValue(e);
				}}
			/>
		</Box>
	);
}

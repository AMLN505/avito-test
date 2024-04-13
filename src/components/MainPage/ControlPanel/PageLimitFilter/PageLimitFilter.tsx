import React from 'react';
import styles from './pagelimitfilter.module.css';
import { Box, Select, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useReadSearchParams } from '../../../../hooks/useReadSearchParams';
import { useAppSelector } from '../../../../hooks/useRedux';

export function PageLimitFilter() {
	const { isLoading } = useAppSelector((state) => state.toolkit);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentSearchParams = useReadSearchParams();

	return (
		<Box mb={30}>
			<Text mb={10}>Количество фильмов на странице</Text>
			<Select
				data={['10', '20', '30']}
				defaultValue={'10'}
				value={currentSearchParams.limit}
				disabled={isLoading ? true : false}
				onOptionSubmit={(e) => {
					if (e !== null) {
						setSearchParams(
							{
								...currentSearchParams,
								page: '1',
								limit: e,
							},
							{ replace: true },
						);
					}
				}}
			/>
		</Box>
	);
}

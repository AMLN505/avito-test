import React, { useContext } from 'react';
import styles from './isseriesselect.module.css';
import { Switch } from '@mantine/core';
import { RandomContext } from '../../../context/RandomContext';
import { useAppSelector } from '../../../hooks/useRedux';

export function IsSeriesSelect() {
	const { searchParams, setSearchParams } = useContext(RandomContext);
	const isLoading = useAppSelector((state) => state.toolkit.isLoading);

	return (
		<Switch
			mb={20}
			checked={searchParams.isSeries}
			disabled={isLoading ? true : false}
			onChange={(e) =>
				setSearchParams({ ...searchParams, isSeries: e.currentTarget.checked })
			}
			label="Сериал"
			color={'#EB4E00'}
		/>
	);
}

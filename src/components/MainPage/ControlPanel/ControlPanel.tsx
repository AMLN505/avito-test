import React from 'react';
import styles from './controlpanel.module.css';
import { NameFilter } from './NameFilter';
import { CountryFilter } from './CountryFilter';
import { AgeFilter } from './AgeFilter';
import { YearFilter } from './YearFilter';
import { PageLimitFilter } from './PageLimitFilter';
import { Box } from '@mantine/core';

export function ControlPanel() {
	return (
		<Box>
			<NameFilter />
			<CountryFilter />
			<AgeFilter />
			<YearFilter />
			<PageLimitFilter />
		</Box>
	);
}

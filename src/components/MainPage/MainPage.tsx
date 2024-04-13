import React from 'react';
import styles from './mainpage.module.css';
import { FilmsList } from './FilmsList';
import { ControlPanel } from './ControlPanel';
import { Box, Title } from '@mantine/core';

export function MainPage() {
	return (
		<Box>
			<Title order={1} mb={30}>
				Список фильмов
			</Title>
			<ControlPanel />
			<FilmsList />
		</Box>
	);
}

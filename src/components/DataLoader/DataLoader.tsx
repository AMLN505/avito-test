import React from 'react';
import styles from './dataloader.module.css';
import { Box, Loader } from '@mantine/core';

export function DataLoader() {
	return (
		<Box className={styles.loaderContainer}>
			<Loader color="#EB4E00" size={100} />
		</Box>
	);
}

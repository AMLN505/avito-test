import React from 'react';
import styles from './dataerror.module.css';
import { Title } from '@mantine/core';

interface IDataError {
	status: string;
}

export function DataError({ status }: IDataError) {
	return (
		<Title ta={'center'} order={2}>
			Ошибка - {status}
		</Title>
	);
}

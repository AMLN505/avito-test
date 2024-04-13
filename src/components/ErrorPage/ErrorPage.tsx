import React from 'react';
import styles from './errorpage.module.css';
import { DataError } from '../DataError';

export function ErrorPage() {
	return (
		<DataError status="Такой страницы не существует или у вас нет прав для ее просмотра" />
	);
}

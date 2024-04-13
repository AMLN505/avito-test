import React, { useContext, useEffect } from 'react';
import styles from './getrandombutton.css';
import { Button, Box, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { RandomContext } from '../../../context/RandomContext';
import { kinopoiskAPI } from '../../../store/service';
import { DataError } from '../../DataError';
import { DataLoader } from '../../DataLoader';
import { useAppSelector } from '../../../hooks/useRedux';
import { useDispatch } from 'react-redux';
import { updateIsLoading } from '../../../store/toolkitSlice';

export function GetRandomButton() {
	const { searchParams } = useContext(RandomContext);
	const [trigger, result] = kinopoiskAPI.useLazyGetRandomFilmQuery();
	const { data, isFetching, error } = result;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (data !== undefined && data !== null) {
			navigate(`/films/${data}`);
		}
	}, [data]);

	useEffect(() => {
		dispatch(updateIsLoading(isFetching));
	}, [isFetching]);

	if (isFetching) {
		return <DataLoader />;
	} else if (error !== undefined && 'status' in error) {
		return <DataError status={String(error.status)} />;
	} else
		return data !== null ? (
			<Button
				onClick={() => {
					trigger(searchParams);
				}}
				color={'#EB4E00'}
			>
				Получить
			</Button>
		) : (
			<Box>
				<Button
					mb={30}
					onClick={() => {
						trigger(searchParams);
					}}
					color={'#EB4E00'}
				>
					Получить
				</Button>
				<Title mb={40} order={2} c={'#EB4E00'}>
					Такого фильма нет, попробуйте изменить параметры
				</Title>
			</Box>
		);
}

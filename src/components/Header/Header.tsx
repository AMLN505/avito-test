import React from 'react';
import styles from './header.module.css';
import { Box, Button, Divider, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { updateisAuth } from '../../store/toolkitSlice';

export function Header() {
	const isAuth = useAppSelector((state) => state.toolkit.isAuth);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<Box mb={40}>
			<Group justify="end" mb={20}>
				{isAuth && (
					<Button w={200} color={'#141414'} onClick={() => navigate('/random')}>
						Случайный фильм
					</Button>
				)}
				{isAuth ? (
					<Button
						w={100}
						color={'#141414'}
						onClick={() => dispatch(updateisAuth(false))}
					>
						Выйти
					</Button>
				) : (
					<Button w={200} color={'#141414'} onClick={() => navigate('/login')}>
						Авторизация
					</Button>
				)}
			</Group>
			<Divider color={'#141414'} />
		</Box>
	);
}

import React from 'react';
import styles from './loginpage.module.css';
import { Box, Button, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';

export function LoginPage() {
	const navigate = useNavigate();

	return (
		<Box>
			<Button mb={60} color="#EB4E00" onClick={() => navigate(-1)}>
				Назад
			</Button>
			<Box className={styles.loginContiner}>
				<Box w={300}>
					<Title order={1} mb={30}>
						Авторизация
					</Title>
					<LoginForm />
				</Box>
			</Box>
		</Box>
	);
}

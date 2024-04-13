import React from 'react';
import styles from './loginform.module.css';
import { TextInput, Button } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useRedux';
import { updateisAuth } from '../../../store/toolkitSlice';

type Inputs = {
	login: string;
	password: string;
};

export function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = () => {
		dispatch(updateisAuth(true));
		navigate('/films');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextInput
				mb={20}
				type="text"
				error={errors.login ? true : false}
				placeholder="Введите логин..."
				{...register('login', {
					required: true,
					pattern: /^dev$/,
				})}
			/>
			<TextInput
				mb={20}
				type="password"
				error={errors.password ? true : false}
				placeholder="Введите пароль..."
				{...register('password', {
					required: true,
					pattern: /^dev$/,
				})}
			/>
			<Button color="#EB4E00" type="submit">
				Войти
			</Button>
		</form>
	);
}

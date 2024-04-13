import React from 'react';
import styles from './approuter.module.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage';
import { useAppSelector } from '../../hooks/useRedux';
import { FilmPage } from '../FilmPage';
import { Header } from '../Header';
import { LoginPage } from '../LoginPage';
import { MainPage } from '../MainPage';
import { RandomPage } from '../RandomPage';

export function AppRouter() {
	const isAuth = useAppSelector((state) => state.toolkit.isAuth);

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="films" replace />} />
				<Route path="/films/:id" element={<FilmPage />} />
				<Route path="/films" element={<MainPage />} />

				<Route path="*" element={<ErrorPage />} />
				{isAuth ? (
					<Route path="/random" element={<RandomPage />} />
				) : (
					<Route path="/login" element={<LoginPage />} />
				)}
			</Routes>
		</BrowserRouter>
	);
}

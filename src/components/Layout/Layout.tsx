import React from 'react';
import styles from './layout.module.css';
import { Container } from '@mantine/core';

interface ILayoutProps {
	children?: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
	return (
		<Container fluid p={40} miw={320}>
			{children}
		</Container>
	);
}

import React, { useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './main.global.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './components/AppRouter';
import { Layout } from './components/Layout';

function App() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<MantineProvider>
			{mounted && (
				<Layout>
					<Provider store={store}>
						<AppRouter />
					</Provider>
				</Layout>
			)}
		</MantineProvider>
	);
}

export default App;

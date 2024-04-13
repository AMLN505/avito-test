import React, { useState } from 'react';
import styles from './personlist.module.css';
import { Box, Title, List, Pagination } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { chunk } from '../../../utils/chunk';

interface IPersonList {
	persons: { name: string; id: number }[];
}

export function PersonList({ persons }: IPersonList) {
	const [activePage, setPage] = useState(1);

	const data = chunk(persons, 10);

	return persons.length !== 0 ? (
		<Box mb={40}>
			<Title order={2} mb={10}>
				Список актеров:
			</Title>
			<List>
				{data[activePage - 1].map((person) => (
					<List.Item key={randomId()}>{person.name} </List.Item>
				))}
			</List>
			{persons?.length > 10 && (
				<Pagination
					color="#EB4E00"
					mt={15}
					total={data.length}
					value={activePage}
					onChange={setPage}
				></Pagination>
			)}
		</Box>
	) : (
		<Title mb={40} order={2} c={'#EB4E00'}>
			Нет информации об актерах
		</Title>
	);
}

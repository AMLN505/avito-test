import React, { useState } from 'react';
import styles from './serialinfo.module.css';
import { Accordion, Pagination, Box, Title } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { SeasonInfo } from './SeasonInfo';
import { kinopoiskAPI } from '../../../store/service';
import { DataError } from '../../DataError';
import { DataLoader } from '../../DataLoader';

interface ISerialInfo {
	id: string;
}

export function SerialInfo({ id }: ISerialInfo) {
	const [activePage, setPage] = useState(1);

	const { data, error, isFetching } = kinopoiskAPI.useGetSerialInfoQuery({
		page: activePage,
		id: id,
	});

	console.log(data);

	if (isFetching) {
		return <DataLoader />;
	} else if (error !== undefined && 'status' in error) {
		return <DataError status={String(error.status)} />;
	} else
		return data?.seasons.length !== 0 ? (
			<Box mb={40}>
				<Title order={2} mb={20}>
					Сезоны и серии
				</Title>
				<Accordion variant="contained">
					{data?.seasons.map((s) => (
						<SeasonInfo key={randomId()} name={s.name} episodes={s.episodes} />
					))}
				</Accordion>
				{data?.pages > 1 && (
					<Pagination
						color="#EB4E00"
						mt={15}
						total={data?.pages}
						value={activePage}
						onChange={setPage}
					></Pagination>
				)}
			</Box>
		) : (
			<Title mb={40} order={2} c={'#EB4E00'}>
				Нет информации о сезонах и сериях
			</Title>
		);
}

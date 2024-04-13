import React from 'react';
import styles from './paginationblock.module.css';
import { Group, Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { ESearchParams } from '../../../hooks/useFilms';
import { useReadSearchParams } from '../../../hooks/useReadSearchParams';
import { useAppSelector } from '../../../hooks/useRedux';

export function PaginationBlock() {
	const { isLoading, pageTotalCount } = useAppSelector(
		(state) => state.toolkit,
	);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentSearchParams = useReadSearchParams();
	const page = searchParams.get(ESearchParams.page);

	return (
		<Pagination.Root
			color="#EB4E00"
			total={pageTotalCount}
			disabled={isLoading ? true : false}
			value={page !== null ? Number(page) : 1}
			onChange={(e) => {
				setSearchParams(
					{ ...currentSearchParams, page: String(e) },
					{ replace: true },
				);
			}}
		>
			<Group gap={5} justify="center">
				<Pagination.First />
				<Pagination.Items />
				<Pagination.Last />
			</Group>
		</Pagination.Root>
	);
}

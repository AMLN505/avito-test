import React from 'react';
import styles from './reviewcard.module.css';
import { Card, Title, Text } from '@mantine/core';
import { randomId } from '@mantine/hooks';

interface IReviewCard {
	author: string;
	review: string;
}

export function ReviewCard({ author, review }: IReviewCard) {
	return (
		<Card
			key={randomId()}
			bg={'#F2F2F2'}
			padding="lg"
			shadow="sm"
			radius="md"
			mb={20}
			withBorder
		>
			<Title order={3} mb={10}>
				{author}
			</Title>
			<Text>{review}</Text>
		</Card>
	);
}

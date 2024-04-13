import React from 'react';
import styles from './seasoninfo.css';
import { Accordion, List } from '@mantine/core';
import { randomId } from '@mantine/hooks';

interface ISeasonInfo {
	name: string;
	episodes: { number: number; name: string }[];
}

export function SeasonInfo({ name, episodes }: ISeasonInfo) {
	return (
		<Accordion.Item value={name}>
			<Accordion.Control>{name}</Accordion.Control>
			<Accordion.Panel>
				<List>
					{episodes.map((e) => (
						<List.Item key={randomId()}>{`${e.number}. ${e.name}`}</List.Item>
					))}
				</List>
			</Accordion.Panel>
		</Accordion.Item>
	);
}

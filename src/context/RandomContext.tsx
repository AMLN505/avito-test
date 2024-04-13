import React, { useState } from 'react';

interface ISearchParams {
	genre: string | null;
	year: string | null;
	isSeries: boolean;
	kpRating: string | null;
	studio: string | null;
	country: string | null;
}

export const RandomContext = React.createContext<{
	searchParams: ISearchParams;
	setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>;
}>({
	searchParams: {
		genre: null,
		year: null,
		isSeries: false,
		kpRating: null,
		studio: null,
		country: null,
	},
	setSearchParams: () => [],
});

export function RandomContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [searchParams, setSearchParams] = useState<ISearchParams>({
		genre: null,
		year: null,
		isSeries: false,
		kpRating: null,
		studio: null,
		country: null,
	});

	return (
		<RandomContext.Provider value={{ searchParams, setSearchParams }}>
			{children}
		</RandomContext.Provider>
	);
}

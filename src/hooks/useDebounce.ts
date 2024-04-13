import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return debouncedValue;
}

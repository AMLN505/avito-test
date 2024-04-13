export function getRangeValue(
	value: undefined | null | string,
	defaultValue: [number, number],
): [number, number] {
	if (value === undefined || value === null) {
		return defaultValue;
	}

	if (!value.includes('-')) {
		return [Number(value), Number(value)];
	} else {
		const res = value.split('-').map((x) => Number(x));
		return [res[0], res[1]];
	}
}

export function checkData(data: any) {
	if (data !== undefined && data !== null) {
		return data;
	} else {
		return 'нет данных';
	}
}

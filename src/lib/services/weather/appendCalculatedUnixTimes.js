import dayjs from '$lib/services/dayjsExtended';

export function appendCalculatedUnixTimes(times) {
	times.start.utcTime = dayjs(times.start.localTime).utc(true).subtract(times.offset, 'seconds');
	if (times.end.localTime) {
		times.end.utcTime = dayjs(times.end.localTime).utc(true).subtract(times.offset, 'seconds');
	}
	return times;
}

import { PUBLIC_INCREMENT_DAILY_COUNT } from '$env/static/public';

import { dev } from '$app/environment';
import { dailyCount } from '$lib/store';
import { get } from 'svelte/store';

export function incrementDailyCount() {
	if (!dev || PUBLIC_INCREMENT_DAILY_COUNT) {
		let count = parseInt(get(dailyCount)); // string -> number
		count += 1;
		dailyCount.set(count.toString()); // number -> string
		console.log('$dailyCount: ', get(dailyCount));
	}
}

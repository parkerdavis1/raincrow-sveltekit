import { dev } from '$app/environment';
import { dailyCount } from '$lib/store';
import { get } from 'svelte/store';

export function incrementDailyCount() {
	if (!dev) {
		let count = parseInt(get(dailyCount));
		count += 1;
		dailyCount.set(count.toString());
		console.log('$dailyCount: ', get(dailyCount));
	}
}

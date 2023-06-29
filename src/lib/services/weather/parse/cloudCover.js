import { dataRange } from '$lib/services/helpers';

export function parseCloudCover(weatherResults) {
	let cloudCover = {
		start: weatherResults.start.data[0].clouds,
		end: weatherResults.end?.data[0].clouds
	};

	return dataRange(cloudCover.start, cloudCover.end);
}

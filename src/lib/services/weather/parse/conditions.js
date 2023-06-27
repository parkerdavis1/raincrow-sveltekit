import { capitalizeFirst } from '$lib/services/helpers';

export function parseConditions(weatherResults) {
	let parsedConditions = '';
	let uniqueConditions = [];
	// check for multiple conditions, if they are unique add them
	for (let obj of weatherResults.start.data[0].weather) {
		uniqueConditions.push(obj.description);
	}

	if (weatherResults.end) {
		for (let obj of weatherResults.end.data[0].weather) {
			if (!uniqueConditions.includes(obj.description)) {
				uniqueConditions.push(obj.description);
			}
		}
	}

	// format conditions based on number of different conditions
	if (uniqueConditions.length > 2) {
		parsedConditions = capitalizeFirst(uniqueConditions.join(', '));
	} else if (uniqueConditions.length === 2) {
		parsedConditions = capitalizeFirst(uniqueConditions.join(' - '));
	} else {
		parsedConditions = capitalizeFirst(uniqueConditions.join());
	}

	return parsedConditions;
}

export const validateLatlon = (latlon) => {
	const latlonRegex = /\s*-?\d+\.\d+,\s*-?\d+\.\d+\s*/;
	return latlon.match(latlonRegex) ? true : false;
};

export const validateDate = (date) => {
	const dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
	return date.match(dateRegex) ? true : false;
};

export const validateStartTime = (startTime) => {
	const startTimeRegex = /\d{1,2}:\d{2}$/;
	return startTime.match(startTimeRegex) ? true : false;
};

export const validateDuration = (duration) => {
	const durationValid = typeof duration === 'number' && duration >= 0;
	return durationValid ? true : false;
};

export const validateChecklistId = (checklistId) => {
	let checklistRegex = /S\d{7}\d*/;
	return checklistId.match(checklistRegex) ? true : false;
};

import { parseLatlon } from './parseLatlon';

export const validateLatlon = (latlon) => {
	const latlonRegex = /\s*-?\d+\.\d+,\s*-?\d+\.\d+\s*/;
	const textFormatCheck = latlon.match(latlonRegex) ? true : false;
	const { lat, lon } = parseLatlon(latlon);
	const latNum = parseInt(lat);
	const lonNum = parseInt(lon);
	const latNumCheck = latNum >= -90 && latNum <= 90;
	const lonNumCheck = lonNum >= -180 && lonNum <= 180;

	return textFormatCheck && latNumCheck && lonNumCheck;
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

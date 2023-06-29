// latlon Parser
export const parseLatlon = (latlon) => {
	const parenRemoveRegex = /(\(|\))/g;
	const latlonNoParen = latlon.replace(parenRemoveRegex, ''); // remove parenthesis
	let commaIndex = latlonNoParen.indexOf(',');
	return {
		lat: latlonNoParen.slice(0, commaIndex).trim(),
		lon: latlonNoParen.slice(commaIndex + 1).trim()
	};
};

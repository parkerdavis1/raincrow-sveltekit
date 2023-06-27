export const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const dataRange = (dataStart, dataEnd) => {
	const arr = [dataStart, dataEnd];
	// if there is both a start and end
	if (dataStart && dataEnd) {
		// and if they are not the same value
		if (dataStart !== dataEnd) {
			if (typeof dataStart === 'number') {
				arr.sort((a, b) => {
					return a - b;
				});
			}
			return `${arr[0]} - ${arr[1]}`; // return the values as a range
		} else return dataStart; // otherwise, return the first value
	} else if (dataStart || dataStart === 0) {
		// if no end data, and there is a start, even if it is zero, return start
		return dataStart;
	} else throw Error('No Data Passed into Data Range'); // else throw error
};

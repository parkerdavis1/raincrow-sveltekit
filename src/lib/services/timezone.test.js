import { test, expect } from 'vitest';
import { find } from 'geo-tz';

test('Timezone is able to be found with some edge case GPS coordinates', () => {
	// threw error in RainCrow with geo-tz 8.0.1
	expect(find(41.796014, -87.576506)).toStrictEqual(['America/Chicago']);
	// threw error in RainCrow with geo-tz 8.0.1
	expect(find(24.597694, -81.583389)).toStrictEqual(['America/New_York']);
	// threw error in RainCrow with geo-tz 8.0.1
	expect(find(24.566016, -81.673234)).toStrictEqual(['America/New_York']);
	// gave problems on github issue apparently
	expect(find(-24.244125928804735, -53.8226425697034)).toStrictEqual(['America/Sao_Paulo']);
	// gave problems on github issue apparently
	expect(find(34.05861, -118.3928)).toStrictEqual(['America/Los_Angeles']);
	// Edge of Reservation Land in NE AZ (Rez)
	expect(find(35.1578900375291, -111.24227457293293)).toStrictEqual(['America/Denver']);
	// Edge of Reservation Land in NE AZ (Non-rez)
	expect(find(35.15698602683568, -111.24796115826194)).toStrictEqual(['America/Phoenix']);
	// Middle of the Atlantic Ocean
	expect(find(43.298646833300026, -38.425597455498185)).toStrictEqual(['Etc/GMT+3']);
	// CA/AZ border
	expect(find(33.608429524254916, -114.53309086102836)).toStrictEqual(['America/Los_Angeles']);

	// Add failing test
	expect(find(33.608429524254916, -114.53309086102836)).toStrictEqual(['America/Phoenix']);
});

import { describe, expect, test } from 'vitest';
import { validateLatlon } from './validation';

describe('Validate Lat Lon', () => {
	test('validates valid lat lon', () => {
		expect(validateLatlon('33.33, -22.22')).toBe(true);
		expect(validateLatlon('33.0, -82.2')).toBe(true);
	});
	test('Rejects invalid latlon', () => {
		expect(validateLatlon('-91.00, 111.11')).toBe(false);
		expect(validateLatlon('91.00, 111.11')).toBe(false);
		expect(validateLatlon('44.4, -181.0')).toBe(false);
		expect(validateLatlon('44.4, 181.0')).toBe(false);
	});
});

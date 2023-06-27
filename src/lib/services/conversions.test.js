import { describe, it, expect } from 'vitest';
import conversions from './conversions';

describe('convertToCelsuis', () => {
	it('converts Farrenheit to Celcius', () => {
		expect(conversions.convertToCelsius(32)).toBe(0);
		expect(conversions.convertToCelsius(50)).toBe(10);
		expect(Math.round(conversions.convertToCelsius(100))).toBe(38);
	});
	it('throws error for non-numbers', () => {
		expect(() => conversions.convertToCelsius('32')).toThrowError();
	});
});

describe('mphToBeaufort', () => {
	it('converts mph to Beaufort', () => {
		expect(conversions.mphToBeaufort(18)).toBe(4);
	});
	it('throws error for non-numbers', () => {
		expect(() => conversions.mphToBeaufort('-1')).toThrowError();
	});
	it('throws error for negative numbers', () => {
		expect(() => conversions.mphToBeaufort(-1)).toThrowError();
	});
});

describe('mphToDescription', () => {
	it('throws error for non-numbers', () => {
		expect(() => conversions.mphToDescription('-1')).toThrowError();
	});
	it('throws error for negative numbers', () => {
		expect(() => conversions.mphToDescription(-1)).toThrowError();
	});
});

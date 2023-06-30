import { describe, it, expect } from 'vitest';
import { capitalizeFirst } from './helpers';

describe('capitalizeFirst', () => {
	it('capitalizes the first letter of a string', () => {
		expect(capitalizeFirst('this is a string')).toBe('This is a string');
	});
	it('throws an error for non-strings', () => {
		expect(() => capitalizeFirst(5)).toThrowError();
		expect(() => capitalizeFirst({ object: 'thing' })).toThrowError();
		expect(() => capitalizeFirst(['array', 'is', 'an', 'array'])).toThrowError();
	});
});

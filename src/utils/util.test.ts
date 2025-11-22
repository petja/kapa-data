import { luhn, padStart } from './util';

describe('luhn', () => {
	it('calculates check digit for valid UIC numbers', () => {
		// Test with known UIC identifiers
		expect(luhn('91103103301')).toBe(0);
		expect(luhn('92103103301')).toBe(9);
	});

	it('handles single digit', () => {
		expect(luhn('0')).toBe(0);
		expect(luhn('1')).toBe(8);
		expect(luhn('5')).toBe(9);
	});

	it('handles two digits', () => {
		expect(luhn('12')).toBe(5);
		expect(luhn('99')).toBe(2);
	});

	it('returns value between 0 and 9', () => {
		for (let i = 0; i < 100; i++) {
			const result = luhn(`${i}` as `${number}`);
			expect(result).toBeGreaterThanOrEqual(0);
			expect(result).toBeLessThanOrEqual(9);
		}
	});

	it('produces consistent results', () => {
		const input = '123456789' as `${number}`;
		expect(luhn(input)).toBe(luhn(input));
	});
});

describe('padStart', () => {
	it('pads numbers with zeros to default length 2', () => {
		expect(padStart(1)).toBe('01');
		expect(padStart(5)).toBe('05');
		expect(padStart(9)).toBe('09');
	});

	it('does not pad if already at length', () => {
		expect(padStart(10)).toBe('10');
		expect(padStart(99)).toBe('99');
	});

	it('does not truncate longer numbers', () => {
		expect(padStart(100)).toBe('100');
		expect(padStart(1234)).toBe('1234');
	});

	it('works with custom length', () => {
		expect(padStart(1, 4)).toBe('0001');
		expect(padStart(42, 5)).toBe('00042');
	});

	it('handles strings', () => {
		expect(padStart('5')).toBe('05');
		expect(padStart('123', 5)).toBe('00123');
	});

	it('handles zero', () => {
		expect(padStart(0)).toBe('00');
		expect(padStart(0, 3)).toBe('000');
	});
});

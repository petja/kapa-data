import { createUicId } from './uic';

describe('createUicId', () => {
	it('creates valid UIC ID structure', () => {
		const uicId = createUicId('91', '10', '3103301', 'FIN-VR');

		expect(uicId).toHaveProperty('raw');
		expect(uicId).toHaveProperty('typeCode');
		expect(uicId).toHaveProperty('countryCode');
		expect(uicId).toHaveProperty('nationalBlock');
		expect(uicId).toHaveProperty('checkDigit');
		expect(uicId).toHaveProperty('vkm');
	});

	it('formats raw string correctly', () => {
		const uicId = createUicId('91', '10', '3103301', 'FIN-VR');

		expect(uicId.raw).toMatch(/^\d{2} \d{2} \d+ \(\d\) .+$/);
		expect(uicId.raw).toBe('91 10 3103301 (0) FIN-VR');
	});

	it('preserves input values', () => {
		const uicId = createUicId('92', '80', '1234567', 'DE-DB');

		expect(uicId.typeCode).toBe('92');
		expect(uicId.countryCode).toBe('80');
		expect(uicId.nationalBlock).toBe('1234567');
		expect(uicId.vkm).toBe('DE-DB');
	});

	it('calculates correct check digit', () => {
		const uicId = createUicId('91', '10', '3103301', 'FIN-VR');
		expect(uicId.checkDigit).toBe(0);
	});

	it('check digit is between 0 and 9', () => {
		const uicId1 = createUicId('91', '10', '3103301', 'FIN-VR');
		const uicId2 = createUicId('92', '80', '1234567', 'DE-DB');
		const uicId3 = createUicId('94', '55', '9999999', 'HU-MAV');

		expect(uicId1.checkDigit).toBeGreaterThanOrEqual(0);
		expect(uicId1.checkDigit).toBeLessThanOrEqual(9);
		expect(uicId2.checkDigit).toBeGreaterThanOrEqual(0);
		expect(uicId2.checkDigit).toBeLessThanOrEqual(9);
		expect(uicId3.checkDigit).toBeGreaterThanOrEqual(0);
		expect(uicId3.checkDigit).toBeLessThanOrEqual(9);
	});

	it('handles different type codes', () => {
		const electric = createUicId('91', '10', '3103301', 'FIN-VR');
		const diesel = createUicId('92', '10', '3103301', 'FIN-VR');
		const emu = createUicId('94', '10', '3103301', 'FIN-VR');

		expect(electric.typeCode).toBe('91');
		expect(diesel.typeCode).toBe('92');
		expect(emu.typeCode).toBe('94');
	});

	it('handles different country codes', () => {
		const finland = createUicId('91', '10', '1234567', 'FIN-VR');
		const germany = createUicId('91', '80', '1234567', 'DE-DB');
		const france = createUicId('91', '87', '1234567', 'F-SNCF');

		expect(finland.countryCode).toBe('10');
		expect(germany.countryCode).toBe('80');
		expect(france.countryCode).toBe('87');
	});

	it('produces consistent results for same input', () => {
		const uicId1 = createUicId('91', '10', '3103301', 'FIN-VR');
		const uicId2 = createUicId('91', '10', '3103301', 'FIN-VR');

		expect(uicId1.raw).toBe(uicId2.raw);
		expect(uicId1.checkDigit).toBe(uicId2.checkDigit);
	});
});

export function luhn(num: `${number}`): number {
	const digits = num.split('').map(Number).reverse();

	const sum = digits.reduce((acc, digit, idx) => {
		if (idx % 2 === 0) {
			const doubled = digit * 2;
			return acc + (doubled > 9 ? doubled - 9 : doubled);
		}
		return acc + digit;
	}, 0);

	return (10 - (sum % 10)) % 10;
}

export function padStart(n: string | number, length = 2) {
	return `${n}`.padStart(length, '0')
}
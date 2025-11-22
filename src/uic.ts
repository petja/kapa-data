import { UicId } from "./types";
import { luhn } from "./utils/util";

export function createUicId(
	typeCode: `${number}`,
	countryCode: `${number}`,
	nationalBlock: string,
	vkm: string
): UicId {
	const beforeCheckDigit =
    `${typeCode}${countryCode}${nationalBlock}` as `${number}`;
	const checkDigit = luhn(beforeCheckDigit);
	const raw = `${typeCode} ${countryCode} ${nationalBlock} (${checkDigit}) ${vkm}`;

	return {
		raw,
		typeCode,
		countryCode,
		nationalBlock,
		checkDigit,
		vkm,
	};
}

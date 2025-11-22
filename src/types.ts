/**
 * https://en.wikipedia.org/wiki/UIC_identification_marking_for_tractive_stock
 */
export type UicId = {
  raw: string;
  typeCode: `${number}`;
  /**
   * https://en.wikipedia.org/wiki/List_of_UIC_country_codes
   */
  countryCode: `${number}`;
  nationalBlock: string;
  checkDigit: number;
  vkm: string;
};

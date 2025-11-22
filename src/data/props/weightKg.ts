import { Prop } from "../../utils/prop";

/**
 * Vehicle weight in kilograms (typically unladen/tare weight).
 * @example 45000 for a typical passenger coach
 */
export const weightKgProp = new Prop<number>("weightKg");

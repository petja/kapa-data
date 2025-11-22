import { Prop } from "../../utils/prop";

/**
 * Maximum speed in kilometers per hour.
 * @example 200 for a high-speed train, 120 for a typical locomotive
 */
export const maxSpeedKphProp = new Prop<number>("maxSpeedKph");

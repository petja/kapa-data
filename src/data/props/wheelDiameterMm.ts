import { Prop } from "../../utils/prop";

/**
 * Wheel diameter in millimeters.
 * @example 920 for a typical passenger coach wheel, 1250 for a locomotive driving wheel
 */
export const wheelDiameterMmProp = new Prop<number>("wheelDiameterMm");

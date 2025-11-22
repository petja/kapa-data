import { Prop } from "../../utils/prop";

/**
 * Type or model of traction motor.
 * @example "DC series", "AC induction", "Permanent magnet synchronous", "TAO659"
 */
export const motorTypeProp = new Prop<string>("motorType");

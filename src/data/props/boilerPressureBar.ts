import { Prop } from "../../utils/prop";

/**
 * Maximum boiler pressure in bar (for steam locomotives).
 * @example 16 for a typical modern steam locomotive
 */
export const boilerPressureBarProp = new Prop<number>("boilerPressureBar");

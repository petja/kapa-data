import { Prop } from "../../utils/prop";

/**
 * Power output in kilowatts (for locomotives and powered vehicles).
 * @example 5600 for a typical modern electric locomotive
 */
export const powerKwProp = new Prop<number>("powerKw");

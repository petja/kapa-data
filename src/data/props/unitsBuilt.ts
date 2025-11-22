import { Prop } from "../../utils/prop";

/**
 * Total number of units manufactured of this type/class.
 * @example 1500 for a widely-produced locomotive class
 */
export const unitsBuiltProp = new Prop<number>("unitsBuilt");

import { Prop } from "../../utils/prop";

/**
 * Total number of passenger doors on the vehicle.
 * @example 4 for a typical commuter coach (2 per side)
 */
export const doorCountProp = new Prop<number>("doorCount");

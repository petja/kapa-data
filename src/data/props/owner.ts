import { Prop } from "../../utils/prop";

/**
 * Legal owner of the vehicle (may differ from operator).
 * @example Company:GATX, Company:Angel Trains, Company:DB
 */
export const ownerProp = new Prop<`Company:${string}`>("owner");

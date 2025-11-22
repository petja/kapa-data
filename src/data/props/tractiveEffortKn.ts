import { Prop } from "../../utils/prop";

/**
 * Maximum tractive effort (pulling force) in kilonewtons.
 * @example 300 for a typical freight locomotive
 */
export const tractiveEffortKnProp = new Prop<number>("tractiveEffortKn");

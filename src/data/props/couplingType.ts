import { Prop } from "../../utils/prop";

/**
 * Type of coupler/coupling device.
 * @example "Scharfenberg", "SA3", "Janney", "Buffers and chain"
 */
export const couplingTypeProp = new Prop<
  "Scharfenberg" | "SA3" | "Janney" | "Buffers and chain" | "AAR" | "C-AKv" | "BSI"
>("couplingType");

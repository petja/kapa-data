import { Prop } from "../../utils/prop";

/**
 * Heritage or preservation status.
 * @example "Listed", "Museum piece", "Operational heritage", "Not preserved"
 */
export const heritageStatusProp = new Prop<
  "Listed" | "Museum piece" | "Operational heritage" | "Not preserved" | "National monument"
>("heritageStatus");

import { Prop } from "../../utils/prop";

/**
 * Current operational status of the vehicle.
 * @example "Active", "Retired", "Preserved", "Under restoration", "Scrapped"
 */
export const serviceStatusProp = new Prop<
  "Active" | "Retired" | "Preserved" | "Under restoration" | "Scrapped" | "Stored"
>("serviceStatus");

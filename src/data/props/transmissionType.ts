import { Prop } from "../../utils/prop";

/**
 * Type of power transmission system.
 * @example "Electric", "Hydraulic", "Mechanical", "Diesel-Electric"
 */
export const transmissionTypeProp = new Prop<
  "Electric" | "Hydraulic" | "Mechanical" | "Diesel-Electric" | "Diesel-Hydraulic" | "Diesel-Mechanical"
>("transmissionType");

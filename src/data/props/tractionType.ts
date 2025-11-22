import { Prop } from "../../utils/prop";

/**
 * Type of traction or power source.
 * @example "Electric", "Diesel", "Steam", "Diesel-Electric", "Battery"
 */
export const tractionTypeProp = new Prop<
  "Electric" | "Diesel" | "Steam" | "Diesel-Electric" | "Battery" | "Hybrid"
>("tractionType");

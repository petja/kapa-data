import { Prop } from "../../utils/prop";

/**
 * Type of braking system used.
 * @example "Air brake", "Regenerative", "Electromagnetic", "Vacuum brake"
 */
export const brakingSystemProp = new Prop<
  "Air brake" | "Regenerative" | "Electromagnetic" | "Vacuum brake" | "Hydraulic" | "Friction"
>("brakingSystem");

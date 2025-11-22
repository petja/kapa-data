import { Prop } from "../../utils/prop";

/**
 * Intended use or service type of the vehicle.
 * @example "Passenger", "Freight", "Mixed traffic", "Shunting", "High-speed"
 */
export const designPurposeProp = new Prop<
  "Passenger" | "Freight" | "Mixed traffic" | "Shunting" | "High-speed" | "Commuter" | "Regional"
>("designPurpose");

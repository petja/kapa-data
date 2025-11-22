import { Prop } from "../../utils/prop";

/**
 * Company that manufactured the vehicle.
 * @example Company:Siemens, Company:Alstom, Company:Bombardier
 */
export const manufacturerProp = new Prop<`Company:${string}`>("manufacturer");

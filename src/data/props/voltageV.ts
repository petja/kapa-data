import { Prop } from "../../utils/prop";

/**
 * Operating voltage in volts.
 * @example 25000 for 25kV AC, 3000 for 3kV DC, 15000 for 15kV AC
 */
export const voltageVProp = new Prop<number>("voltageV");

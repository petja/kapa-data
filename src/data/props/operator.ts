import { Prop } from "../../utils/prop";

/**
 * Railway company or organization operating the vehicle.
 * @example Company:DB (Deutsche Bahn), Company:SNCF
 */
export const operatorProp = new Prop<`Company:${string}`>("operator");

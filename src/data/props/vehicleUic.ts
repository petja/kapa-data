import { Prop } from "../../utils/prop";
import { UicId } from "../../types";

/**
 * 12-digit UIC (International Union of Railways) identification code
 */
export const vehicleUicProp = new Prop<UicId>("vehicleUic");

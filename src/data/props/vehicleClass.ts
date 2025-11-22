import { Prop } from "../../utils/prop";

/**
 * Vehicle class or series designation.
 * @example VehicleClass:BR185, VehicleClass:Class66, VehicleClass:E656
 */
export const vehicleClassProp = new Prop<`VehicleClass:${string}`>(
	"vehicleClass"
);

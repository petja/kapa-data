import { vehicleClassProp } from "../props/vehicleClass";
import { vehicleTypeProp } from "../props/vehicleType";
import { vehicleNumberProp } from "../props/vehicleNumber";
import { manufacturerProp } from "../props/manufacturer";
import { Item, Statement } from "../../utils/prop";
import { vehicleTitleProp } from "../props/vehicleTitle";
import { ussr } from "../manufacturers/ussr";
import { maxSpeedKphProp } from "../props/maxSpeedKph";
import { trackGaugeMmProp } from "../props/trackGaugeMm";
import { tractionTypeProp } from "../props/tractionType";
import { powerKwProp } from "../props/powerKw";
import { manufactureCountryProp } from "../props/manufactureCountry";
import { designPurposeProp } from "../props/designPurpose";
import { transmissionTypeProp } from "../props/transmissionType";

export function createUssrTe3() {
	const vehicles: Item<"Vehicle">[] = [];
	const vehicleClass = new Item("VehicleClass:USSR-TE3");

	new Statement(vehicleClass.id, manufacturerProp, ussr.id);
	new Statement(vehicleClass.id, trackGaugeMmProp, 1520);
	new Statement(vehicleClass.id, tractionTypeProp, "Diesel");
	new Statement(vehicleClass.id, transmissionTypeProp, "Diesel-Electric");
	new Statement(vehicleClass.id, powerKwProp, 2940);
	new Statement(vehicleClass.id, maxSpeedKphProp, 100);
	new Statement(vehicleClass.id, manufactureCountryProp, "SU");
	new Statement(vehicleClass.id, designPurposeProp, "Mixed traffic");

	const ranges = [
		{ start: 1, end: 598 },
		{ start: 1001, end: 1404 },
		{ start: 2001, end: 7805 },
	];

	for (const range of ranges) {
		for (let n = range.start; n <= range.end; n++) {
			const vehicle = new Item(`Vehicle:USSR-TE3-${n}`);

			new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
			new Statement(vehicle.id, vehicleTitleProp, `TE3-${n}`);
			new Statement(vehicle.id, manufacturerProp, ussr.id);
			new Statement(vehicle.id, vehicleTypeProp, "locomotive");
			new Statement(vehicle.id, vehicleNumberProp, n);
			new Statement(vehicle.id, maxSpeedKphProp, 100);

			vehicles.push(vehicle);
		}
	}

	return {
		vehicleClass,
		vehicles,
	};
}

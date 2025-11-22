import { createUicId } from "../../uic";
import { vehicleClassProp } from "../props/vehicleClass";
import { vehicleTypeProp } from "../props/vehicleType";
import { vehicleNumberProp } from "../props/vehicleNumber";
import { vehicleUicProp } from "../props/vehicleUic";
import { siemensMobility } from "../manufacturers/siemens";
import { manufacturerProp } from "../props/manufacturer";
import { Item, Statement } from "../../utils/prop";
import { vehicleTitleProp } from "../props/vehicleTitle";
import { trackGaugeMmProp } from "../props/trackGaugeMm";
import { tractionTypeProp } from "../props/tractionType";
import { voltageVProp } from "../props/voltageV";
import { maxSpeedKphProp } from "../props/maxSpeedKph";
import { powerKwProp } from "../props/powerKw";
import { operatingCountryProp } from "../props/operatingCountry";
import { manufactureCountryProp } from "../props/manufactureCountry";
import { designPurposeProp } from "../props/designPurpose";
import { operatorProp } from "../props/operator";
import { vr } from "../operators/vr";

export function createVrSr3() {
	const vehicles: Item<"Vehicle">[] = [];
	const vehicleClass = new Item("VehicleClass:VR-Sr3");

	new Statement(vehicleClass.id, manufacturerProp, siemensMobility.id);
	new Statement(vehicleClass.id, trackGaugeMmProp, 1524);
	new Statement(vehicleClass.id, tractionTypeProp, "Electric");
	new Statement(vehicleClass.id, voltageVProp, 25000);
	new Statement(vehicleClass.id, maxSpeedKphProp, 210);
	new Statement(vehicleClass.id, powerKwProp, 6400);
	new Statement(vehicleClass.id, operatingCountryProp, "FI");
	new Statement(vehicleClass.id, manufactureCountryProp, "DE");
	new Statement(vehicleClass.id, designPurposeProp, "Mixed traffic");
	new Statement(vehicleClass.id, operatorProp, vr.id);

	for (let n = 3301; n <= 3380; n++) {
		const vehicle = new Item(`Vehicle:VR-Sr3-${n}`);

		new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
		new Statement(vehicle.id, vehicleTitleProp, `Sr3 ${n}`);
		new Statement(vehicle.id, manufacturerProp, siemensMobility.id);
		new Statement(vehicle.id, vehicleTypeProp, "locomotive");
		new Statement(vehicle.id, vehicleNumberProp, n);
		new Statement(
			vehicle.id,
			vehicleUicProp,
			createUicId("91", "10", `310${n}`, "FIN-VR")
		);

		vehicles.push(vehicle);
	}

	return {
		vehicleClass,
		vehicles,
	};
}

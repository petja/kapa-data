import { padStart } from "../../utils/util";
import { createUicId } from "../../uic";
import { Item, Statement } from "../../utils/prop";
import { vehicleClassProp } from "../props/vehicleClass";
import { vehicleUicProp } from "../props/vehicleUic";
import { vehicleTitleProp } from "../props/vehicleTitle";
import { manufacturerProp } from "../props/manufacturer";
import { trackGaugeMmProp } from "../props/trackGaugeMm";
import { tractionTypeProp } from "../props/tractionType";
import { voltageVProp } from "../props/voltageV";
import { maxSpeedKphProp } from "../props/maxSpeedKph";
import { operatingCountryProp } from "../props/operatingCountry";
import { manufactureCountryProp } from "../props/manufactureCountry";
import { designPurposeProp } from "../props/designPurpose";
import { operatorProp } from "../props/operator";
import { vr } from "../operators/vr";
import { caf } from "../manufacturers/caf";
import { alstom } from "../manufacturers/alstom";

export function createVrSm4() {
	const vehicleClass = new Item("VehicleClass:VR-Sm4");

	new Statement(vehicleClass.id, trackGaugeMmProp, 1524);
	new Statement(vehicleClass.id, tractionTypeProp, "Electric");
	new Statement(vehicleClass.id, voltageVProp, 25000);
	new Statement(vehicleClass.id, maxSpeedKphProp, 120);
	new Statement(vehicleClass.id, operatingCountryProp, "FI");
	new Statement(vehicleClass.id, manufactureCountryProp, "FI");
	new Statement(vehicleClass.id, designPurposeProp, "Commuter");
	new Statement(vehicleClass.id, operatorProp, vr.id);

	const vehicles: Item<"Vehicle">[] = [];

	for (let n = 1; n <= 30; n++) {
		const vehicle = new Item(`Vehicle:VR-Sm4-6x${padStart(n, 2)}`);

		new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
		new Statement(vehicle.id, vehicleTitleProp, `Sm4 6x${padStart(n, 2)}`);

		if (n <= 10) {
			new Statement(vehicle.id, manufacturerProp, caf.id);
		} else {
			new Statement(vehicle.id, manufacturerProp, alstom.id);
		}

		new Statement(
			vehicle.id,
			vehicleUicProp,
			createUicId("94", "10", `6004${padStart(n, 2)}`, "FIN-VR")
		);

		vehicles.push(vehicle);
	}

	return {
		vehicles,
		vehicleClass,
	};
}

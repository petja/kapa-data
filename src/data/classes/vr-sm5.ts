import { padStart } from "../../utils/util";
import { createUicId } from "../../uic";
import { Item, Statement } from "../../utils/prop";
import { vehicleNumberProp } from "../props/vehicleNumber";
import { vehicleClassProp } from "../props/vehicleClass";
import { vehicleUicProp } from "../props/vehicleUic";
import { manufactureYearProp } from "../props/manufactureYear";
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
import { stadlerRail } from "../manufacturers/stadlerRail";

export function createVrSm5() {
	const vehicles: Item<"Vehicle">[] = [];
	const vehicleClass = new Item("VehicleClass:VR-Sm5");

	new Statement(vehicleClass.id, manufacturerProp, stadlerRail.id);
	new Statement(vehicleClass.id, trackGaugeMmProp, 1524);
	new Statement(vehicleClass.id, tractionTypeProp, "Electric");
	new Statement(vehicleClass.id, voltageVProp, 25000);
	new Statement(vehicleClass.id, maxSpeedKphProp, 160);
	new Statement(vehicleClass.id, operatingCountryProp, "FI");
	new Statement(vehicleClass.id, manufactureCountryProp, "CH");
	new Statement(vehicleClass.id, designPurposeProp, "Commuter");
	new Statement(vehicleClass.id, operatorProp, vr.id);

	for (let n = 1; n <= 81; n++) {
		const vehicle = new Item(`Vehicle:VR-Sm5-${padStart(n, 2)}`);

		new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
		new Statement(vehicle.id, vehicleNumberProp, n);

		new Statement(
			vehicle.id,
			vehicleUicProp,
			createUicId("94", "10", `20810${padStart(n, 2)}`, "FIN-VR")
		);

		if (n >= 1 && n <= 2) {
			new Statement(vehicle.id, manufactureYearProp, 2008);
		} else if (n >= 3 && n <= 4) {
			new Statement(vehicle.id, manufactureYearProp, 2009);
		} else if (n >= 5 && n <= 12) {
			new Statement(vehicle.id, manufactureYearProp, 2010);
		} else if (n >= 13 && n <= 22) {
			new Statement(vehicle.id, manufactureYearProp, 2011);
		} else if (n >= 23 && n <= 41) {
			new Statement(vehicle.id, manufactureYearProp, 2012);
		}

		vehicles.push(vehicle);
	}

	return {
		vehicleClass,
		vehicles,
	};
}

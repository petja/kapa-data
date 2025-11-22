import { mkdirSync, writeFileSync, rmSync } from "fs";
import * as path from "path";
import { createVrSr3 } from "./data/classes/vr-sr3";
import { createVrSm4 } from "./data/classes/vr-sm4";
import { createUssrTe3 } from "./data/classes/ussr-te3";
import { createVrSm5 } from "./data/classes/vr-sm5";
import { Item, ItemType, Statement } from "./utils/prop";

function writeItemToFile(item: Item<ItemType>) {
	const [namespace, ...identifierParts] = item.id.split(":");
	const identifier = identifierParts.join(":");
	const filename = path.join(
		__dirname,
		"../public/data",
		namespace,
		`${identifier}.json`
	);

	const json = JSON.stringify(item, function (key, value) {
		if (this instanceof Statement) {
			if (key === "itemId") {
				return undefined;
			} else if (key === "property") {
				return value.id;
			}
		}

		return value;
	});

	writeFileSync(filename, json);
	console.log(`✅ Writed ${filename}`);
}

async function main() {
	const ussrTe3 = createUssrTe3();
	const vrSm4 = createVrSm4();
	const vrSm5 = createVrSm5();
	const vrSr3 = createVrSr3();

	const data = [ussrTe3, vrSm4, vrSm5, vrSr3] satisfies {
    vehicles: Item<"Vehicle">[];
    vehicleClass: Item<"VehicleClass">;
  }[];

	try {
		rmSync(path.join(__dirname, "../public/data"), {
			force: true,
			recursive: true,
		});
	} catch {
		// Ignore if directory doesn't exist
	}

	mkdirSync(path.join(__dirname, `../public/data`));
	for (const ns of ["Vehicle", "VehicleClass", "Company"] as const) {
		mkdirSync(path.join(__dirname, `../public/data/${ns}`));
	}

	for (const { vehicles, vehicleClass } of data) {
		writeItemToFile(vehicleClass);

		for (const vehicle of vehicles) {
			writeItemToFile(vehicle);
		}
	}
}

main();

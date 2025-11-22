const itemRegistry = new Map<string, Item<ItemType>>();
const propertyRegistry = new Map<string, Prop<unknown>>();
const unresolvedRefs = new Set<string>();

export type ItemType = "Vehicle" | "Company" | "VehicleClass";

export class Item<NS extends ItemType> {
	public statements: Statement<unknown, unknown>[] = [];
	public backlinks: `${string}:${string}`[] = [];

	constructor(public id: `${NS}:${string}`) {
		itemRegistry.set(id, this);
	}

	listStatements<T>(property: Prop<T>): Statement<T, T>[] {
		return this.statements.filter(
			(stmt): stmt is Statement<T, T> => stmt.property.id === property.id
		);
	}
}

export class Prop<V> {
	constructor(public id: string) {
		propertyRegistry.set(id, this);
	}
}

export class Statement<T, V extends T> {
	public validFrom: Date | null = null;
	public validUntil: Date | null = null;

	constructor(
    public itemId: string,
    public property: Prop<T>,
    public value: V
	) {
		const item = itemRegistry.get(itemId);

		if (!item) {
			throw new Error(`Item with id ${itemId} not found in registry`);
		}

		item.statements.push(this);

		if (typeof value === "string" && value.includes(":")) {
			unresolvedRefs.add(value);
			const referencedItem = itemRegistry.get(value);
			if (referencedItem) {
				referencedItem.backlinks.push(itemId as `${string}:${string}`);
			}
		}
	}

	addValidityPeriod(validFrom: Date, validUntil: Date) {
		this.validFrom = validFrom;
		this.validUntil = validUntil;
	}
}

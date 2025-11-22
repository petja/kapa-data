import { Item, Prop, Statement } from './prop';

describe('Prop', () => {
	it('creates a property with an id', () => {
		const prop = new Prop<string>('testProp');
		expect(prop.id).toBe('testProp');
	});

	it('can be used with different value types', () => {
		const stringProp = new Prop<string>('stringProp');
		const numberProp = new Prop<number>('numberProp');
		const booleanProp = new Prop<boolean>('booleanProp');

		expect(stringProp.id).toBe('stringProp');
		expect(numberProp.id).toBe('numberProp');
		expect(booleanProp.id).toBe('booleanProp');
	});
});

describe('Item', () => {
	it('creates an item with namespaced id', () => {
		const vehicle = new Item('Vehicle:Test-001');
		expect(vehicle.id).toBe('Vehicle:Test-001');
	});

	it('initializes with empty statements and backlinks', () => {
		const vehicle = new Item('Vehicle:Test-002');
		expect(vehicle.statements).toEqual([]);
		expect(vehicle.backlinks).toEqual([]);
	});

	it('supports different item types', () => {
		const vehicle = new Item('Vehicle:Test-003');
		const company = new Item('Company:TestCompany');
		const vehicleClass = new Item('VehicleClass:TestClass');

		expect(vehicle.id).toContain('Vehicle:');
		expect(company.id).toContain('Company:');
		expect(vehicleClass.id).toContain('VehicleClass:');
	});

	it('can list statements by property', () => {
		const item = new Item('Vehicle:Test-004');
		const prop1 = new Prop<string>('prop1');
		const prop2 = new Prop<number>('prop2');

		new Statement(item.id, prop1, 'value1');
		new Statement(item.id, prop1, 'value2');
		new Statement(item.id, prop2, 42);

		const prop1Statements = item.listStatements(prop1);
		expect(prop1Statements).toHaveLength(2);
		expect(prop1Statements[0].value).toBe('value1');
		expect(prop1Statements[1].value).toBe('value2');

		const prop2Statements = item.listStatements(prop2);
		expect(prop2Statements).toHaveLength(1);
		expect(prop2Statements[0].value).toBe(42);
	});
});

describe('Statement', () => {
	it('creates a statement linking item, property, and value', () => {
		const item = new Item('Vehicle:Test-005');
		const prop = new Prop<string>('testProperty');
		const statement = new Statement(item.id, prop, 'test value');

		expect(statement.itemId).toBe(item.id);
		expect(statement.property).toBe(prop);
		expect(statement.value).toBe('test value');
	});

	it('automatically adds itself to the item', () => {
		const item = new Item('Vehicle:Test-006');
		const prop = new Prop<string>('testProperty');
    
		expect(item.statements).toHaveLength(0);
    
		new Statement(item.id, prop, 'test value');
    
		expect(item.statements).toHaveLength(1);
		expect(item.statements[0].value).toBe('test value');
	});

	it('throws error if item not found in registry', () => {
		const prop = new Prop<string>('testProperty');
    
		expect(() => {
			new Statement('Vehicle:NonExistent', prop, 'value');
		}).toThrow('Item with id Vehicle:NonExistent not found in registry');
	});

	it('tracks backlinks when referencing other items', () => {
		const vehicle = new Item('Vehicle:Test-007');
		const manufacturer = new Item('Company:TestManufacturer');
		const prop = new Prop<string>('manufacturer');

		new Statement(vehicle.id, prop, manufacturer.id);

		expect(manufacturer.backlinks).toContain(vehicle.id);
	});

	it('does not track backlinks for non-reference values', () => {
		const vehicle = new Item('Vehicle:Test-008');
		const prop = new Prop<number>('speed');

		new Statement(vehicle.id, prop, 200);

		expect(vehicle.backlinks).toHaveLength(0);
	});

	it('initializes with null validity period', () => {
		const item = new Item('Vehicle:Test-009');
		const prop = new Prop<string>('testProperty');
		const statement = new Statement(item.id, prop, 'value');

		expect(statement.validFrom).toBeNull();
		expect(statement.validUntil).toBeNull();
	});

	it('can add validity period', () => {
		const item = new Item('Vehicle:Test-010');
		const prop = new Prop<string>('operator');
		const statement = new Statement(item.id, prop, 'Company:Operator1');

		const validFrom = new Date('2020-01-01');
		const validUntil = new Date('2023-12-31');
		statement.addValidityPeriod(validFrom, validUntil);

		expect(statement.validFrom).toEqual(validFrom);
		expect(statement.validUntil).toEqual(validUntil);
	});

	it('supports multiple statements for same item and property', () => {
		const item = new Item('Vehicle:Test-011');
		const prop = new Prop<string>('operator');

		const stmt1 = new Statement(item.id, prop, 'Company:Operator1');
		stmt1.addValidityPeriod(new Date('2010-01-01'), new Date('2015-12-31'));

		const stmt2 = new Statement(item.id, prop, 'Company:Operator2');
		stmt2.addValidityPeriod(new Date('2016-01-01'), new Date('2020-12-31'));

		expect(item.statements).toHaveLength(2);
		expect(item.statements[0].value).toBe('Company:Operator1');
		expect(item.statements[1].value).toBe('Company:Operator2');
	});
});

describe('Integration', () => {
	it('creates a complete vehicle with multiple properties', () => {
		const vehicle = new Item('Vehicle:IntegrationTest-001');
		const manufacturer = new Item('Company:TestManufacturer');
		const vehicleClass = new Item('VehicleClass:TestClass');

		const manufacturerProp = new Prop<string>('manufacturer');
		const vehicleClassProp = new Prop<string>('vehicleClass');
		const speedProp = new Prop<number>('maxSpeed');
		const numberProp = new Prop<number>('vehicleNumber');

		new Statement(vehicle.id, manufacturerProp, manufacturer.id);
		new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
		new Statement(vehicle.id, speedProp, 210);
		new Statement(vehicle.id, numberProp, 3301);

		expect(vehicle.statements).toHaveLength(4);
		expect(manufacturer.backlinks).toContain(vehicle.id);
		expect(vehicleClass.backlinks).toContain(vehicle.id);
	});

	it('handles complex relationships between multiple items', () => {
		const vehicle1 = new Item('Vehicle:Multi-001');
		const vehicle2 = new Item('Vehicle:Multi-002');
		const manufacturer = new Item('Company:SharedManufacturer');
		const vehicleClass = new Item('VehicleClass:SharedClass');

		const manufacturerProp = new Prop<string>('manufacturer');
		const vehicleClassProp = new Prop<string>('vehicleClass');

		new Statement(vehicle1.id, manufacturerProp, manufacturer.id);
		new Statement(vehicle1.id, vehicleClassProp, vehicleClass.id);
		new Statement(vehicle2.id, manufacturerProp, manufacturer.id);
		new Statement(vehicle2.id, vehicleClassProp, vehicleClass.id);

		expect(manufacturer.backlinks).toHaveLength(2);
		expect(manufacturer.backlinks).toContain(vehicle1.id);
		expect(manufacturer.backlinks).toContain(vehicle2.id);
		expect(vehicleClass.backlinks).toHaveLength(2);
	});
});

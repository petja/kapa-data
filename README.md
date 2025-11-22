# Railway Vehicle Data Generator

A TypeScript-based data generator that creates structured knowledge graph data for railway vehicles. The system generates JSON files representing railway vehicles and their metadata using UIC (International Union of Railways) identification standards.

## Overview

This project models railway vehicles in a knowledge graph structure similar to Wikidata. Each vehicle and vehicle class is represented as an entity with properties and statements that describe its characteristics, relationships, and history.

### What it generates

- **Vehicle Classes**: High-level definitions for types of trains (e.g., VR Sr3 electric locomotives)
- **Individual Vehicles**: Specific units with unique identifiers (e.g., Sr3 3301, Sr3 3302, etc.)
- **Structured Metadata**: Manufacturer, operator, technical specifications, UIC identification codes

## Getting Started

### Prerequisites

- Node.js (with npm)
- TypeScript knowledge for development

### Installation

```bash
npm install
```

### Running

```bash
npm start
```

This generates JSON files for all defined vehicles and vehicle classes in the `output/` directory.

### Testing

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```
src/
├── data/
│   ├── classes/        # Vehicle class definitions (e.g., vr-sr3.ts, vr-sm4.ts)
│   ├── manufacturers/  # Company definitions (manufacturers)
│   ├── operators/      # Company definitions (operators)
│   └── props/          # Property definitions (~48 properties)
├── utils/
│   ├── prop.ts         # Core data model (Item, Statement, registries)
│   └── util.ts         # Utility functions (Luhn check digit, etc.)
├── uic.ts              # UIC identification code generation
└── index.ts            # Main script
```

## Data Model

The project implements a custom knowledge graph with three core concepts:

### Items

Entities like vehicles, vehicle classes, and companies. Each item has:
- A unique namespaced ID (e.g., `Vehicle:VR-Sr3-3301`)
- A collection of statements (property-value pairs)
- Automatic backlink tracking for relationships

### Properties

Types of data that can be associated with items:
- `manufacturer` - Who built the vehicle
- `maxSpeedKph` - Maximum speed in km/h
- `vehicleUic` - UIC identification marking
- `trackGaugeMm` - Track gauge in millimeters
- ...and many more

### Statements

Connections between items and property values. Can include:
- Time validity (`validFrom`, `validUntil`)
- Automatic bidirectional relationship tracking

## Example: Adding a New Vehicle Class

Create a new file in `src/data/classes/`:

```typescript
import { Item, Statement } from "../../utils/prop";
import { manufacturerProp } from "../props/manufacturer";
// ... import other properties

export function createMyVehicleClass() {
  const vehicles: Item<"Vehicle">[] = [];
  const vehicleClass = new Item("VehicleClass:MyClass");

  // Define class-level properties
  new Statement(vehicleClass.id, manufacturerProp, someManufacturer.id);
  new Statement(vehicleClass.id, maxSpeedKphProp, 200);

  // Generate individual vehicles
  for (let n = 1; n <= 50; n++) {
    const vehicle = new Item(`Vehicle:MyClass-${n}`);
    new Statement(vehicle.id, vehicleClassProp, vehicleClass.id);
    new Statement(vehicle.id, vehicleNumberProp, n);
    vehicles.push(vehicle);
  }

  return { vehicleClass, vehicles };
}
```

Then add it to `src/index.ts` in the `main()` function's data array.

## UIC Identification

The system automatically generates UIC identification markings for railway vehicles following international standards:

Format: `{type} {country} {national block} ({check digit}) {vkm}`

Example: `91 10 3103301 (7) FIN-VR`

The check digit is calculated using the Luhn algorithm to ensure data integrity.

## Output Format

Generated JSON files are written to `output/` with one file per item:

```
output/
├── Vehicle/
│   ├── VR-Sr3-3301.json
│   ├── VR-Sr3-3302.json
│   └── ...
└── VehicleClass/
    ├── VR-Sr3.json
    └── ...
```

Each JSON file contains:
- Item metadata (ID, type)
- All statements with property references
- Validity periods where applicable

## Current Dataset

The project currently includes data for:

- **VR Sr3** - Finnish electric locomotives (80 units: 3301-3380)
- **VR Sm4** - Finnish electric multiple units
- **VR Sm5** - Finnish electric multiple units
- **USSR TE3** - Soviet diesel locomotives

## Contributing

When adding new data:

1. **New vehicle classes** → Create in `src/data/classes/`
2. **New properties** → Create in `src/data/props/`
3. **New companies** → Create in `src/data/manufacturers/` or `src/data/operators/`

Follow the existing patterns and include TypeScript type annotations.

## License

ISC

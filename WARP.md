# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a TypeScript-based data generator for railway vehicle information that follows a knowledge graph structure similar to Wikidata. The system creates structured JSON output files representing railway vehicles and their associated metadata using UIC identification standards.

## Commands

### Running the Application
```bash
npm start
```
This executes the main script that generates JSON files for all defined vehicle classes and vehicles in the `output/` directory.

### Installation
```bash
npm install
```

## Architecture

### Core Data Model

The project implements a custom knowledge graph system with three main entity types:

1. **Items** - Represent entities like vehicles, companies, and vehicle classes
   - Identified by namespaced IDs: `{ItemType}:{identifier}` (e.g., `Vehicle:VR-Sr3-3301`, `Company:SiemensMobility`)
   - Contain collections of statements (property-value pairs)
   - Track bidirectional relationships via backlinks

2. **Properties** - Define the types of data that can be associated with items
   - Located in `src/data/props/` (~48 properties defined)
   - Examples: `manufacturer`, `maxSpeedKph`, `vehicleUic`, `trackGaugeMm`
   - Typed using TypeScript generics to enforce value types

3. **Statements** - Connect items to property values
   - Can optionally have validity periods (`validFrom`, `validUntil`)
   - Automatically register themselves with items upon creation
   - Handle reference resolution and backlink tracking

### Registry System

The codebase uses in-memory registries (`src/utils/prop.ts`):
- `itemRegistry` - Maps item IDs to Item instances
- `propertyRegistry` - Maps property IDs to Prop instances
- Enables reference resolution and relationship tracking during data construction

### Data Organization

```
src/data/
├── classes/        # Vehicle class definitions (creates fleets of vehicles)
│   ├── vr-sr3.ts   # Example: Finnish VR Sr3 locomotives (80 units)
│   ├── vr-sm4.ts
│   ├── vr-sm5.ts
│   └── ussr-te3.ts
├── manufacturers/  # Company definitions (manufacturers)
├── operators/      # Company definitions (operators)
└── props/          # Property definitions (~48 properties)
```

### Vehicle Class Pattern

Each file in `src/data/classes/` follows this pattern:
1. Create a `VehicleClass` item with shared properties
2. Generate individual `Vehicle` items in a loop
3. Link each vehicle to its class via the `vehicleClass` property
4. Return both the class and vehicle array

### UIC Identification

The system implements UIC identification marking for tractive stock (`src/uic.ts`):
- Handles type codes, country codes, and national blocks
- Calculates check digits using Luhn algorithm (`src/utils/util.ts`)
- Formats output: `{typeCode} {countryCode} {nationalBlock} ({checkDigit}) {vkm}`

### Output Generation

The main script (`src/index.ts`):
1. Calls all vehicle class creation functions
2. Clears and recreates the `output/` directory structure
3. Serializes items to JSON with custom formatting:
   - Statement property references are replaced with property IDs (strings)
   - `itemId` fields are excluded from serialized statements
4. Writes separate JSON files per item to `output/Vehicle/` and `output/VehicleClass/`

## Adding New Data

### Adding a New Vehicle Class
1. Create a new file in `src/data/classes/{name}.ts`
2. Follow the existing pattern (see `vr-sr3.ts` as reference)
3. Import and call the creation function in `src/index.ts`
4. Add to the `data` array in the `main()` function

### Adding a New Property
1. Create a new file in `src/data/props/{propertyName}.ts`
2. Define the property with appropriate TypeScript type constraint
3. Include JSDoc comments with examples
4. Export and import in vehicle class files as needed

### Adding a New Company
1. Create an Item in `src/data/manufacturers/` or `src/data/operators/`
2. Export the item for use in vehicle definitions
3. Use the company's ID in Statement values

## TypeScript Configuration

- Strict mode enabled (`tsconfig.json`)
- Uses `tsx` for direct TypeScript execution
- No build step required for development

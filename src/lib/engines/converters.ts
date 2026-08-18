/**
 * Universal Unit Conversion Engine
 * High-precision conversions with bidirectional formulas
 */

export type UnitType = "length" | "weight" | "temperature" | "data";

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  factorToBase: number; // Multiply by this to get base unit
}

export const LENGTH_UNITS: Record<string, UnitDefinition> = {
  m: { id: "m", name: "Meters", symbol: "m", factorToBase: 1 },
  km: { id: "km", name: "Kilometers", symbol: "km", factorToBase: 1000 },
  cm: { id: "cm", name: "Centimeters", symbol: "cm", factorToBase: 0.01 },
  mm: { id: "mm", name: "Millimeters", symbol: "mm", factorToBase: 0.001 },
  mi: { id: "mi", name: "Miles", symbol: "mi", factorToBase: 1609.344 },
  yd: { id: "yd", name: "Yards", symbol: "yd", factorToBase: 0.9144 },
  ft: { id: "ft", name: "Feet", symbol: "ft", factorToBase: 0.3048 },
  in: { id: "in", name: "Inches", symbol: "in", factorToBase: 0.0254 },
};

export const WEIGHT_UNITS: Record<string, UnitDefinition> = {
  kg: { id: "kg", name: "Kilograms", symbol: "kg", factorToBase: 1 },
  g: { id: "g", name: "Grams", symbol: "g", factorToBase: 0.001 },
  mg: { id: "mg", name: "Milligrams", symbol: "mg", factorToBase: 0.000001 },
  lb: { id: "lb", name: "Pounds", symbol: "lb", factorToBase: 0.45359237 },
  oz: { id: "oz", name: "Ounces", symbol: "oz", factorToBase: 0.028349523125 },
  ton: { id: "ton", name: "Metric Tons", symbol: "t", factorToBase: 1000 },
  stone: { id: "stone", name: "Stones", symbol: "st", factorToBase: 6.35029318 },
};

export const DATA_UNITS: Record<string, UnitDefinition> = {
  b: { id: "b", name: "Bytes", symbol: "B", factorToBase: 1 },
  kb: { id: "kb", name: "Kilobytes", symbol: "KB", factorToBase: 1024 },
  mb: { id: "mb", name: "Megabytes", symbol: "MB", factorToBase: 1048576 },
  gb: { id: "gb", name: "Gigabytes", symbol: "GB", factorToBase: 1073741824 },
  tb: { id: "tb", name: "Terabytes", symbol: "TB", factorToBase: 1099511627776 },
  pb: { id: "pb", name: "Petabytes", symbol: "PB", factorToBase: 1125899906842624 },
};

export interface ConversionResult {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
  formattedResult: string;
  formula: string;
}

export function convertLength(value: number, fromUnitId: string, toUnitId: string): ConversionResult {
  const from = LENGTH_UNITS[fromUnitId.toLowerCase()];
  const to = LENGTH_UNITS[toUnitId.toLowerCase()];
  if (!from || !to) throw new Error("Invalid length unit identifier");

  // Convert to meters, then to target unit
  const baseValueInMeters = value * from.factorToBase;
  const toValue = baseValueInMeters / to.factorToBase;

  return {
    fromValue: value,
    fromUnit: from.symbol,
    toValue,
    toUnit: to.symbol,
    formattedResult: `${value} ${from.symbol} = ${toValue.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${to.symbol}`,
    formula: `1 ${from.symbol} = ${(from.factorToBase / to.factorToBase).toLocaleString("en-US", { maximumFractionDigits: 8 })} ${to.symbol}`,
  };
}

export function convertWeight(value: number, fromUnitId: string, toUnitId: string): ConversionResult {
  const from = WEIGHT_UNITS[fromUnitId.toLowerCase()];
  const to = WEIGHT_UNITS[toUnitId.toLowerCase()];
  if (!from || !to) throw new Error("Invalid weight unit identifier");

  const baseValueInKg = value * from.factorToBase;
  const toValue = baseValueInKg / to.factorToBase;

  return {
    fromValue: value,
    fromUnit: from.symbol,
    toValue,
    toUnit: to.symbol,
    formattedResult: `${value} ${from.symbol} = ${toValue.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${to.symbol}`,
    formula: `1 ${from.symbol} = ${(from.factorToBase / to.factorToBase).toLocaleString("en-US", { maximumFractionDigits: 8 })} ${to.symbol}`,
  };
}

export function convertData(value: number, fromUnitId: string, toUnitId: string, isBinary: boolean = true): ConversionResult {
  const baseMultiplier = isBinary ? 1024 : 1000;
  const unitsOrder = ["b", "kb", "mb", "gb", "tb", "pb"];

  const fromIndex = unitsOrder.indexOf(fromUnitId.toLowerCase());
  const toIndex = unitsOrder.indexOf(toUnitId.toLowerCase());
  if (fromIndex === -1 || toIndex === -1) throw new Error("Invalid data unit identifier");

  const powerDiff = fromIndex - toIndex;
  const toValue = value * Math.pow(baseMultiplier, powerDiff);

  const fromSymbol = DATA_UNITS[fromUnitId.toLowerCase()].symbol;
  const toSymbol = DATA_UNITS[toUnitId.toLowerCase()].symbol;

  return {
    fromValue: value,
    fromUnit: fromSymbol,
    toValue,
    toUnit: toSymbol,
    formattedResult: `${value} ${fromSymbol} = ${toValue.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${toSymbol}`,
    formula: `1 ${fromSymbol} = ${Math.pow(baseMultiplier, powerDiff).toLocaleString("en-US")} ${toSymbol}`,
  };
}

export function convertTemperature(value: number, fromUnit: "c" | "f" | "k", toUnit: "c" | "f" | "k"): ConversionResult {
  const from = fromUnit.toLowerCase() as "c" | "f" | "k";
  const to = toUnit.toLowerCase() as "c" | "f" | "k";

  if (from === to) {
    return {
      fromValue: value,
      fromUnit: from.toUpperCase(),
      toValue: value,
      toUnit: to.toUpperCase(),
      formattedResult: `${value}°${from.toUpperCase()} = ${value}°${to.toUpperCase()}`,
      formula: "Identity",
    };
  }

  // Convert to Celsius first
  let celsius = value;
  if (from === "f") {
    celsius = (value - 32) * (5 / 9);
  } else if (from === "k") {
    celsius = value - 273.15;
  }

  // Check absolute zero
  if (celsius < -273.15) {
    throw new Error("Temperature cannot be below absolute zero (-273.15°C / 0K / -459.67°F)");
  }

  // Convert Celsius to target
  let toValue = celsius;
  let formula = "";
  if (to === "f") {
    toValue = celsius * (9 / 5) + 32;
    formula = from === "c" ? "(°C × 9/5) + 32 = °F" : "((K - 273.15) × 9/5) + 32 = °F";
  } else if (to === "k") {
    toValue = celsius + 273.15;
    formula = from === "c" ? "°C + 273.15 = K" : "((°F - 32) × 5/9) + 273.15 = K";
  } else {
    formula = from === "f" ? "(°F - 32) × 5/9 = °C" : "K - 273.15 = °C";
  }

  return {
    fromValue: value,
    fromUnit: from === "k" ? "K" : `°${from.toUpperCase()}`,
    toValue,
    toUnit: to === "k" ? "K" : `°${to.toUpperCase()}`,
    formattedResult: `${value}${from === "k" ? "K" : "°" + from.toUpperCase()} = ${toValue.toFixed(4)}${to === "k" ? "K" : "°" + to.toUpperCase()}`,
    formula,
  };
}

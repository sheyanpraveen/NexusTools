import { describe, it, expect } from "vitest";
import {
  convertLength,
  convertWeight,
  convertTemperature,
  convertData,
} from "../../src/lib/engines/converters";

describe("Converters Engine", () => {
  it("converts length units accurately", () => {
    // 1 meter to feet = 3.28084 ft
    expect(convertLength(1, "m", "ft").toValue).toBeCloseTo(3.28084, 4);
    // 100 cm to inches = 39.3701 in
    expect(convertLength(100, "cm", "in").toValue).toBeCloseTo(39.3701, 3);
    // 5 miles to km
    expect(convertLength(5, "mi", "km").toValue).toBeCloseTo(8.04672, 3);
  });

  it("converts weight units accurately", () => {
    // 1 kg to lb = 2.20462 lb
    expect(convertWeight(1, "kg", "lb").toValue).toBeCloseTo(2.20462, 4);
    // 1 lb to kg = 0.453592 kg
    expect(convertWeight(1, "lb", "kg").toValue).toBeCloseTo(0.453592, 4);
    // 500 grams to kg = 0.5 kg
    expect(convertWeight(500, "g", "kg").toValue).toBe(0.5);
  });

  it("converts temperatures accurately", () => {
    // 0 C = 32 F
    expect(convertTemperature(0, "c", "f").toValue).toBe(32);
    // 100 C = 212 F
    expect(convertTemperature(100, "c", "f").toValue).toBe(212);
    // 32 F = 0 C
    expect(convertTemperature(32, "f", "c").toValue).toBe(0);
    // 0 C = 273.15 K
    expect(convertTemperature(0, "c", "k").toValue).toBe(273.15);
    // Absolute zero boundary check
    expect(() => convertTemperature(-300, "c", "f")).toThrow("absolute zero");
  });

  it("converts data storage units accurately", () => {
    // 1 GB to MB in binary (1024)
    expect(convertData(1, "gb", "mb", true).toValue).toBe(1024);
    // 1 MB to KB in binary (1024)
    expect(convertData(1, "mb", "kb", true).toValue).toBe(1024);
    // 1024 MB to GB = 1 GB
    expect(convertData(1024, "mb", "gb", true).toValue).toBe(1);
  });
});

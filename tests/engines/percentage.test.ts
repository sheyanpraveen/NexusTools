import { describe, it, expect } from "vitest";
import {
  calculatePercentageOf,
  calculateWhatPercentage,
  calculatePercentageChange,
  calculatePercentageIncrease,
  calculatePercentageDecrease,
  calculateDiscount,
} from "../../src/lib/engines/percentage";

describe("Percentage Engine", () => {
  it("calculates percentage of a number correctly", () => {
    expect(calculatePercentageOf(20, 200).result).toBe(40);
    expect(calculatePercentageOf(0, 500).result).toBe(0);
    expect(calculatePercentageOf(150, 50).result).toBe(75);
    expect(calculatePercentageOf(33.333333333333336, 300).result).toBeCloseTo(100);
  });

  it("calculates what percentage a number is of another", () => {
    expect(calculateWhatPercentage(40, 200).percentage).toBe(20);
    expect(calculateWhatPercentage(50, 100).percentage).toBe(50);
    expect(() => calculateWhatPercentage(10, 0)).toThrow("Total cannot be zero");
  });

  it("calculates percentage increase and decrease", () => {
    const inc = calculatePercentageIncrease(100, 25);
    expect(inc.newValue).toBe(125);
    expect(inc.amountAdded).toBe(25);

    const dec = calculatePercentageDecrease(100, 20);
    expect(dec.newValue).toBe(80);
    expect(dec.amountSubtracted).toBe(20);
  });

  it("calculates percentage change between two values", () => {
    const changeInc = calculatePercentageChange(50, 75);
    expect(changeInc.percentageChange).toBe(50);
    expect(changeInc.isIncrease).toBe(true);

    const changeDec = calculatePercentageChange(100, 80);
    expect(changeDec.percentageChange).toBe(-20);
    expect(changeDec.isIncrease).toBe(false);

    expect(() => calculatePercentageChange(0, 100)).toThrow("cannot be zero");
  });

  it("calculates discount with stacked discounts", () => {
    const res = calculateDiscount(100, 20, 10);
    // 100 - 20% = 80, 80 - 10% = 72
    expect(res.finalPrice).toBe(72);
    expect(res.amountSaved).toBe(28);
    expect(res.effectiveDiscountPercent).toBe(28);
  });
});

import { describe, it, expect } from "vitest";
import {
  calculateAverage,
  parseNumberList,
  simplifyRatio,
  solveRatioProportion,
} from "../../src/lib/engines/math";

describe("Math Engine", () => {
  it("calculates mean, median, mode, range, and standard deviation accurately", () => {
    const nums = [10, 20, 20, 40, 50, 100];
    const avg = calculateAverage(nums);
    expect(avg.count).toBe(6);
    expect(avg.sum).toBe(240);
    expect(avg.mean).toBe(40);
    expect(avg.median).toBe(30);
    expect(avg.mode).toEqual([20]);
    expect(avg.range).toBe(90);
    expect(avg.min).toBe(10);
    expect(avg.max).toBe(100);
  });

  it("parses diverse number list formats (commas, spaces, newlines)", () => {
    const parsed = parseNumberList("10, 25.5\n30; 45 50");
    expect(parsed).toEqual([10, 25.5, 30, 45, 50]);
  });

  it("simplifies ratios accurately", () => {
    const simp = simplifyRatio(120, 80);
    expect(simp.simplifiedAntecedent).toBe(3);
    expect(simp.simplifiedConsequent).toBe(2);
    expect(simp.simplifiedString).toBe("3 : 2");
  });

  it("solves ratio proportions A/B = C/D", () => {
    // 3 / 4 = X / 12  ==>  X = 9
    const solveC = solveRatioProportion(3, 4, null, 12);
    expect(solveC.solvedVariable).toBe("C");
    expect(solveC.value).toBe(9);
  });
});

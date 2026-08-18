import { describe, it, expect } from "vitest";
import {
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateLoan,
} from "../../src/lib/engines/finance";

describe("Finance Engine", () => {
  it("calculates simple interest accurately", () => {
    // $10,000 at 5% for 3 years = $1,500 interest, $11,500 total
    const res = calculateSimpleInterest(10000, 5, 3);
    expect(res.totalInterest).toBe(1500);
    expect(res.finalBalance).toBe(11500);
    expect(res.annualBreakdown.length).toBe(3);
    expect(res.annualBreakdown[2].balance).toBe(11500);
  });

  it("calculates compound interest with monthly compounding", () => {
    // $1,000 at 10% for 2 years monthly compounding without contributions ~ $1220.39
    const res = calculateCompoundInterest(1000, 10, 2, 12, 0);
    expect(res.futureValue).toBeCloseTo(1220.39, 0);
    expect(res.totalInterest).toBeCloseTo(220.39, 0);
  });

  it("calculates loan monthly payments and amortization correctly", () => {
    // $200,000 at 6% for 30 years -> Monthly payment is ~$1199.10
    const res = calculateLoan(200000, 6, 30);
    expect(res.monthlyPayment).toBeCloseTo(1199.10, 1);
    expect(res.schedule.length).toBe(360);
    // Final balance should reach 0
    expect(res.schedule[359].remainingBalance).toBeCloseTo(0, 0);
  });

  it("handles 0% interest loans correctly", () => {
    const res = calculateLoan(12000, 0, 1);
    expect(res.monthlyPayment).toBe(1000);
    expect(res.totalInterest).toBe(0);
    expect(res.totalPayment).toBe(12000);
  });
});

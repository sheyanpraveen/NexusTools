import { describe, it, expect } from "vitest";
import {
  calculateAge,
  calculateDateDifference,
  parseUnixTimestamp,
} from "../../src/lib/engines/datetime";

describe("Date & Time Engine", () => {
  it("calculates age accurately across years and months", () => {
    const age = calculateAge("2000-01-15", "2025-01-15");
    expect(age.years).toBe(25);
    expect(age.months).toBe(0);
    expect(age.days).toBe(0);
    expect(age.dayOfWeekBorn).toBe("Saturday");
  });

  it("calculates date differences and business days correctly", () => {
    // A 7-day period (Monday to Sunday) has 7 days, 5 business days, 2 weekend days
    const diff = calculateDateDifference("2024-06-03", "2024-06-10", false);
    expect(diff.totalDays).toBe(7);
    expect(diff.businessDays).toBe(5);
    expect(diff.weekendDays).toBe(2);
  });

  it("parses Unix timestamps in seconds and milliseconds", () => {
    const parsedSec = parseUnixTimestamp(1700000000);
    expect(parsedSec.seconds).toBe(1700000000);
    expect(parsedSec.isoUTC).toBe("2023-11-14T22:13:20.000Z");

    const parsedMs = parseUnixTimestamp(1700000000000);
    expect(parsedMs.seconds).toBe(1700000000);
    expect(parsedMs.milliseconds).toBe(1700000000000);
  });
});

/**
 * Mathematical Engine
 * Averages, Statistics, Ratio Solvers, and Fractions
 */

export interface AverageResult {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  min: number;
  max: number;
  count: number;
  sum: number;
  variance: number;
  standardDeviation: number;
}

export function calculateAverage(numbers: number[]): AverageResult {
  if (!numbers || numbers.length === 0) {
    throw new Error("Please provide at least one number");
  }

  const count = numbers.length;
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  // Median
  let median = 0;
  const mid = Math.floor(count / 2);
  if (count % 2 === 0) {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    median = sorted[mid];
  }

  // Mode
  const counts: Record<number, number> = {};
  let maxFreq = 0;
  for (const n of numbers) {
    counts[n] = (counts[n] || 0) + 1;
    if (counts[n] > maxFreq) maxFreq = counts[n];
  }
  const mode: number[] = [];
  if (maxFreq > 1) {
    for (const [key, freq] of Object.entries(counts)) {
      if (freq === maxFreq) mode.push(Number(key));
    }
  }

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const range = max - min;

  // Variance & Standard Deviation
  const squareDiffs = numbers.map((value) => Math.pow(value - mean, 2));
  const variance = squareDiffs.reduce((acc, val) => acc + val, 0) / count;
  const standardDeviation = Math.sqrt(variance);

  return {
    mean: parseFloat(mean.toFixed(6)),
    median: parseFloat(median.toFixed(6)),
    mode,
    range: parseFloat(range.toFixed(6)),
    min,
    max,
    count,
    sum: parseFloat(sum.toFixed(6)),
    variance: parseFloat(variance.toFixed(6)),
    standardDeviation: parseFloat(standardDeviation.toFixed(6)),
  };
}

export function parseNumberList(input: string): number[] {
  if (!input.trim()) return [];
  return input
    .split(/[\s,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => {
      const num = Number(s);
      if (isNaN(num)) throw new Error(`Invalid number: "${s}"`);
      return num;
    });
}

export interface RatioResult {
  antecedent: number;
  consequent: number;
  simplifiedAntecedent: number;
  simplifiedConsequent: number;
  ratioString: string;
  simplifiedString: string;
  decimalEquivalent: number;
  percentageEquivalent: number;
}

export function simplifyRatio(a: number, b: number): RatioResult {
  if (isNaN(a) || isNaN(b)) throw new Error("Invalid number input");
  if (b === 0) throw new Error("Denominator / consequent cannot be zero");

  // Helper for GCD
  function gcd(x: number, y: number): number {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  // Handle floats by scaling
  let factor = 1;
  while (!Number.isInteger(a * factor) || !Number.isInteger(b * factor)) {
    factor *= 10;
  }

  const intA = Math.round(a * factor);
  const intB = Math.round(b * factor);
  const divisor = gcd(intA, intB);

  const simpA = intA / divisor;
  const simpB = intB / divisor;

  return {
    antecedent: a,
    consequent: b,
    simplifiedAntecedent: simpA,
    simplifiedConsequent: simpB,
    ratioString: `${a} : ${b}`,
    simplifiedString: `${simpA} : ${simpB}`,
    decimalEquivalent: a / b,
    percentageEquivalent: (a / b) * 100,
  };
}

export function solveRatioProportion(
  a: number | null,
  b: number | null,
  c: number | null,
  d: number | null
): { solvedVariable: "A" | "B" | "C" | "D"; value: number; explanation: string } {
  // A / B = C / D  ==>  A * D = B * C
  if (a === null && b !== null && c !== null && d !== null) {
    if (d === 0) throw new Error("Cannot divide by zero");
    const val = (b * c) / d;
    return { solvedVariable: "A", value: val, explanation: `A = (B × C) / D = (${b} × ${c}) / ${d} = ${val}` };
  }
  if (b === null && a !== null && c !== null && d !== null) {
    if (c === 0) throw new Error("Cannot divide by zero");
    const val = (a * d) / c;
    return { solvedVariable: "B", value: val, explanation: `B = (A × D) / C = (${a} × ${d}) / ${c} = ${val}` };
  }
  if (c === null && a !== null && b !== null && d !== null) {
    if (b === 0) throw new Error("Cannot divide by zero");
    const val = (a * d) / b;
    return { solvedVariable: "C", value: val, explanation: `C = (A × D) / B = (${a} × ${d}) / ${b} = ${val}` };
  }
  if (d === null && a !== null && b !== null && c !== null) {
    if (a === 0) throw new Error("Cannot divide by zero");
    const val = (b * c) / a;
    return { solvedVariable: "D", value: val, explanation: `D = (B × C) / A = (${b} × ${c}) / ${a} = ${val}` };
  }

  throw new Error("Exactly one value must be empty (null) to solve the proportion");
}

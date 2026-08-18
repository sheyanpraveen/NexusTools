/**
 * Percentage calculation engine
 * Pure, deterministic mathematical calculations
 */

export interface PercentageOfResult {
  result: number;
  formulaString: string;
  stepExplanation: string;
}

export function calculatePercentageOf(percentage: number, total: number): PercentageOfResult {
  if (isNaN(percentage) || isNaN(total)) {
    throw new Error("Invalid number input");
  }
  const result = (percentage / 100) * total;
  return {
    result,
    formulaString: `(${percentage} / 100) × ${total} = ${result}`,
    stepExplanation: `First divide ${percentage} by 100 to get ${percentage / 100}, then multiply by ${total} to get ${result}.`,
  };
}

export interface WhatPercentageResult {
  percentage: number;
  formulaString: string;
  stepExplanation: string;
}

export function calculateWhatPercentage(part: number, total: number): WhatPercentageResult {
  if (isNaN(part) || isNaN(total)) {
    throw new Error("Invalid number input");
  }
  if (total === 0) {
    throw new Error("Total cannot be zero for percentage calculation");
  }
  const percentage = (part / total) * 100;
  return {
    percentage,
    formulaString: `(${part} / ${total}) × 100 = ${percentage}%`,
    stepExplanation: `Divide ${part} by ${total} to get ${(part / total).toFixed(6)}, then multiply by 100 to get ${percentage.toFixed(4)}%.`,
  };
}

export interface PercentageChangeResult {
  difference: number;
  percentageChange: number;
  isIncrease: boolean;
  formulaString: string;
  stepExplanation: string;
}

export function calculatePercentageChange(originalValue: number, newValue: number): PercentageChangeResult {
  if (isNaN(originalValue) || isNaN(newValue)) {
    throw new Error("Invalid number input");
  }
  if (originalValue === 0) {
    throw new Error("Original value cannot be zero when calculating percentage change");
  }
  const difference = newValue - originalValue;
  const percentageChange = (difference / Math.abs(originalValue)) * 100;
  const isIncrease = difference >= 0;

  return {
    difference,
    percentageChange,
    isIncrease,
    formulaString: `((${newValue} - ${originalValue}) / |${originalValue}|) × 100 = ${percentageChange.toFixed(4)}%`,
    stepExplanation: `Subtract initial value (${originalValue}) from new value (${newValue}) to get difference (${difference}). Divide by initial value and multiply by 100.`,
  };
}

export function calculatePercentageIncrease(originalValue: number, increasePercent: number): {
  newValue: number;
  amountAdded: number;
} {
  if (isNaN(originalValue) || isNaN(increasePercent)) {
    throw new Error("Invalid number input");
  }
  const amountAdded = (increasePercent / 100) * originalValue;
  const newValue = originalValue + amountAdded;
  return { newValue, amountAdded };
}

export function calculatePercentageDecrease(originalValue: number, decreasePercent: number): {
  newValue: number;
  amountSubtracted: number;
} {
  if (isNaN(originalValue) || isNaN(decreasePercent)) {
    throw new Error("Invalid number input");
  }
  const amountSubtracted = (decreasePercent / 100) * originalValue;
  const newValue = originalValue - amountSubtracted;
  return { newValue, amountSubtracted };
}

export interface DiscountResult {
  finalPrice: number;
  amountSaved: number;
  effectiveDiscountPercent: number;
}

export function calculateDiscount(
  originalPrice: number,
  primaryDiscountPercent: number,
  additionalDiscountPercent: number = 0
): DiscountResult {
  if (isNaN(originalPrice) || isNaN(primaryDiscountPercent) || originalPrice < 0) {
    throw new Error("Please enter valid positive numbers");
  }
  const firstDiscountAmount = (primaryDiscountPercent / 100) * originalPrice;
  const intermediatePrice = originalPrice - firstDiscountAmount;

  const secondDiscountAmount = (additionalDiscountPercent / 100) * intermediatePrice;
  const finalPrice = Math.max(0, intermediatePrice - secondDiscountAmount);
  const amountSaved = originalPrice - finalPrice;
  const effectiveDiscountPercent = originalPrice > 0 ? (amountSaved / originalPrice) * 100 : 0;

  return {
    finalPrice: parseFloat(finalPrice.toFixed(4)),
    amountSaved: parseFloat(amountSaved.toFixed(4)),
    effectiveDiscountPercent: parseFloat(effectiveDiscountPercent.toFixed(4)),
  };
}

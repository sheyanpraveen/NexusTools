/**
 * Financial calculation engine
 * Mathematical models for interest, loan amortization, and investments
 */

export interface SimpleInterestResult {
  totalInterest: number;
  finalBalance: number;
  annualBreakdown: { year: number; interestEarned: number; balance: number }[];
}

export function calculateSimpleInterest(
  principal: number,
  annualRatePercent: number,
  timeYears: number
): SimpleInterestResult {
  if (principal < 0 || annualRatePercent < 0 || timeYears < 0) {
    throw new Error("Values must be non-negative");
  }
  const rate = annualRatePercent / 100;
  const totalInterest = principal * rate * timeYears;
  const finalBalance = principal + totalInterest;

  const annualBreakdown = [];
  const fullYears = Math.floor(timeYears);
  for (let year = 1; year <= fullYears; year++) {
    const interestEarned = principal * rate * year;
    annualBreakdown.push({
      year,
      interestEarned,
      balance: principal + interestEarned,
    });
  }

  return {
    totalInterest,
    finalBalance,
    annualBreakdown,
  };
}

export type CompoundFrequency = 1 | 2 | 4 | 12 | 365; // Annually, Semi-annually, Quarterly, Monthly, Daily

export interface CompoundInterestResult {
  futureValue: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterest: number;
  schedule: {
    year: number;
    startBalance: number;
    deposit: number;
    interest: number;
    endBalance: number;
  }[];
}

export function calculateCompoundInterest(
  initialPrincipal: number,
  annualRatePercent: number,
  years: number,
  compoundFrequency: CompoundFrequency = 12,
  monthlyContribution: number = 0
): CompoundInterestResult {
  if (initialPrincipal < 0 || annualRatePercent < 0 || years <= 0) {
    throw new Error("Please provide valid positive numbers");
  }

  const r = annualRatePercent / 100;
  const n = compoundFrequency;
  let currentBalance = initialPrincipal;
  let totalDeposited = initialPrincipal;
  let totalInterest = 0;
  const schedule = [];

  const totalMonths = Math.round(years * 12);
  const fullYears = Math.ceil(years);

  let currentYearInterest = 0;
  let currentYearDeposits = 0;

  for (let month = 1; month <= totalMonths; month++) {
    // Add monthly contribution at start of month
    if (monthlyContribution > 0) {
      currentBalance += monthlyContribution;
      totalDeposited += monthlyContribution;
      currentYearDeposits += monthlyContribution;
    }

    // Compound interest according to frequency (monthly rate approximation)
    const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
    const interestThisMonth = currentBalance * monthlyRate;
    currentBalance += interestThisMonth;
    totalInterest += interestThisMonth;
    currentYearInterest += interestThisMonth;

    if (month % 12 === 0 || month === totalMonths) {
      const yearIndex = Math.ceil(month / 12);
      schedule.push({
        year: yearIndex,
        startBalance: totalDeposited + totalInterest - currentYearInterest - currentYearDeposits,
        deposit: currentYearDeposits,
        interest: currentYearInterest,
        endBalance: currentBalance,
      });
      currentYearInterest = 0;
      currentYearDeposits = 0;
    }
  }

  return {
    futureValue: currentBalance,
    totalPrincipal: initialPrincipal,
    totalContributions: totalDeposited - initialPrincipal,
    totalInterest: currentBalance - totalDeposited,
    schedule,
  };
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: {
    period: number;
    payment: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
}

export function calculateLoan(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number
): LoanResult {
  if (loanAmount <= 0 || termYears <= 0) {
    throw new Error("Loan amount and term must be greater than zero");
  }

  const numberOfPayments = Math.round(termYears * 12);
  const monthlyRate = (annualRatePercent / 100) / 12;

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  let balance = loanAmount;
  const schedule = [];

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = monthlyPayment - interestPaid;
    balance = Math.max(0, balance - principalPaid);

    schedule.push({
      period: month,
      payment: monthlyPayment,
      principalPaid,
      interestPaid,
      remainingBalance: balance,
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    schedule,
  };
}

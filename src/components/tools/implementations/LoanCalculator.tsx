"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateLoan } from "@/lib/engines/finance";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, CreditCard } from "lucide-react";

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("250000");
  const [annualRate, setAnnualRate] = useState<string>("6.5");
  const [termYears, setTermYears] = useState<string>("30");

  let result: ReturnType<typeof calculateLoan> | null = null;
  try {
    const l = parseFloat(loanAmount);
    const r = parseFloat(annualRate);
    const y = parseFloat(termYears);

    if (!isNaN(l) && !isNaN(r) && !isNaN(y) && l > 0 && r >= 0 && y > 0) {
      result = calculateLoan(l, r, y);
    }
  } catch (e) {}

  const handleReset = () => {
    setLoanAmount("250000");
    setAnnualRate("6.5");
    setTermYears("30");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Loan Inputs */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>Loan & Mortgage Terms</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Loan Amount ($)"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="250000"
              prefixText="$"
            />
            <Input
              label="Annual Interest Rate (APR %)"
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="6.5"
              suffixText="%"
            />
            <Input
              label="Loan Term (Years)"
              type="number"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              placeholder="30"
              suffixText="Years"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-muted-foreground w-full font-medium">Common Terms:</span>
              {[
                { label: "30-Yr Mortgage", term: "30" },
                { label: "15-Yr Mortgage", term: "15" },
                { label: "5-Yr Auto", term: "5" },
                { label: "3-Yr Personal", term: "3" },
              ].map((preset) => (
                <Button
                  key={preset.label}
                  variant={termYears === preset.term ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setTermYears(preset.term)}
                  className="text-xs h-7 px-2.5"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Monthly Payment & Amortization */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Estimated Monthly Installment
            </div>
            <CardTitle className="text-3xl font-black">
              {result ? `${formatCurrency(result.monthlyPayment)} / mo` : "$0.00 / mo"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-xs text-muted-foreground font-semibold">Total Lifetime Payments</div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {formatCurrency(result.totalPayment)}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 space-y-0.5">
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">Total Interest Cost</div>
                    <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono">
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">
                    Amortization Preview (First 12 Months)
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-border rounded-lg text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-muted/60 text-muted-foreground border-b border-border sticky top-0">
                        <tr>
                          <th className="p-2">Month</th>
                          <th className="p-2">Principal</th>
                          <th className="p-2">Interest</th>
                          <th className="p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {result.schedule.slice(0, 12).map((row) => (
                          <tr key={row.period} className="hover:bg-muted/30">
                            <td className="p-2 font-medium">Month {row.period}</td>
                            <td className="p-2 font-mono text-emerald-600">+{formatCurrency(row.principalPaid)}</td>
                            <td className="p-2 font-mono text-rose-600">{formatCurrency(row.interestPaid)}</td>
                            <td className="p-2 font-mono">{formatCurrency(row.remainingBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <CopyButton
                  text={`Monthly Payment: ${formatCurrency(result.monthlyPayment)}, Total Loan Cost: ${formatCurrency(result.totalPayment)}, Total Interest: ${formatCurrency(result.totalInterest)}`}
                  label="Copy Loan Breakdown"
                  className="w-full"
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Loan Calculator – NexusTools" />
      </div>
    </div>
  );
}

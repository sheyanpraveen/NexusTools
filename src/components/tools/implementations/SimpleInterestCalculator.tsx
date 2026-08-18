"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateSimpleInterest } from "@/lib/engines/finance";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, Percent } from "lucide-react";

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("5");
  const [years, setYears] = useState<string>("3");

  let result: ReturnType<typeof calculateSimpleInterest> | null = null;
  try {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);
    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p >= 0 && r >= 0 && t >= 0) {
      result = calculateSimpleInterest(p, r, t);
    }
  } catch (e) {}

  const handleReset = () => {
    setPrincipal("10000");
    setRate("5");
    setYears("3");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Column */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Percent className="w-4 h-4 text-primary" />
              <span>Investment / Loan Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Starting Principal ($)"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
              prefixText="$"
            />
            <Input
              label="Annual Interest Rate (%)"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5"
              suffixText="%"
            />
            <Input
              label="Time Horizon (Years)"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="3"
              suffixText="Years"
            />
          </CardContent>
        </Card>

        {/* Right Output Column */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Accumulation Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 space-y-1">
                    <div className="text-xs text-primary font-semibold">Total Final Balance</div>
                    <div className="text-2xl font-black text-foreground font-mono">
                      {formatCurrency(result.finalBalance)}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-muted/50 border border-border space-y-1">
                    <div className="text-xs text-muted-foreground font-semibold">Total Interest Earned</div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      +{formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                </div>

                {result.annualBreakdown.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase">Year-by-Year Schedule</div>
                    <div className="max-h-36 overflow-y-auto border border-border rounded-lg text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-muted/60 text-muted-foreground border-b border-border sticky top-0">
                          <tr>
                            <th className="p-2">Year</th>
                            <th className="p-2">Interest</th>
                            <th className="p-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {result.annualBreakdown.map((row) => (
                            <tr key={row.year} className="hover:bg-muted/30">
                              <td className="p-2 font-medium">Year {row.year}</td>
                              <td className="p-2 text-emerald-600 font-mono">+{formatCurrency(row.interestEarned)}</td>
                              <td className="p-2 font-mono">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <CopyButton
                  text={`Principal: ${formatCurrency(parseFloat(principal) || 0)}, Interest: ${formatCurrency(result.totalInterest)}, Final Balance: ${formatCurrency(result.finalBalance)}`}
                  label="Copy Summary"
                  className="w-full"
                />
              </>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Enter valid positive numbers to view interest accumulation.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Simple Interest Calculator – NexusTools" />
      </div>
    </div>
  );
}

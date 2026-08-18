"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateCompoundInterest, CompoundFrequency } from "@/lib/engines/finance";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, TrendingUp } from "lucide-react";

export function CompoundInterestCalculator() {
  const [initialPrincipal, setInitialPrincipal] = useState<string>("5000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("200");
  const [annualRate, setAnnualRate] = useState<string>("8");
  const [years, setYears] = useState<string>("10");
  const [frequency, setFrequency] = useState<string>("12");

  let result: ReturnType<typeof calculateCompoundInterest> | null = null;
  try {
    const p = parseFloat(initialPrincipal);
    const m = monthlyContribution ? parseFloat(monthlyContribution) : 0;
    const r = parseFloat(annualRate);
    const y = parseFloat(years);
    const f = parseInt(frequency, 10) as CompoundFrequency;

    if (!isNaN(p) && !isNaN(r) && !isNaN(y) && p >= 0 && r >= 0 && y > 0) {
      result = calculateCompoundInterest(p, r, y, f, isNaN(m) ? 0 : m);
    }
  } catch (e) {}

  const handleReset = () => {
    setInitialPrincipal("5000");
    setMonthlyContribution("200");
    setAnnualRate("8");
    setYears("10");
    setFrequency("12");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>Investment Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            <Input
              label="Initial Principal ($)"
              type="number"
              value={initialPrincipal}
              onChange={(e) => setInitialPrincipal(e.target.value)}
              placeholder="5000"
              prefixText="$"
            />
            <Input
              label="Monthly Contribution ($)"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              placeholder="200"
              prefixText="$"
              hint="Recurring deposit added each month"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Annual Return (%)"
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="8"
                suffixText="%"
              />
              <Input
                label="Duration (Years)"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
              />
            </div>
            <Select
              label="Compounding Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              options={[
                { label: "Monthly (12/yr)", value: "12" },
                { label: "Quarterly (4/yr)", value: "4" },
                { label: "Annually (1/yr)", value: "1" },
                { label: "Daily (365/yr)", value: "365" },
              ]}
            />
          </CardContent>
        </Card>

        {/* Right Column: Growth Metrics & Schedule */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Projected Portfolio Growth
            </div>
            <CardTitle className="text-2xl font-black">
              {result ? formatCurrency(result.futureValue) : "$0.00"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Initial</div>
                    <div className="text-sm font-bold text-foreground font-mono truncate">
                      {formatCurrency(result.totalPrincipal)}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Contributions</div>
                    <div className="text-sm font-bold text-foreground font-mono truncate">
                      {formatCurrency(result.totalContributions)}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Interest Earned</div>
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono truncate">
                      +{formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                </div>

                {/* Growth Table */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">Yearly Breakdown Table</div>
                  <div className="max-h-44 overflow-y-auto border border-border rounded-lg text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-muted/60 text-muted-foreground border-b border-border sticky top-0">
                        <tr>
                          <th className="p-2">Year</th>
                          <th className="p-2">Deposited</th>
                          <th className="p-2">Interest</th>
                          <th className="p-2">End Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {result.schedule.map((row) => (
                          <tr key={row.year} className="hover:bg-muted/30">
                            <td className="p-2 font-medium">Year {row.year}</td>
                            <td className="p-2 font-mono">{formatCurrency(row.deposit)}</td>
                            <td className="p-2 font-mono text-emerald-600">+{formatCurrency(row.interest)}</td>
                            <td className="p-2 font-mono font-semibold">{formatCurrency(row.endBalance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <CopyButton
                  text={`Future Portfolio Value: ${formatCurrency(result.futureValue)} (Principal + Deposits: ${formatCurrency(result.totalPrincipal + result.totalContributions)}, Interest Earned: ${formatCurrency(result.totalInterest)})`}
                  label="Copy Growth Projection"
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
        <ShareButton title="Compound Interest Calculator – NexusTools" />
      </div>
    </div>
  );
}

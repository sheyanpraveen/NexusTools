"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculatePercentageIncrease, calculatePercentageChange } from "@/lib/engines/percentage";
import { RotateCcw, TrendingUp } from "lucide-react";

export function PercentageIncreaseCalculator() {
  const [baseValue, setBaseValue] = useState<string>("100");
  const [increasePercent, setIncreasePercent] = useState<string>("25");

  const [compareOld, setCompareOld] = useState<string>("50000");
  const [compareNew, setCompareNew] = useState<string>("65000");

  // Calculation 1: Add % to number
  let finalVal: number | null = null;
  let addedVal: number | null = null;
  try {
    const b = parseFloat(baseValue);
    const p = parseFloat(increasePercent);
    if (!isNaN(b) && !isNaN(p)) {
      const res = calculatePercentageIncrease(b, p);
      finalVal = res.newValue;
      addedVal = res.amountAdded;
    }
  } catch (e) {}

  // Calculation 2: Find % increase between 2 numbers
  let calculatedPercentInc: number | null = null;
  let rawDifference: number | null = null;
  try {
    const o = parseFloat(compareOld);
    const n = parseFloat(compareNew);
    if (!isNaN(o) && !isNaN(n) && o !== 0) {
      const res = calculatePercentageChange(o, n);
      calculatedPercentInc = res.percentageChange;
      rawDifference = res.difference;
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Increase a number by % */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Add Percentage to a Number</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                label="Base Amount"
                type="number"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                placeholder="100"
              />
              <Input
                label="Percentage to Add (%)"
                type="number"
                value={increasePercent}
                onChange={(e) => setIncreasePercent(e.target.value)}
                placeholder="25"
                suffixText="%"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1">
              <div className="text-xs text-muted-foreground">New Increased Value</div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {finalVal !== null ? finalVal.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"}
              </div>
              {addedVal !== null && (
                <div className="text-xs text-muted-foreground">
                  Amount Added: +{addedVal.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </div>
              )}
            </div>
            {finalVal !== null && <CopyButton text={finalVal.toString()} label="Copy Increased Value" className="w-full" />}
          </CardContent>
        </Card>

        {/* Panel 2: Calculate % increase between 2 numbers */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Find Percentage Rise Between 2 Values</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                label="Original Starting Value"
                type="number"
                value={compareOld}
                onChange={(e) => setCompareOld(e.target.value)}
                placeholder="50000"
              />
              <Input
                label="New Increased Value"
                type="number"
                value={compareNew}
                onChange={(e) => setCompareNew(e.target.value)}
                placeholder="65000"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1">
              <div className="text-xs text-muted-foreground">Percentage Growth</div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {calculatedPercentInc !== null ? `+${calculatedPercentInc.toFixed(2)}%` : "—"}
              </div>
              {rawDifference !== null && (
                <div className="text-xs text-muted-foreground">
                  Total Increase: +{rawDifference.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </div>
              )}
            </div>
            {calculatedPercentInc !== null && (
              <CopyButton text={`+${calculatedPercentInc.toFixed(2)}%`} label="Copy Growth Rate" className="w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setBaseValue("100");
            setIncreasePercent("25");
            setCompareOld("50000");
            setCompareNew("65000");
          }}
          className="text-muted-foreground gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Percentage Increase Calculator – NexusTools" />
      </div>
    </div>
  );
}

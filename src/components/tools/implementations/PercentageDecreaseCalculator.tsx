"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculatePercentageDecrease, calculatePercentageChange } from "@/lib/engines/percentage";
import { RotateCcw, TrendingDown } from "lucide-react";

export function PercentageDecreaseCalculator() {
  const [baseValue, setBaseValue] = useState<string>("100");
  const [decreasePercent, setDecreasePercent] = useState<string>("20");

  const [compareOld, setCompareOld] = useState<string>("80");
  const [compareNew, setCompareNew] = useState<string>("60");

  // Calculation 1: Subtract % from number
  let finalVal: number | null = null;
  let subbedVal: number | null = null;
  try {
    const b = parseFloat(baseValue);
    const p = parseFloat(decreasePercent);
    if (!isNaN(b) && !isNaN(p)) {
      const res = calculatePercentageDecrease(b, p);
      finalVal = res.newValue;
      subbedVal = res.amountSubtracted;
    }
  } catch (e) {}

  // Calculation 2: Find % decrease between 2 numbers
  let calculatedPercentDec: number | null = null;
  let rawDifference: number | null = null;
  try {
    const o = parseFloat(compareOld);
    const n = parseFloat(compareNew);
    if (!isNaN(o) && !isNaN(n) && o !== 0) {
      const res = calculatePercentageChange(o, n);
      calculatedPercentDec = Math.abs(res.percentageChange);
      rawDifference = Math.abs(res.difference);
    }
  } catch (e) {}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1 */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <span>Subtract Percentage from a Number</span>
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
                label="Percentage to Subtract (%)"
                type="number"
                value={decreasePercent}
                onChange={(e) => setDecreasePercent(e.target.value)}
                placeholder="20"
                suffixText="%"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1">
              <div className="text-xs text-muted-foreground">New Decreased Value</div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {finalVal !== null ? finalVal.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"}
              </div>
              {subbedVal !== null && (
                <div className="text-xs text-muted-foreground">
                  Amount Subtracted: -{subbedVal.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </div>
              )}
            </div>
            {finalVal !== null && <CopyButton text={finalVal.toString()} label="Copy Decreased Value" className="w-full" />}
          </CardContent>
        </Card>

        {/* Panel 2 */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <span>Find Percentage Drop Between 2 Values</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                label="Original Starting Value"
                type="number"
                value={compareOld}
                onChange={(e) => setCompareOld(e.target.value)}
                placeholder="80"
              />
              <Input
                label="New Decreased Value"
                type="number"
                value={compareNew}
                onChange={(e) => setCompareNew(e.target.value)}
                placeholder="60"
              />
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1">
              <div className="text-xs text-muted-foreground">Percentage Reduction</div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {calculatedPercentDec !== null ? `-${calculatedPercentDec.toFixed(2)}%` : "—"}
              </div>
              {rawDifference !== null && (
                <div className="text-xs text-muted-foreground">
                  Total Reduction: -{rawDifference.toLocaleString("en-US", { maximumFractionDigits: 4 })}
                </div>
              )}
            </div>
            {calculatedPercentDec !== null && (
              <CopyButton text={`-${calculatedPercentDec.toFixed(2)}%`} label="Copy Reduction Rate" className="w-full" />
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
            setDecreasePercent("20");
            setCompareOld("80");
            setCompareNew("60");
          }}
          className="text-muted-foreground gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Percentage Decrease Calculator – NexusTools" />
      </div>
    </div>
  );
}

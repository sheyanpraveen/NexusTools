"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculatePercentageOf, calculateWhatPercentage, calculatePercentageChange } from "@/lib/engines/percentage";
import { RotateCcw } from "lucide-react";

export function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1Percent, setM1Percent] = useState<string>("20");
  const [m1Total, setM1Total] = useState<string>("150");

  // Mode 2: X is what % of Y?
  const [m2Part, setM2Part] = useState<string>("45");
  const [m2Total, setM2Total] = useState<string>("180");

  // Mode 3: Percentage change from X to Y
  const [m3Old, setM3Old] = useState<string>("50");
  const [m3New, setM3New] = useState<string>("75");

  // Mode 1 Calculation
  let m1Result: number | null = null;
  let m1Formula = "";
  try {
    const p = parseFloat(m1Percent);
    const t = parseFloat(m1Total);
    if (!isNaN(p) && !isNaN(t)) {
      const res = calculatePercentageOf(p, t);
      m1Result = res.result;
      m1Formula = res.formulaString;
    }
  } catch (e) {}

  // Mode 2 Calculation
  let m2Result: number | null = null;
  let m2Formula = "";
  try {
    const part = parseFloat(m2Part);
    const tot = parseFloat(m2Total);
    if (!isNaN(part) && !isNaN(tot) && tot !== 0) {
      const res = calculateWhatPercentage(part, tot);
      m2Result = res.percentage;
      m2Formula = res.formulaString;
    }
  } catch (e) {}

  // Mode 3 Calculation
  let m3Change: number | null = null;
  let m3IsInc = true;
  let m3Diff: number | null = null;
  try {
    const oldV = parseFloat(m3Old);
    const newV = parseFloat(m3New);
    if (!isNaN(oldV) && !isNaN(newV) && oldV !== 0) {
      const res = calculatePercentageChange(oldV, newV);
      m3Change = res.percentageChange;
      m3IsInc = res.isIncrease;
      m3Diff = res.difference;
    }
  } catch (e) {}

  const handleReset = () => {
    setM1Percent("20");
    setM1Total("150");
    setM2Part("45");
    setM2Total("180");
    setM3Old("50");
    setM3New("75");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mode 1 Card */}
        <Card className="flex flex-col justify-between border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-primary">What is X% of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Percentage (%)"
                type="number"
                value={m1Percent}
                onChange={(e) => setM1Percent(e.target.value)}
                placeholder="20"
                suffixText="%"
              />
              <Input
                label="Total Value (Y)"
                type="number"
                value={m1Total}
                onChange={(e) => setM1Total(e.target.value)}
                placeholder="150"
              />
            </div>
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
              <div className="text-xs text-muted-foreground">Result</div>
              <div className="text-2xl font-black text-foreground font-mono">
                {m1Result !== null ? m1Result.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "—"}
              </div>
              {m1Formula && <div className="text-[11px] text-muted-foreground mt-1 font-mono">{m1Formula}</div>}
            </div>
            {m1Result !== null && <CopyButton text={m1Result.toString()} label="Copy Result" className="w-full" />}
          </CardContent>
        </Card>

        {/* Mode 2 Card */}
        <Card className="flex flex-col justify-between border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-primary">X is what % of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Part Value (X)"
                type="number"
                value={m2Part}
                onChange={(e) => setM2Part(e.target.value)}
                placeholder="45"
              />
              <Input
                label="Total Value (Y)"
                type="number"
                value={m2Total}
                onChange={(e) => setM2Total(e.target.value)}
                placeholder="180"
              />
            </div>
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
              <div className="text-xs text-muted-foreground">Percentage</div>
              <div className="text-2xl font-black text-foreground font-mono">
                {m2Result !== null ? `${m2Result.toLocaleString("en-US", { maximumFractionDigits: 4 })}%` : "—"}
              </div>
              {m2Formula && <div className="text-[11px] text-muted-foreground mt-1 font-mono">{m2Formula}</div>}
            </div>
            {m2Result !== null && <CopyButton text={`${m2Result}%`} label="Copy Percentage" className="w-full" />}
          </CardContent>
        </Card>

        {/* Mode 3 Card */}
        <Card className="flex flex-col justify-between border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-primary">Percentage Change</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Initial (Old)"
                type="number"
                value={m3Old}
                onChange={(e) => setM3Old(e.target.value)}
                placeholder="50"
              />
              <Input
                label="Final (New)"
                type="number"
                value={m3New}
                onChange={(e) => setM3New(e.target.value)}
                placeholder="75"
              />
            </div>
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
              <div className="text-xs text-muted-foreground">Percentage Change</div>
              <div
                className={`text-2xl font-black font-mono ${
                  m3Change !== null && m3Change >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {m3Change !== null ? `${m3Change >= 0 ? "+" : ""}${m3Change.toFixed(2)}%` : "—"}
              </div>
              {m3Diff !== null && (
                <div className="text-[11px] text-muted-foreground mt-1">
                  Difference: {m3Diff >= 0 ? "+" : ""}{m3Diff} ({m3IsInc ? "Increase" : "Decrease"})
                </div>
              )}
            </div>
            {m3Change !== null && <CopyButton text={`${m3Change.toFixed(2)}%`} label="Copy Change" className="w-full" />}
          </CardContent>
        </Card>
      </div>

      {/* Global Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </Button>
        <ShareButton title="Percentage Calculator – NexusTools" />
      </div>
    </div>
  );
}

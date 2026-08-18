"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { simplifyRatio, solveRatioProportion } from "@/lib/engines/math";
import { RotateCcw, Sliders } from "lucide-react";

export function RatioCalculator() {
  // Simplifier mode state
  const [simpA, setSimpA] = useState<string>("1920");
  const [simpB, setSimpB] = useState<string>("1080");

  // Proportion solver state: A / B = C / D
  const [solvA, setSolvA] = useState<string>("3");
  const [solvB, setSolvB] = useState<string>("4");
  const [solvC, setSolvC] = useState<string>("");
  const [solvD, setSolvD] = useState<string>("12");

  // Simplify calculation
  let simplified: ReturnType<typeof simplifyRatio> | null = null;
  try {
    const a = parseFloat(simpA);
    const b = parseFloat(simpB);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      simplified = simplifyRatio(a, b);
    }
  } catch (e) {}

  // Proportion solver calculation
  let solvedResult: ReturnType<typeof solveRatioProportion> | null = null;
  let proportionError = "";
  try {
    const a = solvA !== "" ? parseFloat(solvA) : null;
    const b = solvB !== "" ? parseFloat(solvB) : null;
    const c = solvC !== "" ? parseFloat(solvC) : null;
    const d = solvD !== "" ? parseFloat(solvD) : null;

    const nullCount = [a, b, c, d].filter((x) => x === null).length;
    if (nullCount === 1) {
      solvedResult = solveRatioProportion(a, b, c, d);
    } else {
      proportionError = "Leave exactly 1 box empty to solve for that variable.";
    }
  } catch (err: any) {
    proportionError = err.message;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Simplify Ratio */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Simplify Ratio (A : B)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 items-center">
              <Input
                label="Antecedent (A)"
                type="number"
                value={simpA}
                onChange={(e) => setSimpA(e.target.value)}
                placeholder="1920"
              />
              <Input
                label="Consequent (B)"
                type="number"
                value={simpB}
                onChange={(e) => setSimpB(e.target.value)}
                placeholder="1080"
              />
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5">
              <div className="text-xs text-muted-foreground">Simplified Ratio</div>
              <div className="text-3xl font-black text-primary font-mono">
                {simplified ? simplified.simplifiedString : "—"}
              </div>
              {simplified && (
                <div className="text-xs text-muted-foreground space-y-0.5 pt-1 border-t border-border">
                  <div>Decimal equivalent: <strong className="text-foreground">{simplified.decimalEquivalent.toFixed(4)}</strong></div>
                  <div>Percentage equivalent: <strong className="text-foreground">{simplified.percentageEquivalent.toFixed(2)}%</strong></div>
                </div>
              )}
            </div>

            {simplified && (
              <CopyButton text={simplified.simplifiedString} label="Copy Simplified Ratio" className="w-full" />
            )}
          </CardContent>
        </Card>

        {/* Panel 2: Solve Proportion */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <span>Solve Proportion (A:B = C:D)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 items-center">
              <Input
                label="A"
                type="number"
                value={solvA}
                onChange={(e) => setSolvA(e.target.value)}
                placeholder="A"
              />
              <Input
                label="B"
                type="number"
                value={solvB}
                onChange={(e) => setSolvB(e.target.value)}
                placeholder="B"
              />
              <Input
                label="C (leave empty to solve)"
                type="number"
                value={solvC}
                onChange={(e) => setSolvC(e.target.value)}
                placeholder="C"
              />
              <Input
                label="D"
                type="number"
                value={solvD}
                onChange={(e) => setSolvD(e.target.value)}
                placeholder="D"
              />
            </div>

            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1">
              <div className="text-xs text-muted-foreground">Solved Variable</div>
              {solvedResult ? (
                <div>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {solvedResult.solvedVariable} = {solvedResult.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{solvedResult.explanation}</div>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground py-2">{proportionError || "Leave 1 box empty"}</div>
              )}
            </div>

            {solvedResult && (
              <CopyButton
                text={`${solvedResult.solvedVariable} = ${solvedResult.value}`}
                label="Copy Solved Value"
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSimpA("1920");
            setSimpB("1080");
            setSolvA("3");
            setSolvB("4");
            setSolvC("");
            setSolvD("12");
          }}
          className="text-muted-foreground gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Ratio Calculator – NexusTools" />
      </div>
    </div>
  );
}

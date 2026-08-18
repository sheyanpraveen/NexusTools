"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateAverage, parseNumberList } from "@/lib/engines/math";
import { RotateCcw, BarChart2 } from "lucide-react";

export function AverageCalculator() {
  const [inputRaw, setInputRaw] = useState<string>("85, 90, 75, 90, 100, 68, 92");

  let parsedNumbers: number[] = [];
  let errorMsg = "";
  let stats: ReturnType<typeof calculateAverage> | null = null;

  try {
    parsedNumbers = parseNumberList(inputRaw);
    if (parsedNumbers.length > 0) {
      stats = calculateAverage(parsedNumbers);
    }
  } catch (err: any) {
    errorMsg = err.message || "Invalid numbers in list";
  }

  const handleReset = () => {
    setInputRaw("85, 90, 75, 90, 100, 68, 92");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Number List Input */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-primary" />
              <span>Enter Dataset</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="numbers-input" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Numbers (separated by commas, spaces, or newlines)
              </label>
              <textarea
                id="numbers-input"
                rows={6}
                value={inputRaw}
                onChange={(e) => setInputRaw(e.target.value)}
                placeholder="10, 20, 30, 40..."
                className="w-full rounded-lg border border-input bg-background p-3 text-sm font-mono text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
              {errorMsg && <p className="text-xs text-destructive font-medium">{errorMsg}</p>}
            </div>

            {/* Quick Sample Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-muted-foreground font-medium">Try samples:</span>
              <button
                type="button"
                onClick={() => setInputRaw("85, 90, 75, 90, 100")}
                className="text-primary hover:underline"
              >
                Grades
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setInputRaw("1200, 1500, 1100, 2400, 1800, 1350")}
                className="text-primary hover:underline"
              >
                Monthly Sales
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setInputRaw("72, 68, 75, 80, 85, 78, 70")}
                className="text-primary hover:underline"
              >
                Weekly Temps
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Key Statistics Matrix */}
        <Card className="lg:col-span-6 bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Statistical Results</CardTitle>
              {stats && <span className="text-xs text-muted-foreground">{stats.count} numbers analyzed</span>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 space-y-0.5">
                    <div className="text-[11px] font-semibold text-primary uppercase">Mean (Average)</div>
                    <div className="text-xl font-black text-foreground font-mono">{stats.mean}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Median</div>
                    <div className="text-xl font-black text-foreground font-mono">{stats.median}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Mode</div>
                    <div className="text-base font-black text-foreground font-mono truncate">
                      {stats.mode.length > 0 ? stats.mode.join(", ") : "None"}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Range</div>
                    <div className="text-base font-bold text-foreground font-mono">{stats.range}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Sum</div>
                    <div className="text-base font-bold text-foreground font-mono">{stats.sum}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase">Std Dev (σ)</div>
                    <div className="text-base font-bold text-foreground font-mono">{stats.standardDeviation}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30 border border-border text-xs flex items-center justify-between text-muted-foreground">
                  <span>Lowest: <strong className="text-foreground">{stats.min}</strong></span>
                  <span>Highest: <strong className="text-foreground">{stats.max}</strong></span>
                  <span>Variance: <strong className="text-foreground">{stats.variance}</strong></span>
                </div>

                <CopyButton
                  text={`Mean: ${stats.mean}, Median: ${stats.median}, Mode: ${stats.mode.join(",") || "None"}, Range: ${stats.range}, Sum: ${stats.sum}`}
                  label="Copy All Statistics"
                  className="w-full"
                />
              </>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Enter numbers in the dataset to view statistical metrics.
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
        <ShareButton title="Average Calculator – NexusTools" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateDateDifference } from "@/lib/engines/datetime";
import { RotateCcw, CalendarRange } from "lucide-react";

export function DateDifferenceCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);

  let result: ReturnType<typeof calculateDateDifference> | null = null;
  try {
    if (startDate && endDate) {
      result = calculateDateDifference(startDate, endDate, includeEndDay);
    }
  } catch (e) {}

  const handleReset = () => {
    setStartDate(today);
    setEndDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
    setIncludeEndDay(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-primary" />
              <span>Calendar Range</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={includeEndDay}
                onChange={(e) => setIncludeEndDay(e.target.checked)}
                className="rounded border-input text-primary focus:ring-primary h-4 w-4"
              />
              <span>Include End Date in Calculation (+1 day)</span>
            </label>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Total Duration
            </div>
            <CardTitle className="text-3xl font-black font-mono">
              {result ? `${result.totalDays} Total Days` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">
                      Business Days
                    </div>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {result.businessDays}
                    </div>
                    <div className="text-[10px] text-muted-foreground">Mon–Fri</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">
                      Weekend Days
                    </div>
                    <div className="text-xl font-black text-foreground font-mono">
                      {result.weekendDays}
                    </div>
                    <div className="text-[10px] text-muted-foreground">Sat–Sun</div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">
                      Full Weeks
                    </div>
                    <div className="text-xl font-black text-foreground font-mono">
                      {result.weeks}
                    </div>
                    <div className="text-[10px] text-muted-foreground">7-day cycles</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-xs flex justify-between text-muted-foreground">
                  <span>Months: <strong className="text-foreground">{result.months}</strong></span>
                  <span>Years: <strong className="text-foreground">{result.years}</strong></span>
                </div>

                <CopyButton
                  text={`Date Difference: ${result.totalDays} days (${result.businessDays} business days, ${result.weekendDays} weekend days, ${result.weeks} weeks)`}
                  label="Copy Duration Summary"
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
        <ShareButton title="Date Difference Calculator – NexusTools" />
      </div>
    </div>
  );
}

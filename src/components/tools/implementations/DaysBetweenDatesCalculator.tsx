"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateDateDifference } from "@/lib/engines/datetime";
import { RotateCcw, CalendarDays } from "lucide-react";

export function DaysBetweenDatesCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );

  let result: ReturnType<typeof calculateDateDifference> | null = null;
  try {
    if (startDate && endDate) {
      result = calculateDateDifference(startDate, endDate, false);
    }
  } catch (e) {}

  const handleReset = () => {
    setStartDate(today);
    setEndDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span>Select Date Span</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="From Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="To Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card className="flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Days Count
            </div>
            <CardTitle className="text-4xl font-black font-mono">
              {result ? `${result.totalDays} Days` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1 text-xs text-muted-foreground">
                  <div>Equivalent to: <strong className="text-foreground">{result.weeks} weeks and {result.totalDays % 7} days</strong></div>
                  <div>Percentage of standard year: <strong className="text-foreground">{((result.totalDays / 365) * 100).toFixed(1)}%</strong></div>
                </div>

                <CopyButton
                  text={`${result.totalDays} days (${result.weeks} weeks)`}
                  label="Copy Days Count"
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
        <ShareButton title="Days Between Dates – NexusTools" />
      </div>
    </div>
  );
}

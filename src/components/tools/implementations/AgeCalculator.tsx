"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateAge } from "@/lib/engines/datetime";
import { RotateCcw, Calendar, Cake } from "lucide-react";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("2000-01-15");
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split("T")[0]);

  let result: ReturnType<typeof calculateAge> | null = null;
  let errorMsg = "";

  try {
    if (birthDate) {
      result = calculateAge(birthDate, targetDate || new Date());
    }
  } catch (err: any) {
    errorMsg = err.message || "Invalid dates";
  }

  const handleReset = () => {
    setBirthDate("2000-01-15");
    setTargetDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Date Inputs */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Select Date Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Date of Birth"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              error={errorMsg}
            />
            <Input
              label="Calculate Age At Date"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              hint="Defaults to current day"
            />
            {result && (
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-xs space-y-1 text-muted-foreground">
                <div>Born on a: <strong className="text-foreground">{result.dayOfWeekBorn}</strong></div>
                <div className="flex items-center gap-1.5 text-primary font-medium">
                  <Cake className="w-3.5 h-3.5 shrink-0" />
                  <span>Next birthday in: <strong>{result.nextBirthdayDays} days</strong></span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Age Breakdown Cards */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Exact Chronological Age
            </div>
            <CardTitle className="text-3xl font-black text-foreground">
              {result ? `${result.years} Years, ${result.months} Months, ${result.days} Days` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Total Months</div>
                    <div className="text-base font-black text-foreground font-mono">
                      {(result.years * 12 + result.months).toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Total Weeks</div>
                    <div className="text-base font-black text-foreground font-mono">
                      {result.totalWeeks.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Total Days</div>
                    <div className="text-base font-black text-foreground font-mono">
                      {result.totalDays.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Total Hours</div>
                    <div className="text-base font-black text-foreground font-mono truncate">
                      {result.totalHours.toLocaleString()}
                    </div>
                  </div>
                </div>

                <CopyButton
                  text={`Age: ${result.years} years, ${result.months} months, ${result.days} days (${result.totalDays.toLocaleString()} total days)`}
                  label="Copy Exact Age"
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
        <ShareButton title="Age Calculator – NexusTools" />
      </div>
    </div>
  );
}

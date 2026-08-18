"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { RotateCcw, Globe } from "lucide-react";

export function TimezoneConverter() {
  const [dateTime, setDateTime] = useState<string>("2026-06-15T09:00");
  const [sourceTz, setSourceTz] = useState<string>("America/New_York");
  const [targetTz, setTargetTz] = useState<string>("Europe/London");

  const timezoneOptions = [
    { label: "New York (EDT/EST, UTC-4/5)", value: "America/New_York" },
    { label: "Los Angeles (PDT/PST, UTC-7/8)", value: "America/Los_Angeles" },
    { label: "Chicago (CDT/CST, UTC-5/6)", value: "America/Chicago" },
    { label: "London (BST/GMT, UTC+1/0)", value: "Europe/London" },
    { label: "Paris / Berlin (CEST/CET, UTC+2/1)", value: "Europe/Paris" },
    { label: "Dubai (GST, UTC+4)", value: "Asia/Dubai" },
    { label: "India (IST, UTC+5:30)", value: "Asia/Kolkata" },
    { label: "Singapore / Hong Kong (SGT/HKT, UTC+8)", value: "Asia/Singapore" },
    { label: "Tokyo (JST, UTC+9)", value: "Asia/Tokyo" },
    { label: "Sydney (AEST/AEDT, UTC+10/11)", value: "Australia/Sydney" },
    { label: "UTC (Coordinated Universal Time)", value: "UTC" },
  ];

  let convertedString = "";
  let sourceString = "";
  try {
    if (dateTime) {
      const d = new Date(dateTime);
      if (!isNaN(d.getTime())) {
        sourceString = new Intl.DateTimeFormat("en-US", {
          timeZone: sourceTz,
          dateStyle: "full",
          timeStyle: "long",
        }).format(d);

        convertedString = new Intl.DateTimeFormat("en-US", {
          timeZone: targetTz,
          dateStyle: "full",
          timeStyle: "long",
        }).format(d);
      }
    }
  } catch (e) {}

  const handleReset = () => {
    setDateTime("2026-06-15T09:00");
    setSourceTz("America/New_York");
    setTargetTz("Europe/London");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Selection */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Time & Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Date and Time"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
            <Select
              label="Source Timezone"
              value={sourceTz}
              onChange={(e) => setSourceTz(e.target.value)}
              options={timezoneOptions}
            />
            <Select
              label="Target Destination Timezone"
              value={targetTz}
              onChange={(e) => setTargetTz(e.target.value)}
              options={timezoneOptions}
            />
          </CardContent>
        </Card>

        {/* Right Column: Output */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Converted Time in Target Zone
            </div>
            <CardTitle className="text-xl font-bold text-foreground">
              {convertedString || "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {convertedString && (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1 text-xs text-muted-foreground">
                  <div>Source Location: <strong className="text-foreground">{sourceString}</strong></div>
                  <div>Destination Location: <strong className="text-foreground">{convertedString}</strong></div>
                </div>

                <CopyButton
                  text={`${sourceString} = ${convertedString}`}
                  label="Copy Converted Time"
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
        <ShareButton title="Timezone Converter – NexusTools" />
      </div>
    </div>
  );
}

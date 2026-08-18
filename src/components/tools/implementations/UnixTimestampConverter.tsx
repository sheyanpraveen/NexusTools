"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { parseUnixTimestamp } from "@/lib/engines/datetime";
import { RotateCcw, Clock, Play, Pause } from "lucide-react";

export function UnixTimestampConverter() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [isTicking, setIsTicking] = useState<boolean>(true);
  const [inputTs, setInputTs] = useState<string>(Math.floor(Date.now() / 1000).toString());

  // Live ticking clock
  useEffect(() => {
    if (!isTicking) return;
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTicking]);

  let parsed: ReturnType<typeof parseUnixTimestamp> | null = null;
  let errorMsg = "";
  try {
    if (inputTs.trim()) {
      parsed = parseUnixTimestamp(inputTs);
    }
  } catch (err: any) {
    errorMsg = err.message || "Invalid timestamp";
  }

  const handleUseCurrent = () => {
    setInputTs(currentEpoch.toString());
  };

  const handleReset = () => {
    setInputTs(Math.floor(Date.now() / 1000).toString());
  };

  return (
    <div className="space-y-6">
      {/* Live Current Epoch Banner */}
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase">Current Unix Epoch Time</div>
            <div className="text-2xl font-black font-mono text-foreground">{currentEpoch}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsTicking(!isTicking)}
            className="text-xs"
          >
            {isTicking ? <Pause className="w-3.5 h-3.5 mr-1 text-amber-500" /> : <Play className="w-3.5 h-3.5 mr-1 text-emerald-500" />}
            <span>{isTicking ? "Pause" : "Resume"}</span>
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleUseCurrent}
            className="text-xs"
          >
            Use Current
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Input Timestamp</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Unix Timestamp (Seconds or ms)"
              type="text"
              value={inputTs}
              onChange={(e) => setInputTs(e.target.value)}
              placeholder="1700000000"
              error={errorMsg}
              hint="Supports 10-digit seconds and 13-digit milliseconds"
            />
          </CardContent>
        </Card>

        {/* Right Column: Decoded Formats */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Decoded Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {parsed ? (
              <>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">ISO 8601 (UTC)</span>
                      <span className="font-mono font-bold text-foreground text-sm">{parsed.isoUTC}</span>
                    </div>
                    <CopyButton text={parsed.isoUTC} size="sm" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">RFC 2822 (GMT)</span>
                      <span className="font-mono font-bold text-foreground text-sm">{parsed.rfc2822}</span>
                    </div>
                    <CopyButton text={parsed.rfc2822} size="sm" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Local Timezone</span>
                      <span className="font-mono font-bold text-foreground text-sm">{parsed.localString}</span>
                    </div>
                    <CopyButton text={parsed.localString} size="sm" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Relative Time</span>
                      <span className="font-mono font-bold text-primary text-sm">{parsed.relativeTime}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Enter a numeric timestamp to view decoded dates.
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
        <ShareButton title="Unix Timestamp Converter – NexusTools" />
      </div>
    </div>
  );
}

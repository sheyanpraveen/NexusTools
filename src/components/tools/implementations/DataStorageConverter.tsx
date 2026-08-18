"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { convertData, DATA_UNITS } from "@/lib/engines/converters";
import { RotateCcw, ArrowRightLeft, HardDrive } from "lucide-react";

export function DataStorageConverter() {
  const [value, setValue] = useState<string>("1024");
  const [fromUnit, setFromUnit] = useState<string>("mb");
  const [toUnit, setToUnit] = useState<string>("gb");
  const [isBinary, setIsBinary] = useState<boolean>(true); // Binary (1024) vs Decimal (1000)

  let result: ReturnType<typeof convertData> | null = null;
  try {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      result = convertData(val, fromUnit, toUnit, isBinary);
    }
  } catch (e) {}

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setValue("1024");
    setFromUnit("mb");
    setToUnit("gb");
    setIsBinary(true);
  };

  const unitOptions = Object.values(DATA_UNITS).map((u) => ({
    label: `${u.name} (${u.symbol})`,
    value: u.id,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-primary" />
              <span>Digital File & Memory Size</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Enter Digital Size"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="1024"
            />
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-end">
              <div className="sm:col-span-5">
                <Select
                  label="From Unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  options={unitOptions}
                />
              </div>
              <div className="sm:col-span-1 flex justify-center pb-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  title="Swap Units"
                  aria-label="Swap Units"
                  className="h-10 w-10 shrink-0"
                >
                  <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="sm:col-span-5">
                <Select
                  label="To Unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  options={unitOptions}
                />
              </div>
            </div>

            {/* Base Toggle */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-muted-foreground mb-1.5">Calculation Base:</div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={isBinary ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsBinary(true)}
                  className="text-xs"
                >
                  Binary Base (1024 B = 1 KiB)
                </Button>
                <Button
                  type="button"
                  variant={!isBinary ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setIsBinary(false)}
                  className="text-xs"
                >
                  Decimal Base (1000 B = 1 KB)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Result Card */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Converted Storage Capacity
            </div>
            <CardTitle className="text-3xl font-black font-mono">
              {result ? `${result.toValue.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${result.toUnit}` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1 text-xs">
                  <div className="text-muted-foreground font-medium">Conversion Multiplier:</div>
                  <div className="font-mono text-foreground font-semibold">{result.formula}</div>
                </div>

                <CopyButton
                  text={result.formattedResult}
                  label="Copy Converted Storage"
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
        <ShareButton title="Data Storage Converter – NexusTools" />
      </div>
    </div>
  );
}

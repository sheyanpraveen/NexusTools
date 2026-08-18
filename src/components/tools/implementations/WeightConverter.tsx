"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { convertWeight, WEIGHT_UNITS } from "@/lib/engines/converters";
import { RotateCcw, ArrowRightLeft, Scale } from "lucide-react";

export function WeightConverter() {
  const [value, setValue] = useState<string>("70");
  const [fromUnit, setFromUnit] = useState<string>("kg");
  const [toUnit, setToUnit] = useState<string>("lb");

  let result: ReturnType<typeof convertWeight> | null = null;
  try {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      result = convertWeight(val, fromUnit, toUnit);
    }
  } catch (e) {}

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setValue("70");
    setFromUnit("kg");
    setToUnit("lb");
  };

  const unitOptions = Object.values(WEIGHT_UNITS).map((u) => ({
    label: `${u.name} (${u.symbol})`,
    value: u.id,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              <span>Weight & Mass Conversion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Enter Weight"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="70"
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
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-xs text-muted-foreground w-full font-medium">Quick Pairs:</span>
              {[
                { label: "KG → LB", from: "kg", to: "lb" },
                { label: "LB → KG", from: "lb", to: "kg" },
                { label: "Grams → Ounces", from: "g", to: "oz" },
                { label: "Ounces → Grams", from: "oz", to: "g" },
              ].map((pair) => (
                <Button
                  key={pair.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFromUnit(pair.from);
                    setToUnit(pair.to);
                  }}
                  className="text-xs h-7 px-2"
                >
                  {pair.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Result Card */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Converted Result
            </div>
            <CardTitle className="text-3xl font-black font-mono">
              {result ? `${result.toValue.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${result.toUnit}` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1 text-xs">
                  <div className="text-muted-foreground font-medium">Conversion Constant:</div>
                  <div className="font-mono text-foreground font-semibold">{result.formula}</div>
                </div>

                <CopyButton
                  text={result.formattedResult}
                  label="Copy Converted Weight"
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
        <ShareButton title="Weight Converter – NexusTools" />
      </div>
    </div>
  );
}

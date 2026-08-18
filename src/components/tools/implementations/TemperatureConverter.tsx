"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { convertTemperature } from "@/lib/engines/converters";
import { RotateCcw, ArrowRightLeft, Thermometer } from "lucide-react";

export function TemperatureConverter() {
  const [value, setValue] = useState<string>("100");
  const [fromUnit, setFromUnit] = useState<"c" | "f" | "k">("c");
  const [toUnit, setToUnit] = useState<"c" | "f" | "k">("f");

  let result: ReturnType<typeof convertTemperature> | null = null;
  let errorMsg = "";
  try {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      result = convertTemperature(val, fromUnit, toUnit);
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setValue("100");
    setFromUnit("c");
    setToUnit("f");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-primary" />
              <span>Temperature Input</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Temperature Degree"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="100"
              error={errorMsg}
            />
            <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-end">
              <div className="sm:col-span-5">
                <Select
                  label="From Scale"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as any)}
                  options={[
                    { label: "Celsius (°C)", value: "c" },
                    { label: "Fahrenheit (°F)", value: "f" },
                    { label: "Kelvin (K)", value: "k" },
                  ]}
                />
              </div>
              <div className="sm:col-span-1 flex justify-center pb-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  title="Swap Scales"
                  aria-label="Swap Scales"
                  className="h-10 w-10 shrink-0"
                >
                  <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="sm:col-span-5">
                <Select
                  label="To Scale"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as any)}
                  options={[
                    { label: "Celsius (°C)", value: "c" },
                    { label: "Fahrenheit (°F)", value: "f" },
                    { label: "Kelvin (K)", value: "k" },
                  ]}
                />
              </div>
            </div>
            {/* Quick Points */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-xs text-muted-foreground w-full font-medium">Common Reference Points:</span>
              {[
                { label: "Water Freezing (0°C)", val: "0", from: "c", to: "f" },
                { label: "Water Boiling (100°C)", val: "100", from: "c", to: "f" },
                { label: "Body Temp (98.6°F)", val: "98.6", from: "f", to: "c" },
                { label: "Absolute Zero (0 K)", val: "0", from: "k", to: "c" },
              ].map((ref) => (
                <Button
                  key={ref.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setValue(ref.val);
                    setFromUnit(ref.from as any);
                    setToUnit(ref.to as any);
                  }}
                  className="text-xs h-7 px-2"
                >
                  {ref.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Result Card */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Converted Temperature
            </div>
            <CardTitle className="text-3xl font-black font-mono">
              {result ? `${result.toValue.toFixed(2)} ${result.toUnit}` : "—"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1 text-xs">
                  <div className="text-muted-foreground font-medium">Mathematical Formula:</div>
                  <div className="font-mono text-foreground font-semibold">{result.formula}</div>
                </div>

                <CopyButton
                  text={result.formattedResult}
                  label="Copy Temperature"
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
        <ShareButton title="Temperature Converter – NexusTools" />
      </div>
    </div>
  );
}

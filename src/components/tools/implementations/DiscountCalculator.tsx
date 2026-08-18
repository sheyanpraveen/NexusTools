"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateDiscount } from "@/lib/engines/percentage";
import { formatCurrency } from "@/lib/utils";
import { RotateCcw, Tag } from "lucide-react";

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>("120");
  const [primaryDiscount, setPrimaryDiscount] = useState<string>("30");
  const [extraDiscount, setExtraDiscount] = useState<string>("10");

  let finalPrice: number | null = null;
  let amountSaved: number | null = null;
  let effectivePercent: number | null = null;

  try {
    const p = parseFloat(originalPrice);
    const d1 = parseFloat(primaryDiscount);
    const d2 = extraDiscount ? parseFloat(extraDiscount) : 0;

    if (!isNaN(p) && !isNaN(d1) && p >= 0) {
      const res = calculateDiscount(p, d1, isNaN(d2) ? 0 : d2);
      finalPrice = res.finalPrice;
      amountSaved = res.amountSaved;
      effectivePercent = res.effectiveDiscountPercent;
    }
  } catch (e) {}

  const handleReset = () => {
    setOriginalPrice("120");
    setPrimaryDiscount("30");
    setExtraDiscount("10");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Controls */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span>Discount & Sale Inputs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Original Retail Price ($)"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="120"
              prefixText="$"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Primary Discount (%)"
                type="number"
                value={primaryDiscount}
                onChange={(e) => setPrimaryDiscount(e.target.value)}
                placeholder="30"
                suffixText="%"
              />
              <Input
                label="Extra Coupon / Stacked (%)"
                type="number"
                value={extraDiscount}
                onChange={(e) => setExtraDiscount(e.target.value)}
                placeholder="10"
                suffixText="%"
                hint="Optional additional promo code"
              />
            </div>
            {/* Quick Discount Presets */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-muted-foreground mb-2">Quick Presets</div>
              <div className="flex flex-wrap gap-2">
                {[10, 15, 20, 25, 30, 40, 50, 70].map((preset) => (
                  <Button
                    key={preset}
                    variant={primaryDiscount === preset.toString() ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setPrimaryDiscount(preset.toString())}
                    className="text-xs h-7 px-2.5"
                  >
                    {preset}% Off
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Calculated Savings Card */}
        <Card className="lg:col-span-5 flex flex-col justify-between bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Checkout Summary
            </div>
            <CardTitle className="text-xl font-bold">Final Sale Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-4xl font-black text-foreground font-mono">
                {finalPrice !== null ? formatCurrency(finalPrice) : "$0.00"}
              </div>
              <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                You Save {amountSaved !== null ? formatCurrency(amountSaved) : "$0.00"} ({effectivePercent !== null ? effectivePercent.toFixed(1) : 0}% total off)
              </div>
            </div>

            <div className="p-3 rounded-lg bg-background border border-border/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Original Price:</span>
                <span className="font-mono line-through">
                  {originalPrice ? formatCurrency(parseFloat(originalPrice) || 0) : "$0.00"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Savings:</span>
                <span className="font-mono text-emerald-600 font-semibold">
                  -{amountSaved !== null ? formatCurrency(amountSaved) : "$0.00"}
                </span>
              </div>
              <div className="border-t border-border pt-1.5 flex justify-between font-bold text-foreground">
                <span>Final Price:</span>
                <span className="font-mono">{finalPrice !== null ? formatCurrency(finalPrice) : "$0.00"}</span>
              </div>
            </div>

            {finalPrice !== null && (
              <CopyButton
                text={`Final Price: ${formatCurrency(finalPrice)} (Saved ${formatCurrency(amountSaved || 0)})`}
                label="Copy Summary"
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Discount Calculator – NexusTools" />
      </div>
    </div>
  );
}

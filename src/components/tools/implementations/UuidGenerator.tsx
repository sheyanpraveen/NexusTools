"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { generateUUIDv4 } from "@/lib/engines/crypto";
import { RotateCcw, Key, RefreshCw, ShieldCheck } from "lucide-react";

export function UuidGenerator() {
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = (count = quantity) => {
    const list: string[] = [];
    const validCount = Math.max(1, Math.min(50, count));
    for (let i = 0; i < validCount; i++) {
      let id = generateUUIDv4();
      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, "");
      list.push(id);
    }
    setUuids(list);
  };

  // Generate initial batch on mount
  useState(() => {
    handleGenerate(5);
  });

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>Cryptographically Secure: Generated locally via Web Cryptography API with true pseudo-random entropy.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Controls */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" />
              <span>Generation Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Quantity to Generate (1 to 50)"
              type="number"
              min={1}
              max={50}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            />

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Uppercase Characters (A-F)</span>
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeHyphens}
                  onChange={(e) => setRemoveHyphens(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Remove Hyphens (32 hex characters)</span>
              </label>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => handleGenerate(quantity)}
              className="w-full gap-2 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate New UUIDs</span>
            </Button>
          </CardContent>
        </Card>

        {/* Right Column: Generated UUIDs List */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Generated UUID v4 List</CardTitle>
              <span className="text-xs text-muted-foreground">{uuids.length} generated</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-[280px] overflow-y-auto space-y-1.5 p-1">
              {uuids.map((id, index) => (
                <div
                  key={index}
                  className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between font-mono text-xs text-foreground group"
                >
                  <span className="truncate mr-2 select-all">{id}</span>
                  <CopyButton text={id} size="sm" variant="ghost" className="h-7 px-2 shrink-0" />
                </div>
              ))}
            </div>

            <CopyButton
              text={uuids.join("\n")}
              label="Copy All UUIDs"
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={() => handleGenerate(5)} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Regenerate</span>
        </Button>
        <ShareButton title="UUID Generator – NexusTools" />
      </div>
    </div>
  );
}

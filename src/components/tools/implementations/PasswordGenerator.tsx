"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { generatePassword, PasswordOptions } from "@/lib/engines/crypto";
import { RotateCcw, Shield, RefreshCw, ShieldCheck, Check } from "lucide-react";

export function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeLookalike: false,
  });

  const [result, setResult] = useState(() => generatePassword(options));

  const handleGenerate = (currentOpts = options) => {
    setResult(generatePassword(currentOpts));
  };

  const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    const updated = { ...options, [key]: value };
    setOptions(updated);
    handleGenerate(updated);
  };

  const strengthColors = {
    "Very Strong": "bg-emerald-500 text-emerald-500",
    Strong: "bg-emerald-500 text-emerald-500",
    Moderate: "bg-amber-500 text-amber-500",
    Weak: "bg-rose-500 text-rose-500",
    "Very Weak": "bg-rose-600 text-rose-600",
  };

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Private Cryptographic Randomness: Passwords are generated using window.crypto.getRandomValues and are never logged or stored.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Settings */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Password Security Rules</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-muted-foreground uppercase">Password Length</span>
                <span className="text-foreground font-mono text-sm font-bold bg-muted px-2 py-0.5 rounded">
                  {options.length} Chars
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={64}
                value={options.length}
                onChange={(e) => updateOption("length", parseInt(e.target.value, 10))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>8</span>
                <span>16</span>
                <span>32</span>
                <span>64</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-2 text-xs">
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) => updateOption("includeUppercase", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Uppercase Letters (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) => updateOption("includeLowercase", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Lowercase Letters (a-z)</span>
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) => updateOption("includeNumbers", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) => updateOption("includeSymbols", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Special Symbols (!@#$%^&*)</span>
              </label>
              <label className="flex items-center gap-2 text-foreground cursor-pointer pt-1 border-t border-border">
                <input
                  type="checkbox"
                  checked={options.excludeLookalike}
                  onChange={(e) => updateOption("excludeLookalike", e.target.checked)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <span>Exclude Ambiguous Lookalikes (0, O, 1, l, I)</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Result & Entropy */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Generated Secure Password
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleGenerate()}
                className="text-xs h-7 gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </Button>
            </div>
            <div className="mt-2 p-3.5 rounded-lg bg-muted/40 border border-border font-mono text-base sm:text-lg font-bold text-foreground break-all select-all">
              {result.password}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Entropy Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Estimated Cryptographic Entropy</span>
                <span className="font-bold text-foreground">
                  {result.entropyBits} bits ({result.strength})
                </span>
              </div>
              {/* Progress Bar */}
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    result.entropyBits >= 80 ? "bg-emerald-500" : result.entropyBits >= 50 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min(100, (result.entropyBits / 128) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/30 border border-border text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1.5 text-foreground font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Security Analysis:</span>
              </div>
              <p>
                {result.entropyBits >= 80
                  ? "Highly resistant against distributed GPU brute-force dictionary attacks."
                  : "Consider adding symbols and increasing length to reach 80+ bits."}
              </p>
            </div>

            <CopyButton
              text={result.password}
              label="Copy Secure Password"
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={() => handleGenerate()} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Password Generator – NexusTools" />
      </div>
    </div>
  );
}

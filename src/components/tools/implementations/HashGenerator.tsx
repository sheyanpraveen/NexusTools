"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { computeHash } from "@/lib/engines/crypto";
import { RotateCcw, Hash, ShieldCheck } from "lucide-react";

export function HashGenerator() {
  const [inputText, setInputText] = useState<string>("admin");
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-512" | "SHA-1">("SHA-256");
  const [hashOutput, setHashOutput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let active = true;
    if (!inputText) {
      setHashOutput("");
      return;
    }
    computeHash(inputText, algorithm)
      .then((h) => {
        if (active) {
          setHashOutput(h);
          setErrorMsg("");
        }
      })
      .catch((err) => {
        if (active) {
          setErrorMsg(err.message || "Failed to compute cryptographic hash");
        }
      });
    return () => {
      active = false;
    };
  }, [inputText, algorithm]);

  const handleReset = () => {
    setInputText("");
    setHashOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Client-Side Web Cryptography: Hash digests are calculated natively inside your browser.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <span>Input Text & Algorithm</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="hash-input-text" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Plaintext String
              </label>
              <textarea
                id="hash-input-text"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>
            <Select
              label="Hash Algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as any)}
              options={[
                { label: "SHA-256 (256-bit Secure)", value: "SHA-256" },
                { label: "SHA-512 (512-bit High Security)", value: "SHA-512" },
                { label: "SHA-1 (160-bit Legacy)", value: "SHA-1" },
              ]}
            />
          </CardContent>
        </Card>

        {/* Right Column: Calculated Hash */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              {algorithm} Hex Checksum
            </div>
            <CardTitle className="text-base font-bold">Cryptographic Digest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMsg ? (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400">
                {errorMsg}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-muted/40 border border-border font-mono text-xs sm:text-sm font-semibold text-foreground break-all select-all leading-relaxed">
                {hashOutput || "—"}
              </div>
            )}

            {hashOutput && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Digest Length: <strong className="text-foreground">{hashOutput.length} characters ({hashOutput.length * 4} bits)</strong></span>
              </div>
            )}

            {hashOutput && (
              <CopyButton
                text={hashOutput}
                label="Copy Hash Digest"
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
        <ShareButton title="Hash Generator – NexusTools" />
      </div>
    </div>
  );
}

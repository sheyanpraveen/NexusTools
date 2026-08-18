"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { computeTextDiff } from "@/lib/engines/text";
import { RotateCcw, GitCompare, ShieldCheck } from "lucide-react";

export function TextDiffCompare() {
  const [original, setOriginal] = useState<string>(
    "port: 3000\nenv: development\ndatabase_url: postgres://localhost:5432/app\nmax_connections: 10\nlogging: true"
  );
  const [modified, setModified] = useState<string>(
    "port: 8080\nenv: production\ndatabase_url: postgres://db.prod.nexus.io:5432/app\nmax_connections: 100\nlogging: false\nssl: required"
  );

  const diffs = computeTextDiff(original, modified);

  const handleReset = () => {
    setOriginal("");
    setModified("");
  };

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Client-Side Comparison: Documents and snippets are compared locally inside your browser runtime.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Text Pane */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground">
              Original Text (Base)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={8}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original text here..."
              className="w-full rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y leading-relaxed"
            />
          </CardContent>
        </Card>

        {/* Modified Text Pane */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-muted-foreground">
              Modified Text (Revision)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={8}
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder="Paste revised text here..."
              className="w-full rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y leading-relaxed"
            />
          </CardContent>
        </Card>
      </div>

      {/* Visual Line Diff Output */}
      <Card className="bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-primary" />
              <span>Line-by-Line Visual Diff</span>
            </CardTitle>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Added Lines
              </span>
              <span className="flex items-center gap-1 text-rose-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Removed Lines
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[360px] overflow-y-auto border border-border rounded-lg bg-muted/20 divide-y divide-border/60 font-mono text-xs">
            {diffs.map((diff, index) => {
              if (diff.type === "added") {
                return (
                  <div key={index} className="p-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                    <span className="select-none font-bold text-emerald-600 w-4 shrink-0">+</span>
                    <span className="break-all">{diff.text}</span>
                  </div>
                );
              }
              if (diff.type === "removed") {
                return (
                  <div key={index} className="p-2 bg-rose-500/10 text-rose-700 dark:text-rose-300 flex items-start gap-2">
                    <span className="select-none font-bold text-rose-600 w-4 shrink-0">-</span>
                    <span className="break-all">{diff.text}</span>
                  </div>
                );
              }
              return (
                <div key={index} className="p-2 text-muted-foreground flex items-start gap-2">
                  <span className="select-none text-muted-foreground/40 w-4 shrink-0"> </span>
                  <span className="break-all">{diff.text}</span>
                </div>
              );
            })}
          </div>

          <CopyButton
            text={modified}
            label="Copy Revised Document"
            className="w-full"
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </Button>
        <ShareButton title="Text Diff Tool – NexusTools" />
      </div>
    </div>
  );
}

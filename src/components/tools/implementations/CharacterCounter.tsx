"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { analyzeText } from "@/lib/engines/text";
import { RotateCcw, AlignLeft } from "lucide-react";

export function CharacterCounter() {
  const [text, setText] = useState<string>(
    "Calculate percentages easily: find X% of Y, what percent X is of Y, or percentage increase/decrease."
  );

  const stats = analyzeText(text);

  const limits = [
    { name: "Twitter / X Post", max: 280, current: stats.characters },
    { name: "Search Meta Description", max: 160, current: stats.characters },
    { name: "Web Page Title Tag", max: 60, current: stats.characters },
    { name: "SMS Text Segment", max: 160, current: stats.characters },
  ];

  const handleReset = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <Card className="lg:col-span-7 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-primary" />
              <span>Input Text</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type text to count characters..."
              className="w-full h-full min-h-[200px] rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </CardContent>
        </Card>

        {/* Right Column: Platform Limits */}
        <Card className="lg:col-span-5 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Character Metrics
            </div>
            <CardTitle className="text-3xl font-black">
              {stats.characters} Characters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">With Spaces</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.characters}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Without Spaces</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.charactersNoSpaces}</span>
              </div>
            </div>

            {/* Limits Progress */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Platform Limit Checkers
              </div>
              {limits.map((l) => {
                const isOver = l.current > l.max;
                const pct = Math.min(100, Math.round((l.current / l.max) * 100));
                return (
                  <div key={l.name} className="space-y-1">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{l.name}</span>
                      <span className={isOver ? "text-rose-500 font-bold" : "text-foreground font-medium"}>
                        {l.current} / {l.max} ({l.max - l.current} left)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isOver ? "bg-rose-500" : "bg-primary"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <CopyButton
              text={`${stats.characters} characters with spaces (${stats.charactersNoSpaces} without spaces)`}
              label="Copy Character Count"
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="Character Counter – NexusTools" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { analyzeText } from "@/lib/engines/text";
import { RotateCcw, Type, Clock, Mic } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState<string>(
    "NexusTools provides fast, accurate, and free online calculators, unit converters, and developer utilities. All calculation engines are optimized for high precision and immediate client-side execution."
  );

  const stats = analyzeText(text);

  const handleReset = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Area */}
        <Card className="lg:col-span-7 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              <span>Type or Paste Text</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <textarea
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your content here..."
              className="w-full h-full min-h-[220px] rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y leading-relaxed"
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
              <span>Characters: {stats.characters} | Words: {stats.words}</span>
              <button
                type="button"
                onClick={() => setText("")}
                className="text-primary hover:underline font-medium"
              >
                Clear Text
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Statistics Grid */}
        <Card className="lg:col-span-5 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Text Analytics
            </div>
            <CardTitle className="text-3xl font-black">
              {stats.words.toLocaleString()} Words
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Characters (Total)</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.characters.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">No Spaces</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.charactersNoSpaces.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Sentences</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.sentences.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Paragraphs</span>
                <span className="font-mono font-bold text-foreground text-lg">{stats.paragraphs.toLocaleString()}</span>
              </div>
            </div>

            {/* Reading & Speaking Times */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold text-primary uppercase">Reading Time</div>
                  <div className="font-bold text-foreground font-mono">~{stats.readingTimeMinutes} min</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-muted/50 border border-border flex items-center gap-2">
                <Mic className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase">Speaking Time</div>
                  <div className="font-bold text-foreground font-mono">~{stats.speakingTimeMinutes} min</div>
                </div>
              </div>
            </div>

            {/* Top Keywords */}
            {stats.topKeywords.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Top Keyword Frequency
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.topKeywords.map((kw) => (
                    <span
                      key={kw.word}
                      className="px-2 py-0.5 rounded bg-muted border border-border text-[11px] text-foreground font-mono"
                    >
                      {kw.word}: <strong>{kw.count}</strong> ({kw.density}%)
                    </span>
                  ))}
                </div>
              </div>
            )}

            <CopyButton
              text={`Words: ${stats.words}, Characters: ${stats.characters}, Sentences: ${stats.sentences}, Reading Time: ~${stats.readingTimeMinutes} min`}
              label="Copy Statistics"
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
        <ShareButton title="Word Counter – NexusTools" />
      </div>
    </div>
  );
}

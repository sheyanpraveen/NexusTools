"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { convertCase, CaseType } from "@/lib/engines/text";
import { RotateCcw, CaseSensitive } from "lucide-react";

export function CaseConverter() {
  const [inputText, setInputText] = useState<string>("free online calculators and developer utilities that just work");

  const caseTransforms: { label: string; type: CaseType; sample: string }[] = [
    { label: "Title Case", type: "titlecase", sample: "Title Case Format" },
    { label: "UPPERCASE", type: "uppercase", sample: "UPPERCASE FORMAT" },
    { label: "lowercase", type: "lowercase", sample: "lowercase format" },
    { label: "Sentence case", type: "sentencecase", sample: "Sentence case format" },
    { label: "camelCase", type: "camelcase", sample: "camelCaseFormat" },
    { label: "PascalCase", type: "pascalcase", sample: "PascalCaseFormat" },
    { label: "snake_case", type: "snakecase", sample: "snake_case_format" },
    { label: "kebab-case", type: "kebabcase", sample: "kebab-case-format" },
  ];

  const handleApplyCase = (type: CaseType) => {
    setInputText(convertCase(inputText, type));
  };

  const handleReset = () => {
    setInputText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Input */}
        <Card className="lg:col-span-6 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CaseSensitive className="w-4 h-4 text-primary" />
              <span>Input & Editable Text</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to convert casing..."
              className="w-full h-full min-h-[220px] rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
            {inputText && (
              <CopyButton
                text={inputText}
                label="Copy Current Text"
                className="w-full"
              />
            )}
          </CardContent>
        </Card>

        {/* Right Column: Case Transformation Buttons & Previews */}
        <Card className="lg:col-span-6 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Quick Convert Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseTransforms.map((item) => {
                const converted = convertCase(inputText || "Sample Preview Text", item.type);
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleApplyCase(item.type)}
                    className="p-3 rounded-lg border border-border bg-muted/40 hover:bg-muted text-left transition-colors group space-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <div className="text-xs font-bold text-primary group-hover:underline">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono truncate">
                      {converted}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Text</span>
        </Button>
        <ShareButton title="Case Converter – NexusTools" />
      </div>
    </div>
  );
}

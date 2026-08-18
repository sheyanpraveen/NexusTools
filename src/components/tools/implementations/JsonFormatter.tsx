"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { RotateCcw, Code, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react";

export function JsonFormatter() {
  const [inputJson, setInputJson] = useState<string>(
    '{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "id": 101,\n    "name": "NexusTools",\n    "tags": ["fast", "accurate", "private"]\n  }\n}'
  );
  const [outputJson, setOutputJson] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [indentSpaces, setIndentSpaces] = useState<number>(2);

  const handleFormat = (spaces: number = indentSpaces) => {
    setErrorMsg("");
    if (!inputJson.trim()) {
      setOutputJson("");
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed, null, spaces));
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON format");
      setOutputJson("");
    }
  };

  const handleMinify = () => {
    setErrorMsg("");
    if (!inputJson.trim()) {
      setOutputJson("");
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed));
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON format");
      setOutputJson("");
    }
  };

  const handleReset = () => {
    setInputJson("");
    setOutputJson("");
    setErrorMsg("");
  };

  const handleLoadSample = () => {
    const sample = '{"product":{"id":42,"title":"NexusTools Pro","pricing":{"tier":"free","cost":0},"active":true,"features":["calc","convert","security"]}}';
    setInputJson(sample);
    try {
      setOutputJson(JSON.stringify(JSON.parse(sample), null, 2));
      setErrorMsg("");
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Client-Side Processing: Your JSON data never leaves your browser and is never stored.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Editor Input */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span>Raw JSON Input</span>
              </CardTitle>
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs text-primary hover:underline font-medium"
              >
                Load Sample
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5 flex-1">
              <textarea
                rows={12}
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Paste raw or minified JSON here..."
                className="w-full h-full min-h-[260px] rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleFormat(2)}
                className="text-xs"
              >
                Format (2 Spaces)
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleFormat(4)}
                className="text-xs"
              >
                Format (4 Spaces)
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleMinify}
                className="text-xs"
              >
                Minify (Strip Whitespace)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Output / Validation */}
        <Card className="flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Formatted & Validated Output</CardTitle>
              {outputJson && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Valid JSON</span>
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            {errorMsg ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Syntax Validation Error:</span>
                </div>
                <div className="font-mono">{errorMsg}</div>
              </div>
            ) : (
              <textarea
                readOnly
                rows={12}
                value={outputJson || (inputJson ? "Click 'Format' to beautify..." : "")}
                placeholder="Formatted output will appear here..."
                className="w-full h-full min-h-[260px] rounded-lg border border-border bg-muted/30 p-3 text-xs font-mono text-foreground focus:outline-none resize-y"
              />
            )}

            {outputJson && (
              <CopyButton
                text={outputJson}
                label="Copy Formatted JSON"
                className="w-full"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </Button>
        <ShareButton title="JSON Formatter & Validator – NexusTools" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { encodeURL, decodeURL } from "@/lib/engines/crypto";
import { RotateCcw, Link, ShieldCheck, ArrowRightLeft } from "lucide-react";

export function UrlEncoderDecoder() {
  const [inputText, setInputText] = useState<string>("https://nexustools.io/search?query=percentage calculator & tool=all");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [componentMode, setComponentMode] = useState<boolean>(true);
  const [outputText, setOutputText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleProcess = (text: string, currentMode: "encode" | "decode", isComponent: boolean) => {
    setErrorMsg("");
    if (!text) {
      setOutputText("");
      return;
    }
    try {
      if (currentMode === "encode") {
        setOutputText(encodeURL(text, isComponent));
      } else {
        setOutputText(decodeURL(text, isComponent));
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process URI");
      setOutputText("");
    }
  };

  const handleInputChange = (val: string) => {
    setInputText(val);
    handleProcess(val, mode, componentMode);
  };

  const handleToggleMode = () => {
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInputText(outputText);
    handleProcess(outputText, nextMode, componentMode);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setErrorMsg("");
  };

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Client-Side Processing: URLs and parameters are parsed safely in your browser.</span>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={mode === "encode" ? "primary" : "outline"}
            size="sm"
            onClick={() => {
              setMode("encode");
              handleProcess(inputText, "encode", componentMode);
            }}
          >
            Encode URL (Percent-Encoding)
          </Button>
          <Button
            type="button"
            variant={mode === "decode" ? "primary" : "outline"}
            size="sm"
            onClick={() => {
              setMode("decode");
              handleProcess(inputText, "decode", componentMode);
            }}
          >
            Decode URL
          </Button>
        </div>

        <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={componentMode}
            onChange={(e) => {
              setComponentMode(e.target.checked);
              handleProcess(inputText, mode, e.target.checked);
            }}
            className="rounded border-input text-primary focus:ring-primary h-4 w-4"
          />
          <span>Component Mode (encodes query params like &, =, ?)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Link className="w-4 h-4 text-primary" />
              <span>{mode === "encode" ? "Raw URL / String Input" : "Encoded URL Input"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={mode === "encode" ? "Paste raw URL with spaces or special chars..." : "Paste %20 encoded URL string..."}
              className="w-full h-full min-h-[200px] rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </CardContent>
        </Card>

        {/* Right Pane */}
        <Card className="flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">
                {mode === "encode" ? "Encoded URL Result" : "Decoded Human-Readable URL"}
              </CardTitle>
              {outputText && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleMode}
                  className="text-xs h-7 gap-1"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Swap</span>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            {errorMsg ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-mono">
                {errorMsg}
              </div>
            ) : (
              <textarea
                readOnly
                rows={8}
                value={outputText}
                placeholder="Result will appear here..."
                className="w-full h-full min-h-[200px] rounded-lg border border-border bg-muted/30 p-3 text-xs font-mono text-foreground focus:outline-none resize-y"
              />
            )}

            {outputText && (
              <CopyButton
                text={outputText}
                label="Copy Result"
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
        <ShareButton title="URL Encoder & Decoder – NexusTools" />
      </div>
    </div>
  );
}

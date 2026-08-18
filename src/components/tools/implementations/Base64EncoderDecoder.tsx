"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { encodeBase64, decodeBase64 } from "@/lib/engines/crypto";
import { RotateCcw, FileCode, ShieldCheck, ArrowRightLeft } from "lucide-react";

export function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState<string>("Hello, NexusTools! 🚀 Accurate & Fast.");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleProcess = () => {
    setErrorMsg("");
    if (!inputText) {
      setOutputText("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutputText(encodeBase64(inputText, urlSafe));
      } else {
        setOutputText(decodeBase64(inputText));
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process Base64 string");
      setOutputText("");
    }
  };

  // Run automatically on input change
  const handleInputChange = (val: string) => {
    setInputText(val);
    setErrorMsg("");
    if (!val) {
      setOutputText("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutputText(encodeBase64(val, urlSafe));
      } else {
        setOutputText(decodeBase64(val));
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setOutputText("");
    }
  };

  const handleToggleMode = () => {
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInputText(outputText);
    if (outputText) {
      try {
        if (nextMode === "encode") {
          setOutputText(encodeBase64(outputText, urlSafe));
        } else {
          setOutputText(decodeBase64(outputText));
        }
      } catch (err: any) {
        setErrorMsg(err.message);
      }
    }
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
        <span>100% Client-Side Encoding/Decoding: Encoded directly in your browser without transmitting sensitive payload data.</span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={mode === "encode" ? "primary" : "outline"}
            size="sm"
            onClick={() => {
              setMode("encode");
              handleProcess();
            }}
          >
            Encode Text to Base64
          </Button>
          <Button
            type="button"
            variant={mode === "decode" ? "primary" : "outline"}
            size="sm"
            onClick={() => {
              setMode("decode");
              handleProcess();
            }}
          >
            Decode Base64 to Text
          </Button>
        </div>

        {mode === "encode" && (
          <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => {
                setUrlSafe(e.target.checked);
                if (inputText) {
                  try {
                    setOutputText(encodeBase64(inputText, e.target.checked));
                  } catch (err: any) {}
                }
              }}
              className="rounded border-input text-primary focus:ring-primary h-4 w-4"
            />
            <span>URL-Safe Base64 (RFC 4648)</span>
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Input Pane */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary" />
              <span>{mode === "encode" ? "Plaintext Input" : "Base64 Input"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={mode === "encode" ? "Type or paste text to encode..." : "Paste Base64 string to decode..."}
              className="w-full h-full min-h-[200px] rounded-lg border border-input bg-background p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </CardContent>
        </Card>

        {/* Right Output Pane */}
        <Card className="flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">
                {mode === "encode" ? "Base64 Encoded Result" : "Decoded Plaintext Result"}
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
                placeholder="Converted result will appear here..."
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
        <ShareButton title="Base64 Encoder & Decoder – NexusTools" />
      </div>
    </div>
  );
}

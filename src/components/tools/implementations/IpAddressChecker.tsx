"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateSubnet, isValidIPv4 } from "@/lib/engines/subnet";
import { RotateCcw, Network, ShieldCheck } from "lucide-react";

export function IpAddressChecker() {
  const [ipInput, setIpInput] = useState<string>("192.168.1.1");

  let result: ReturnType<typeof calculateSubnet> | null = null;
  let errorMsg = "";

  try {
    if (ipInput.trim()) {
      if (isValidIPv4(ipInput)) {
        result = calculateSubnet(ipInput, 24);
      } else {
        errorMsg = "Please enter a valid IPv4 address (e.g. 192.168.1.1 or 8.8.8.8)";
      }
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  const handleReset = () => {
    setIpInput("192.168.1.1");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Network className="w-4 h-4 text-primary" />
              <span>Inspect IP Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="IPv4 Address"
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="192.168.1.1"
              error={errorMsg}
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground w-full font-medium">Quick Test IPs:</span>
              {[
                { label: "Home Router", ip: "192.168.1.1" },
                { label: "Google DNS", ip: "8.8.8.8" },
                { label: "Cloudflare DNS", ip: "1.1.1.1" },
                { label: "Loopback", ip: "127.0.0.1" },
              ].map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setIpInput(preset.ip)}
                  className="text-xs h-7 px-2"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Analysis Output */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">IP Classification & Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Class Type</div>
                    <div className="text-base font-bold text-foreground">{result.ipClass}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">Scope</div>
                    <div className={`text-base font-bold ${result.isPrivate ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                      {result.isPrivate ? "Private (RFC 1918 / Loopback)" : "Public Internet"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border space-y-0.5">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">32-Bit Binary Format</span>
                    <span className="font-mono text-foreground font-medium text-xs break-all">{result.binaryIp}</span>
                  </div>
                </div>

                <CopyButton
                  text={`IP: ${result.ipAddress} | ${result.ipClass} | Scope: ${result.isPrivate ? "Private" : "Public"} | Binary: ${result.binaryIp}`}
                  label="Copy IP Inspection Details"
                  className="w-full"
                />
              </>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Enter an IPv4 address to inspect its network class and properties.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="IP Address Checker – NexusTools" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateSubnet, isValidIPv4 } from "@/lib/engines/subnet";
import { RotateCcw, Binary } from "lucide-react";

export function SubnetCalculator() {
  const [ip, setIp] = useState<string>("192.168.1.55");
  const [cidr, setCidr] = useState<string>("24");

  let result: ReturnType<typeof calculateSubnet> | null = null;
  let errorMsg = "";

  try {
    if (ip.trim()) {
      if (isValidIPv4(ip)) {
        result = calculateSubnet(ip, parseInt(cidr, 10));
      } else {
        errorMsg = "Enter a valid IPv4 address (e.g. 10.0.0.1)";
      }
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  const handleReset = () => {
    setIp("192.168.1.55");
    setCidr("24");
  };

  const cidrOptions = Array.from({ length: 33 }, (_, i) => ({
    label: `/${i} (${Math.pow(2, 32 - i).toLocaleString()} IPs)`,
    value: i.toString(),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Binary className="w-4 h-4 text-primary" />
              <span>Subnet Parameters</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="IPv4 Base Address"
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.55"
              error={errorMsg}
            />
            <Select
              label="CIDR Prefix Mask"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              options={cidrOptions}
            />
            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground w-full font-medium">Common Subnets:</span>
              {[
                { label: "/24 (254 Hosts)", val: "24" },
                { label: "/28 (14 Hosts)", val: "28" },
                { label: "/30 (2 Hosts)", val: "30" },
                { label: "/16 (65K Hosts)", val: "16" },
              ].map((preset) => (
                <Button
                  key={preset.label}
                  variant={cidr === preset.val ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setCidr(preset.val)}
                  className="text-xs h-7 px-2"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Subnet Metrics Grid */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold">Calculated Subnet Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Network Address</span>
                    <span className="font-mono font-bold text-foreground text-sm">{result.networkAddress}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Broadcast Address</span>
                    <span className="font-mono font-bold text-foreground text-sm">{result.broadcastAddress}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Subnet Mask</span>
                    <span className="font-mono font-bold text-foreground text-sm">{result.subnetMask}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                    <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Wildcard Mask</span>
                    <span className="font-mono font-bold text-foreground text-sm">{result.wildcardMask}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-0.5 col-span-2">
                    <span className="text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase font-semibold">
                      Usable Host Range ({result.usableHosts.toLocaleString()} Usable IPs)
                    </span>
                    <span className="font-mono font-bold text-foreground text-xs sm:text-sm">
                      {result.firstUsableHost} — {result.lastUsableHost}
                    </span>
                  </div>
                </div>

                <CopyButton
                  text={`Network: ${result.networkAddress}/${result.cidr} | Mask: ${result.subnetMask} | Broadcast: ${result.broadcastAddress} | Usable Hosts: ${result.firstUsableHost} - ${result.lastUsableHost} (${result.usableHosts} hosts)`}
                  label="Copy Subnet Details"
                  className="w-full"
                />
              </>
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Enter an IP address and select a prefix to compute subnet ranges.
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
        <ShareButton title="Subnet Calculator – NexusTools" />
      </div>
    </div>
  );
}

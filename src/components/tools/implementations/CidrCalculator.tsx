"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { calculateSubnet } from "@/lib/engines/subnet";
import { RotateCcw, Cpu } from "lucide-react";

export function CidrCalculator() {
  const [cidr, setCidr] = useState<string>("24");

  const cidrNum = parseInt(cidr, 10);
  const result = calculateSubnet("192.168.0.0", cidrNum);

  const cidrOptions = Array.from({ length: 33 }, (_, i) => ({
    label: `/${i} (${Math.pow(2, 32 - i).toLocaleString()} Total IPs)`,
    value: i.toString(),
  }));

  const handleReset = () => {
    setCidr("24");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span>Select CIDR Prefix</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="CIDR Slash Notation"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              options={cidrOptions}
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground w-full font-medium">Quick Selection:</span>
              {["8", "16", "22", "24", "26", "28", "30", "32"].map((val) => (
                <Button
                  key={val}
                  variant={cidr === val ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setCidr(val)}
                  className="text-xs h-7 px-2"
                >
                  /{val}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card className="lg:col-span-7 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              CIDR Prefix Metrics
            </div>
            <CardTitle className="text-3xl font-black font-mono">
              /{cidr} → {result.subnetMask}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Dotted Subnet Mask</span>
                <span className="font-mono font-bold text-foreground text-sm">{result.subnetMask}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Wildcard Mask</span>
                <span className="font-mono font-bold text-foreground text-sm">{result.wildcardMask}</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-0.5">
                <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Total IP Addresses</span>
                <span className="font-mono font-bold text-foreground text-sm">{result.totalHosts.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase font-semibold">Usable Device Hosts</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">{result.usableHosts.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-0.5 text-xs">
              <span className="text-muted-foreground block text-[10px] uppercase font-semibold">Binary Mask Bits</span>
              <span className="font-mono text-foreground font-medium text-xs break-all">{result.binaryMask}</span>
            </div>

            <CopyButton
              text={`/${result.cidr} Subnet Mask: ${result.subnetMask} | Wildcard: ${result.wildcardMask} | Usable Hosts: ${result.usableHosts.toLocaleString()} | Total IPs: ${result.totalHosts.toLocaleString()}`}
              label="Copy CIDR Breakdown"
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
        <ShareButton title="CIDR Calculator – NexusTools" />
      </div>
    </div>
  );
}

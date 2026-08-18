"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ShareButton } from "@/components/tools/ShareButton";
import QRCode from "qrcode";
import { RotateCcw, QrCode, Download, ShieldCheck } from "lucide-react";

export function QrCodeGenerator() {
  const [content, setContent] = useState<string>("https://nexustools.io");
  const [size, setSize] = useState<string>("256");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">("M");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (!content.trim() || !canvasRef.current) return;
    QRCode.toCanvas(
      canvasRef.current,
      content,
      {
        width: parseInt(size, 10),
        margin: 2,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      },
      (err) => {
        if (err) {
          setErrorMsg("Failed to generate QR code: " + err.message);
        } else {
          setErrorMsg("");
        }
      }
    );
  }, [content, size, errorCorrection]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setContent("https://nexustools.io");
    setSize("256");
    setErrorCorrection("M");
  };

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
        <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <span>100% Client-Side QR Generation: Never expires, zero server tracking, vector-accurate scanning.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Config */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <QrCode className="w-4 h-4 text-primary" />
              <span>QR Code Payload & Options</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="qr-content-input" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Website URL or Raw Text
              </label>
              <textarea
                id="qr-content-input"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://example.com or any text..."
                className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
              {errorMsg && <p className="text-xs text-destructive font-medium">{errorMsg}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Image Resolution"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                options={[
                  { label: "Standard (256 × 256 px)", value: "256" },
                  { label: "High-Res (384 × 384 px)", value: "384" },
                  { label: "Print Quality (512 × 512 px)", value: "512" },
                ]}
              />
              <Select
                label="Error Correction"
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                options={[
                  { label: "Low (7% recovery)", value: "L" },
                  { label: "Medium (15% recovery)", value: "M" },
                  { label: "Quartile (25% recovery)", value: "Q" },
                  { label: "High (30% recovery)", value: "H" },
                ]}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Canvas & Download */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Live QR Preview
            </div>
            <CardTitle className="text-base font-bold">Scannable Barcode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center justify-center">
            <div className="p-4 rounded-xl bg-white shadow-sm border border-border inline-flex items-center justify-center">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={handleDownload}
              className="w-full gap-2 text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG Image</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </Button>
        <ShareButton title="QR Code Generator – NexusTools" />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CopyButton } from "@/components/tools/CopyButton";
import { ShareButton } from "@/components/tools/ShareButton";
import { slugify } from "@/lib/utils";
import { RotateCcw, Compass } from "lucide-react";

export function SlugGenerator() {
  const [title, setTitle] = useState<string>("Top 10 Best Online Calculators & Tools in 2026!");
  const [slug, setSlug] = useState<string>(() => slugify(title));

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleReset = () => {
    setTitle("");
    setSlug("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Title Input */}
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              <span>Enter Article or Headline Title</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Article Title / Headline"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="How to Calculate Compound Interest in 2026..."
            />
            <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
              <span className="text-muted-foreground w-full font-medium">Try samples:</span>
              {[
                "10 Free Online Converters for Students",
                "Understanding Subnetting & CIDR /24 Masks",
                "How to Save $10,000 in 1 Year with 8% Interest",
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleTitleChange(sample)}
                  className="text-primary hover:underline text-left"
                >
                  • {sample}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Generated Slug */}
        <Card className="lg:col-span-6 flex flex-col justify-between bg-card">
          <CardHeader className="pb-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Clean Web URL Slug
            </div>
            <CardTitle className="text-base font-bold">Sanitized Permalink</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border font-mono text-sm sm:text-base font-bold text-foreground break-all select-all">
              {slug || "your-clean-slug-here"}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>Preview URL: <span className="font-mono text-foreground font-medium">https://example.com/posts/{slug || "slug"}</span></div>
            </div>

            {slug && (
              <CopyButton
                text={slug}
                label="Copy Web Slug"
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
        <ShareButton title="URL Slug Generator – NexusTools" />
      </div>
    </div>
  );
}

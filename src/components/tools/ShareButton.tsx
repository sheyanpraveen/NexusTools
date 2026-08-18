"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export interface ShareButtonProps extends Omit<ButtonProps, "onClick"> {
  title: string;
  url?: string;
}

export function ShareButton({ title, url, variant = "outline", size = "sm", className, ...props }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const targetUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url: targetUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
      aria-label={copied ? "Link copied" : "Share this tool"}
      {...props}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 shrink-0" />
          <span>Share</span>
        </>
      )}
    </Button>
  );
}

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/Button";

export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = "Copy", variant = "outline", size = "sm", className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
      aria-label={copied ? "Copied to clipboard" : label}
      {...props}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 shrink-0" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}

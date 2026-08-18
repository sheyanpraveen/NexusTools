import React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface AdSlotProps {
  position?: "top" | "content" | "sidebar" | "bottom";
  className?: string;
}

export function AdSlot({ position = "content", className }: AdSlotProps) {
  // If ads are disabled in siteConfig, return nothing to preserve clean layout
  if (!siteConfig.ads.enabled) {
    return null;
  }

  const heightClasses = {
    top: "min-h-[90px] max-w-[728px]",
    content: "min-h-[250px] max-w-[336px]",
    sidebar: "min-h-[600px] max-w-[300px]",
    bottom: "min-h-[90px] max-w-[728px]",
  };

  return (
    <div
      className={cn(
        "my-8 mx-auto flex flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-border/80 bg-muted/30 p-2 text-center text-xs text-muted-foreground transition-all",
        heightClasses[position],
        className
      )}
      aria-label="Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
        Advertisement
      </span>
      {/* Placeholder container for Google AdSense Tag */}
      <div className="w-full flex-1 flex items-center justify-center">
        {/* AdSense ins tag will mount here when enabled */}
      </div>
    </div>
  );
}

export function TopAdSlot({ className }: { className?: string }) {
  return <AdSlot position="top" className={className} />;
}

export function ContentAdSlot({ className }: { className?: string }) {
  return <AdSlot position="content" className={className} />;
}

export function SidebarAdSlot({ className }: { className?: string }) {
  return <AdSlot position="sidebar" className={className} />;
}

export function BottomAdSlot({ className }: { className?: string }) {
  return <AdSlot position="bottom" className={className} />;
}

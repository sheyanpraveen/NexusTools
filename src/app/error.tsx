"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error in client console (no sensitive stack traces exposed in UI)
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="container max-w-md py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          An unexpected error occurred while executing this calculation. You can try refreshing the calculator or return to the homepage.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <Button variant="outline" onClick={() => reset()} className="gap-1.5 text-xs">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </Button>
        <Link href="/">
          <Button variant="primary" className="gap-1.5 text-xs">
            <Home className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

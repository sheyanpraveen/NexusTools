import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefixText?: string;
  suffixText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, prefixText, suffixText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </label>
        )}
        <div className="relative flex items-center rounded-lg border border-input bg-background shadow-sm transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          {prefixText && (
            <span className="pl-3 pr-1 text-sm font-medium text-muted-foreground select-none">
              {prefixText}
            </span>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              prefixText && "pl-1.5",
              suffixText && "pr-1.5",
              className
            )}
            {...props}
          />
          {suffixText && (
            <span className="pr-3 pl-1 text-sm font-medium text-muted-foreground select-none">
              {suffixText}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-xs text-destructive font-medium" role="alert">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

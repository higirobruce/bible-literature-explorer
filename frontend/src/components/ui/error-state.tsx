"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-border bg-card px-6 text-center",
        className
      )}
    >
      <AlertTriangle className="h-10 w-10 text-terracotta" />
      <h3 className="mt-3 text-sm font-medium text-heading">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-muted">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-secondary transition-colors hover:border-accent hover:text-accent"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      )}
    </div>
  );
}

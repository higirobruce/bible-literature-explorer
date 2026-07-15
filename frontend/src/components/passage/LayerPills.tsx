"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const layers = [
  { id: 1, label: "Read", description: "The biblical text" },
  { id: 2, label: "Understand", description: "Historical & literary context" },
  { id: 3, label: "Explore", description: "Word studies & connections" },
  { id: 4, label: "Research", description: "Scholarly discussion" },
];

interface LayerPillsProps {
  value: number;
  onChange: (id: number) => void;
}

export function LayerPills({ value, onChange }: LayerPillsProps) {
  return (
    <div className="flex gap-1">
      {layers.map((layer) => (
        <button
          key={layer.id}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 ease-out",
            value === layer.id
              ? "bg-accent text-white"
              : "border border-border bg-card text-secondary hover:border-accent hover:text-accent"
          )}
          onClick={() => onChange(layer.id)}
          title={layer.description}
        >
          {layer.label}
        </button>
      ))}
    </div>
  );
}

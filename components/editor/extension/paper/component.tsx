"use client";

import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useRef } from "react";

interface Line {
  color: string;
  id: string;
  path: string;
  size: number;
}

export function DrawingComponent({ node }: NodeViewProps) {
  const canvasRef = useRef<SVGSVGElement>(null);

  const lines: Line[] = node.attrs.lines ?? [];

  return (
    <NodeViewWrapper>
      <div className="flex flex-col overflow-hidden rounded-md">
        <svg
          className="block w-full touch-none bg-muted/70 dark:bg-muted/50"
          ref={canvasRef}
          viewBox="0 0 500 250"
        >
          <title>Canvas</title>
          {lines.map((item) => (
            <path
              d={item.path}
              fill="none"
              id={`id-${item.id}`}
              key={item.id}
              stroke={item.color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={item.size}
            />
          ))}
        </svg>
      </div>
    </NodeViewWrapper>
  );
}

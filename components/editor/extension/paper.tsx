import { mergeAttributes, Node } from "@tiptap/core";
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
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

export const Paper = Node.create({
  name: "paper",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
        parseHTML: (element) => {
          const raw = element.getAttribute("data-lines");
          if (!raw) {
            return [];
          }
          try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        },
        renderHTML: (attributes) => {
          return {
            "data-lines": JSON.stringify(attributes.lines ?? []),
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "paper" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DrawingComponent);
  },
});

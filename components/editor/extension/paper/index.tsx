import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { DrawingComponent } from "./component";
// import { DrawingComponent } from "../components/DrawingComponent";

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

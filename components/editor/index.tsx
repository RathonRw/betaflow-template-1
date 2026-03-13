"use client";

import Audio from "@tiptap/extension-audio";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import { Highlight } from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { Paper } from "@/components/editor/extension/paper";
import { Twitter } from "@/components/editor/extension/twitter";

import { HorizontalRule } from "@/components/editor/node/horizontal-rule-node/horizontal-rule-node-extension";

// --- Tiptap Node ---

import "@/components/editor/node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/editor/node/table-node/table-node.scss";
import "@/components/editor/node/blockquote-node/blockquote-node.scss";
import "@/components/editor/node/code-block-node/code-block-node.scss";
import "@/components/editor/node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/editor/node/list-node/list-node.scss";
import "@/components/editor/node/media-node/image-node.scss";
import "@/components/editor/node/media-node/youtube-node.scss";
import "@/components/editor/node/heading-node/heading-node.scss";
import "@/components/editor/node/paragraph-node/paragraph-node.scss";

const lowlight = createLowlight(common);

interface EditorProps {
  content: string;
}
export function Editor({ content }: EditorProps) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class:
            "mx-auto max-w-xl py-1 min-w-0  w-full cursor-pointer rounded-md",
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Twitter.configure({
        HTMLAttributes: {
          class: "mx-auto max-w-[420px] min-w-0  w-full",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
      Document.extend({
        content: "block+",
      }),
      Paper,
      Audio.configure({
        controls: true,
        preload: "metadata",
        HTMLAttributes: {
          class: "mx-auto max-w-xl py-1 min-w-0  w-full",
        },
      }),
    ],
    content,
    immediatelyRender: false,
  });

  return <EditorContent className="editor-content" editor={editor} />;
}

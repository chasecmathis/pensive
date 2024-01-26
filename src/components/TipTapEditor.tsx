"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenu from "./TipTapMenu";
import { Button } from "./ui/button";
import { Text } from "@tiptap/extension-text";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NotebookType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";

type Props = { notebook: NotebookType };

export default function TipTapEditor({ notebook }: Props) {
  const [content, setContent] = useState(notebook.content ?? "");
  const debouncedContent = useDebounce(content, 1000);

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const saveContent = useMutation({
    mutationFn: async () => {
      const resp = await axios.post("/api/note", {
        content: debouncedContent,
        noteId: notebook.id,
      });
      return resp.data;
    },
  });

  useEffect(() => {
    if (debouncedContent === "") return;
    else {
      saveContent.mutate(undefined, {
        onSuccess: (data) => console.log("successfully updated"),
        onError: (error) => console.log(error),
      });
    }
  }, [debouncedContent]);

  const shortcut = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Control-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, shortcut],
    content: content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  const lastCompletion = useRef("");

  useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  return (
    <>
      <div className="flex py-6 gap-4">
        {editor && <TipTapMenu editor={editor} />}
        <Button disabled={saveContent.isPending}>
          {saveContent.isPending ? "Saving" : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm w-full">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4" />
      <span className="text-sm">
        Tip: Press{' '}
        <kbd className="px-1.5 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 rounded-lg">CTRL + A</kbd>
        {' '}for AI autocomplete
      </span>
    </>
  );
}

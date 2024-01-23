"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenu from "./TipTapMenu";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NotebookType } from "@/lib/db/schema";

type Props = { notebook: NotebookType };

export default function TipTapEditor({ notebook }: Props) {
  const [content, setContent] = useState(notebook.content ?? "");
  const debouncedContent = useDebounce(content, 1000);

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

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  return (
    <>
      <div className="flex py-6 gap-4">
        {editor && <TipTapMenu editor={editor} />}
        <Button disabled={saveContent.isPending} >{saveContent.isPending ? "Saving" : "Saved"}</Button>
      </div>
      <div className="prose prose-sm w-full">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

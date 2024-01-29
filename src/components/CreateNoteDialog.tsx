"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateNoteDialog({}: Props) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const createNotebook = useMutation({
    mutationFn: async () => {
      const resp = await axios.post("/api/notebook", {
        name: input,
      });
      return resp.data;
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input === "") {
      window.alert("Please enter a name for your notebook");
      return;
    } else {
      createNotebook.mutate(undefined, {
        onSuccess: ({ id }) => {
          console.log(`Notebook created with id: ${id}`);
          router.push(`/notebook/${id}`);
        },
        onError: (error) => {
          console.log(error);
          window.alert("Failed to create a new notebook");
        },
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-dashed border-2 border-purple-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-purple-600" />
          <h2 className="font-semibold text-purple-600 sm:mt-2">
            New Notebook
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Notebook</DialogTitle>
          <DialogDescription>
            You can create a new notebook by clicking on the button below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Notebook name..."
          />
          <div className="h-4" />
          <div className="flex gap-3">
            <Button
              className="bg-purple-600"
              disabled={createNotebook.isPending}
              type='submit'
            >
              {createNotebook.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

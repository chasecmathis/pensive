import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Divide } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import CreateNoteDialog from "@/components/CreateNoteDialog";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { $notebooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

type Props = {};

export default async function page({}: Props) {
  const { userId } = auth();
  if (!userId) redirect("/");

  const notebook = await db
    .select()
    .from($notebooks)
    .where(eq($notebooks.userId, userId));

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14" />
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="flex items-center">
            <Link href="/">
              <Button className="bg-purple-600">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back
              </Button>
            </Link>
            <div className="w-4" />
            <h1 className="text-3xl font-bold text-gray-900">My Notebooks</h1>
            <div className="w-4" />
            <UserButton />
          </div>
        </div>
        <div className="h-8" />
        <Separator />
        <div className="h-8" />
        {notebook.length === 0 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-500">
              You have no notebooks yet!
            </h2>
          </div>
        )}
        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
          <CreateNoteDialog />
          {notebook.map((note) => (
            <a href={`/notebook/${note.id}`} key={note.id}>
              <div className="border border-stone-200 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                <Image
                  src={note.imageURL || ""}
                  width={400}
                  height={200}
                  alt={note.name}
                />
                <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {note.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(note.createdAt!).toLocaleDateString()}
                </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

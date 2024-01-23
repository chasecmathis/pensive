import { db } from "@/lib/db";
import { $notebooks } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import React from "react";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-server";
import TipTapEditor from "@/components/TipTapEditor";
import DeleteButton from "@/components/DeleteButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: Props) {
  const { userId } = auth();
  if (!userId) redirect("/dashboard");

  const user = await clerk.users.getUser(userId);

  const notebook = await db
    .select()
    .from($notebooks)
    .where(and(eq($notebooks.id, parseInt(id)), eq($notebooks.userId, userId)));

  if (notebook.length != 1) return redirect("/dashboard");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex border shadow-xl border-stone-200 rounded-lg p-4 items-center">
          <Link href="/dashboard">
            <Button className="bg-purple-600">Back</Button>
          </Link>
          <div className="w-4" />
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500">{notebook[0].name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={parseInt(id)} />
          </div>
        </div>
        <div className="h-4" />
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor notebook={notebook[0]} />
        </div>
      </div>
    </div>
  );
}

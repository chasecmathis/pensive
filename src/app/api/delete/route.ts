// /api/createNotebook
import { generateImagePrompt, generateImage } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notebooks } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { id } = body;

  const notebook = await db
    .delete($notebooks)
    .where(and(eq($notebooks.id, id), eq($notebooks.userId, userId)));

  return new NextResponse("Ok", { status: 200 });
}

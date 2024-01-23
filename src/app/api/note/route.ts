import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notebooks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    let { noteId, content } = body;

    if (!noteId || !content)
      return new NextResponse("Missing noteId or content", { status: 400 });

    noteId = parseInt(noteId);

    const notebook = await db
      .select()
      .from($notebooks)
      .where(eq($notebooks.id, noteId));

    if (notebook.length != 1)
      return new NextResponse("Failed to update", { status: 500 });

    if (notebook[0].content !== content) {
      await db
        .update($notebooks)
        .set({
          content,
        })
        .where(eq($notebooks.id, noteId));
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

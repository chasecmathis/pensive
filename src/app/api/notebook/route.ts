// /api/createNotebook
import { generateImagePrompt, generateImage } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notebooks } from "@/lib/db/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { name, background } = body;
  //   const image_description = await generateImagePrompt(name);

  //   let image = await generateImage(image_description);
  //   if (!image) {
  //     console.log("Setting random notebook image");
  //     image = 'https://picsum.photos/256'
  //     // throw new NextResponse("Failed to generate image", { status: 500 });
  //   }

  const notebook = await db
    .insert($notebooks)
    .values({
      name: name,
      background: background,
      userId: userId,
      content: `<h1>${name}<h1>`
    })
    .returning({
      id: $notebooks.id,
    });

  return NextResponse.json(
    {
      id: notebook[0].id,
    },
    {
      status: 200,
    }
  );
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { article_id, score } = await req.json();

  if (!article_id || !score) {
    return NextResponse.json(
      { error: "article_id and score are required" },
      { status: 400 }
    );
  }

  const saved = await prisma.score.create({
    data: {
      article_id: Number(article_id),
      score: Number(score),
    },
  });

  return NextResponse.json(saved);
}
export async function GET(req: Request) {
  const result = await prisma.score.findMany();
  return NextResponse.json(result);
}

export async function PATCH(req: Request) {
  const { id, score } = await req.json();

  const updaded = await prisma.score.update({
    where: { id },
    data: {
      score,
    },
  });
  return NextResponse.json(updaded);
}


export async function  DELETE(req:Request) {
  const {id} = await req.json()
  const deleted = await prisma.score.delete({
    where: {id}
  })
}
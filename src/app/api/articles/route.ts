import { query } from "@/lib/connectDb";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await prisma.article.findMany();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { title, summary, content } = await req.json();
  try {
    const article = await prisma.article.create({
      data: {
        title,
        summary,
        content,
      },
    });
    console.log("RESPONSE!", article);

    return NextResponse.json(article);
  } catch (error) {
    console.error(error, "post error");
  }
};

export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  try {
    const article = await prisma.article.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error(error, "failed to delete");
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { id, title, summary, content } = await req.json();

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        summary,
        content,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

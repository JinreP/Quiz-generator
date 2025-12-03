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
    console.log("BACKEND RECEIVED:", title, content, summary);

    return NextResponse.json(article);
  } catch (error) {
    console.error(error, "post error");
  }
};

export const DELETE = async (req: Request) => {
  const { id } = await req.json();

  try {
    await prisma.score.deleteMany({
      where: { article_id: id },
    });

    const deleted = await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("failed to delete", error);
    return NextResponse.json({ error }, { status: 500 });
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
    const articles = await prisma.article.findMany();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

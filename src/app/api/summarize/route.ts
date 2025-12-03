import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ summary: "" });
  }

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text: `Summarize shortly:${content}` }],
  });

  const summary = result.text ?? "";

  return NextResponse.json({ summary });
}

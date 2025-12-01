// /api/gemini/questions/route.ts
import { GoogleGenAI } from "@google/genai";

// 1) Read the API key once
const apiKey = process.env.GEMINI_API_KEY;

// 2) Hard fail if it's missing so it doesn't try Google Cloud ADC
if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is not set. Put it in .env.local and restart dev server."
  );
}
console.log("🔑 GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

// 3) Force Developer API mode (NOT Vertex AI)
const ai = new GoogleGenAI({
  apiKey, // your Gemini API key
  vertexai: false,
});

export async function POST(req: Request) {
  const { article } = await req.json();

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: `
Generate 5 quiz questions from this article.

Return like this but only in JSON only in raw json no codeblocks no markdown no random stuffs:
[
  {
    "question": "string",
    "answers": [
      { "answer": "string", "correct": true },
      { "answer": "string", "correct": false },
      { "answer": "string", "correct": false },
      { "answer": "string", "correct": false }
    ]
  }
]

Article:
${article}
`,
      },
    ],
  });

  // In @google/genai, text is a string property, not a function
  const text = result.text || "[]";

  console.log(text);

  return Response.json(JSON.parse(text), { status: 200 });
}

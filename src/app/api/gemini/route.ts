import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey,
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
 if user content is empty then make some content and 
 Return like this but only in JSON only in raw json no codeblocks no markdown no random stuffs, don't break json
 The output MUST NOT contain Mongolian characters.
 don't break json
 don't include any quotes (“ ” " ") inside the question or answer text .
make it short so it can fit in the button like max is 4 words quiz questions
:
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

  const text = result.text || "[]";

  console.log(text);

  return Response.json(JSON.parse(text), { status: 200 });
}

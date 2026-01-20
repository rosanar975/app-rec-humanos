import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY no configurada");
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt requerido" });
    }

    const systemPrompt = fs.readFileSync(
      path.join(process.cwd(), "prompts", "system.txt"),
      "utf-8"
    );

    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅Using Gemini 1.5 Flash model (supported)
   const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
   systemInstruction: systemPrompt,
});


   const result = await model.generateContent(prompt);
const text = result.response.text();

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("Gemini error FINAL:", error);
    return res.status(500).json({ error: error.message });
  }
}

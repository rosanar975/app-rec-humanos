import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

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
      return res.status(500).json({ error: "API key no configurada" });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt requerido" });
    }

    // 🔥 RUTA CORRECTA PARA VERCEL
    const systemPath = path.join(process.cwd(), "prompts", "system.txt");

    const systemPrompt = fs.readFileSync(systemPath, "utf8");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      { role: "system", parts: [{ text: systemPrompt }] },
      { role: "user", parts: [{ text: prompt }] },
    ]);

    const text = result.response.text();
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({ error: "Error generando contenido" });
  }
}

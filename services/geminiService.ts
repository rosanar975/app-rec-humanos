
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

// Inicialización perezosa de la instancia de GoogleGenAI.
// Esto evita que la aplicación se bloquee al inicio si la clave API no está disponible,
// un problema común en entornos de producción como Vercel.
let ai: GoogleGenAI | null = null;
const getAi = () => {
    if (!ai) {
        if (API_KEY) {
            ai = new GoogleGenAI({ apiKey: API_KEY });
        } else {
             console.warn("API_KEY environment variable not set. AI features will not work.");
        }
    }
    return ai;
};

export const generateSummary = async (text: string): Promise<string> => {
  const genAI = getAi();
  if (!genAI) {
    throw new Error("El servicio de IA no está configurado. Comprueba la variable de entorno API_KEY.");
  }

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Resume el siguiente contenido de la presentación en un resumen profesional y conciso en español:\n\n---\n${text}\n---`,
    });
    
    if (response.text) {
      return response.text;
    }
    throw new Error("No se pudo generar el resumen. La respuesta estaba vacía.");
  } catch (error) {
    console.error("Error generando resumen:", error);
    throw new Error("Falló la comunicación con el modelo de IA para la sumarización.");
  }
};

export const generateAudio = async (text: string): Promise<string> => {
  const genAI = getAi();
  if (!genAI) {
    throw new Error("El servicio de IA no está configurado. Comprueba la variable de entorno API_KEY.");
  }

  try {
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Puck' }, // A voice that might support Spanish well
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
        return base64Audio;
    }
    throw new Error("No se pudo generar el audio. No se encontraron datos de audio en la respuesta.");
  } catch (error) {
    console.error("Error generando audio:", error);
    throw new Error("Falló la comunicación con el modelo de IA para la generación de audio.");
  }
};

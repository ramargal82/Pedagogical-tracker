
import { GoogleGenAI } from "@google/genai";
import { SessionRecord, Language } from "../types";

export const getSessionInsights = async (session: SessionRecord, lang: Language) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  
  const prompt = `
    Analiza esta sesión de entrenamiento de tenis/deportes desde una perspectiva pedagógica.
    Entrenador: ${session.coach.name}, Nivel: ${session.coach.certification}.
    Jugadores: ${session.session.numPlayers}, Nivel: ${session.session.playerLevel}.
    Actividades: ${JSON.stringify(session.activities)}

    Por favor, proporciona:
    1. Un resumen de la carga pedagógica (variabilidad, tipo de instrucción, feedback).
    2. 3 sugerencias prácticas para mejorar la sesión en base a los principios de aprendizaje motor.
    3. Una valoración sobre si el feedback y la instrucción fueron equilibrados.

    Responde exclusivamente en el idioma: ${lang === 'es' ? 'Español' : lang === 'zh' ? 'Chino' : 'Inglés'}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error al obtener insights de la IA.";
  }
};

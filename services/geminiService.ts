
import { GoogleGenAI } from "@google/genai";
import { SessionRecord } from "../types";

/**
 * Service to analyze coaching sessions using Google Gemini AI.
 * Leveraging gemini-3-flash-preview for real-time pedagogical feedback.
 */
export const analyzeSession = async (record: SessionRecord): Promise<string> => {
  // Always use process.env.API_KEY directly during initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const activitiesSummary = record.activities.map((act, index) => {
    return `Activity ${index + 1}: ${act.title}
    - Duration: ${act.duration} min
    - Active Players: ${act.numPlayers}
    - Organization: ${act.practiceOrganization.join(', ')}
    - Instructions used: ${act.instruction.join(', ')}
    - Feedback used: ${act.feedback.join(', ')}`;
  }).join('\n\n');

  const prompt = `
    Analyze the following sports coaching session from a pedagogical perspective. 
    You are an expert in motor learning and sports instruction.
    
    COACH PROFILE:
    - Experience: ${record.coach.yearsExperience} years
    - Certification: ${record.coach.certification}
    
    SESSION CONTEXT:
    - Players Level: ${record.session.playerLevel}
    - Season Phase: ${record.session.seasonPhase}
    - Session Capacity: ${record.session.numPlayers} players
    
    ACTIVITIES RECORDED:
    ${activitiesSummary}
    
    Provide a professional evaluation including:
    1. Methodological balance (Isolated vs Game-based practice).
    2. Management of players (Comparing Session Capacity vs Active Players per activity).
    3. One clear recommendation for the coach to improve student engagement or skill acquisition based on the provided data.
    
    Keep the analysis concise, under 200 words, and formatted with clear headings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Pedagogical analysis failed to generate.");
  }
};

import { GoogleGenAI } from "@google/genai";
import { SessionRecord } from "../../types";

interface Env {
  GEMINI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const record: SessionRecord = await context.request.json();
    const ai = new GoogleGenAI({ apiKey: context.env.GEMINI_API_KEY });

    const activitiesSummary = record.activities
      .map(
        (act, i) =>
          `Activity ${i + 1}: ${act.title}
    - Duration: ${act.duration} min
    - Active Players: ${act.numPlayers}
    - Organization: ${act.practiceOrganization.join(", ")}
    - Instructions used: ${act.instruction.join(", ")}
    - Feedback used: ${act.feedback.join(", ")}`
      )
      .join("\n\n");

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
    3. One clear recommendation for the coach to improve student engagement or skill acquisition.

    Keep the analysis concise, under 200 words, and formatted with clear headings.
  `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { temperature: 0.7 },
    });

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return Response.json(
      { error: "Pedagogical analysis failed to generate." },
      { status: 500 }
    );
  }
};

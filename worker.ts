import { GoogleGenAI } from "@google/genai";

interface Env {
  GEMINI_API_KEY: string;
  GOOGLE_SHEETS_WEBHOOK_URL: string;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // ── /api/analyze  (Gemini proxy) ────────────────────────────────────────
    if (url.pathname === "/api/analyze" && request.method === "POST") {
      try {
        const record: any = await request.json();
        const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

        const activitiesSummary = record.activities
          .map(
            (act: any, i: number) =>
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
    3. One clear recommendation for the coach.

    Keep the analysis concise, under 200 words, and formatted with clear headings.
  `;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { temperature: 0.7 },
        });

        return Response.json({ text: response.text });
      } catch (error) {
        console.error("Gemini error:", error);
        return Response.json(
          { error: "Pedagogical analysis failed to generate." },
          { status: 500 }
        );
      }
    }

    // ── /api/sheets  (Google Sheets proxy) ──────────────────────────────────
    if (url.pathname === "/api/sheets" && request.method === "POST") {
      const webhookUrl = env.GOOGLE_SHEETS_WEBHOOK_URL;
      if (!webhookUrl) {
        return Response.json(
          { error: "Google Sheets webhook URL not configured." },
          { status: 500 }
        );
      }
      try {
        const body = await request.json();
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const text = await response.text();
        return Response.json({ result: text });
      } catch (error) {
        console.error("Sheets error:", error);
        return Response.json(
          { error: "Failed to send data to Google Sheets." },
          { status: 500 }
        );
      }
    }

    // ── Fallback: serve static assets ────────────────────────────────────────
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

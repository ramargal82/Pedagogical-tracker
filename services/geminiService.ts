import { SessionRecord } from "../types";

/**
 * Sends the session record to the Cloudflare Worker proxy,
 * which calls the Gemini API server-side (bypasses China's firewall).
 */
export const analyzeSession = async (record: SessionRecord): Promise<string> => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error("Pedagogical analysis failed to generate.");
  }

  const data = await response.json();
  return data.text || "Could not generate analysis.";
};

import { SessionRecord } from "../types";

/**
 * Envía el registro de la sesión a /api/analyze, un proxy PHP alojado en el
 * MISMO dominio, que llama a Gemini desde el servidor.
 *
 * Por qué mismo dominio: en China, la API de Gemini está bloqueada y los
 * Workers de Cloudflare no son fiables. Una ruta relativa garantiza que la
 * petición nunca salga del dominio del propio sitio.
 */
export const analyzeSession = async (record: SessionRecord): Promise<string> => {
  let response: Response;

  try {
    response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor. Revisa tu conexión.");
  }

  if (!response.ok) {
    // El servidor devuelve {"error": "..."} en los fallos controlados.
    const detail = await response
      .json()
      .then((d) => d?.error as string | undefined)
      .catch(() => undefined);

    throw new Error(detail ?? "Pedagogical analysis failed to generate.");
  }

  const data = await response.json();
  return data.text || "Could not generate analysis.";
};

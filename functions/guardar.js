export async function onRequestPost(context) {
  try {
    // 1. Recibe los datos del entrenamiento enviados desde el móvil en China
    const datosEntrenamiento = await context.request.json();

    // ⚠️ CAMBIA ESTO: Pon aquí tu URL real de Google Apps Script o tu API de Google
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw15AvTKwApEjmX6bCnTa3y5p3_up0VrfD7gu6w8znRIMOgLyn0vkzpgjT4clddhCs/exec";

    // 2. Cloudflare (ejecutándose fuera de China) le envía los datos a Google
    const respuestaGoogle = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosEntrenamiento),
    });

    // 3. Devuelve respuesta de éxito al navegador del entrenador
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

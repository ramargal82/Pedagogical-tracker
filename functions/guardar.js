export async function onRequestPost(context) {
  // 1. Configuración de cabeceras CORS de seguridad
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // 2. Lee los datos que envían los entrenadores como texto plano/JSON
    const cuerpoTexto = await context.request.text();

    // ⚠️ CAMBIA ESTO: Pon aquí tu URL real de Google Apps Script (la que termina en /exec)
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbw15AvTKwApEjmX6bCnTa3y5p3_up0VrfD7gu6w8znRIMOgLyn0vkzpgjT4clddhCs/exec";

    // 3. Cloudflare (fuera de China) le inyecta los datos a Google Sheets
    const respuestaGoogle = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: cuerpoTexto,
    });

    // 4. Devuelve respuesta de éxito al navegador del entrenador
    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

// Manejar la petición OPTIONS preflight automática que hacen los navegadores
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

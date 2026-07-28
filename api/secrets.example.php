<?php
/**
 * Copia este archivo como  secrets.php  (misma carpeta) y rellena los valores.
 *
 * secrets.php NO se sube a GitHub: ya está en .gitignore.
 * Es seguro tenerlo aquí: al ser .php el servidor lo ejecuta en vez de mostrarlo,
 * no imprime nada, y el .htaccess de esta carpeta bloquea el acceso directo.
 * Es el mismo patrón que wp-config.php en WordPress.
 */

// Clave de Gemini: https://aistudio.google.com/apikey
// Con el free tier NO hace falta vincular cuenta de facturación.
define('GEMINI_API_KEY', 'PON_AQUI_TU_CLAVE');

// URL del Web App de Google Apps Script que escribe en tu hoja de cálculo.
// Es el mismo valor que tenías en VITE_GOOGLE_SHEETS_WEBHOOK_URL.
// Si no usas la función de enviar a Sheets, déjalo vacío.
define('GOOGLE_SHEETS_WEBHOOK_URL', '');

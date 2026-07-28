<?php
/**
 * Pedagogical Tracker — proxy servidor hacia el webhook de Google Sheets.
 * Puerto PHP de worker.ts / functions/api/sheets.ts
 *
 * script.google.com también está bloqueado en China, así que este endpoint
 * es igual de necesario que el de Gemini: el navegador chino habla con tu
 * servidor español, y es el servidor quien llama a Apps Script.
 */

declare(strict_types=1);

require_once __DIR__ . '/secrets.php';
require_once __DIR__ . '/_lib.php';

const SHEETS_TIMEOUT    = 30;
const MAX_BODY_BYTES    = 500 * 1024;
const RATE_LIMIT_MAX    = 60;
const RATE_LIMIT_WINDOW = 3600;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Método no permitido. Usa POST.');
}

if (!defined('GOOGLE_SHEETS_WEBHOOK_URL') || GOOGLE_SHEETS_WEBHOOK_URL === '') {
    fail(500, 'Google Sheets webhook URL not configured.');
}

enforceRateLimit('sheets', RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    fail(400, 'Cuerpo de la petición vacío.');
}
if (strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'Demasiados datos en una sola petición.');
}

$body = json_decode($raw, true);
if (!is_array($body)) {
    fail(400, 'JSON inválido.');
}

[$response, $status, $curlErr] = httpPostJson(
    GOOGLE_SHEETS_WEBHOOK_URL,
    $body,
    ['Content-Type: application/json'],
    SHEETS_TIMEOUT
);

if ($response === false) {
    error_log('[ptracker] Sheets cURL error: ' . $curlErr);
    fail(502, 'Failed to send data to Google Sheets.');
}

if ($status < 200 || $status >= 400) {
    error_log('[ptracker] Sheets HTTP ' . $status . ': ' . substr((string) $response, 0, 300));
    fail(502, 'Failed to send data to Google Sheets.');
}

// Apps Script devuelve texto plano; el worker original lo envolvía igual.
echo json_encode(['result' => (string) $response], JSON_UNESCAPED_UNICODE);

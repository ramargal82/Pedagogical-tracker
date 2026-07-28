<?php
/**
 * Pedagogical Tracker — proxy servidor hacia la API de Gemini.
 * Puerto PHP de worker.ts / functions/api/analyze.ts
 *
 * POR QUÉ EXISTE:
 * En China, generativelanguage.googleapis.com está bloqueado por el Gran
 * Cortafuegos, y los Workers de Cloudflare son poco fiables. Este script se
 * ejecuta en el servidor español de Host-Fusion, que sí tiene acceso libre.
 *
 *   navegador (China) --> tracker.congresodeportesraqueta.es/api/analyze  (permitido)
 *                     --> generativelanguage.googleapis.com        (desde España)
 *
 * EL PROMPT ES EL MISMO que tenías en worker.ts, palabra por palabra.
 * El comportamiento de la app no cambia.
 */

declare(strict_types=1);

require_once __DIR__ . '/secrets.php';

const GEMINI_MODEL      = 'gemini-3-flash-preview'; // el mismo de worker.ts
const GEMINI_TEMP       = 0.7;                      // la misma de worker.ts
const GEMINI_TIMEOUT    = 60;
const MAX_BODY_BYTES    = 200 * 1024;
const RATE_LIMIT_MAX    = 20;    // peticiones...
const RATE_LIMIT_WINDOW = 3600;  // ...por hora y por IP

require_once __DIR__ . '/_lib.php';

// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Método no permitido. Usa POST.');
}

if (!defined('GEMINI_API_KEY') || GEMINI_API_KEY === '' || GEMINI_API_KEY === 'PON_AQUI_TU_CLAVE') {
    fail(500, 'El servidor no tiene configurada la clave de Gemini.');
}

enforceRateLimit('analyze', RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    fail(400, 'Cuerpo de la petición vacío.');
}
if (strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'La sesión enviada es demasiado grande.');
}

$record = json_decode($raw, true);
if (!is_array($record)) {
    fail(400, 'JSON inválido.');
}

// --- Reproducción exacta del prompt de worker.ts ---------------------------

$coach      = $record['coach']      ?? [];
$session    = $record['session']    ?? [];
$activities = $record['activities'] ?? [];

$parts = [];
foreach (array_values((array) $activities) as $i => $act) {
    $parts[] = sprintf(
        "Activity %d: %s\n    - Duration: %s min\n    - Active Players: %s\n    - Organization: %s\n    - Instructions used: %s\n    - Feedback used: %s",
        $i + 1,
        (string) ($act['title'] ?? ''),
        (string) ($act['duration'] ?? ''),
        (string) ($act['numPlayers'] ?? ''),
        implode(', ', (array) ($act['practiceOrganization'] ?? [])),
        implode(', ', (array) ($act['instruction'] ?? [])),
        implode(', ', (array) ($act['feedback'] ?? []))
    );
}
$activitiesSummary = implode("\n\n", $parts);

$experience    = (string) ($coach['yearsExperience'] ?? '');
$certification = (string) ($coach['certification']   ?? '');
$playerLevel   = (string) ($session['playerLevel']   ?? '');
$seasonPhase   = (string) ($session['seasonPhase']   ?? '');
$numPlayers    = (string) ($session['numPlayers']    ?? '');

$prompt = <<<PROMPT

    Analyze the following sports coaching session from a pedagogical perspective.
    You are an expert in motor learning and sports instruction.

    COACH PROFILE:
    - Experience: {$experience} years
    - Certification: {$certification}

    SESSION CONTEXT:
    - Players Level: {$playerLevel}
    - Season Phase: {$seasonPhase}
    - Session Capacity: {$numPlayers} players

    ACTIVITIES RECORDED:
    {$activitiesSummary}

    Provide a professional evaluation including:
    1. Methodological balance (Isolated vs Game-based practice).
    2. Management of players (Comparing Session Capacity vs Active Players per activity).
    3. One clear recommendation for the coach to improve student engagement or skill acquisition.

    Keep the analysis concise, under 200 words, and formatted with clear headings.

PROMPT;

// ---------------------------------------------------------------------------

$payload = [
    'contents'         => [['parts' => [['text' => $prompt]]]],
    'generationConfig' => ['temperature' => GEMINI_TEMP],
];

$url = sprintf(
    'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent',
    GEMINI_MODEL
);

[$response, $status, $curlErr] = httpPostJson($url, $payload, [
    'Content-Type: application/json',
    'x-goog-api-key: ' . GEMINI_API_KEY,
], GEMINI_TIMEOUT);

if ($response === false) {
    error_log('[ptracker] cURL error: ' . $curlErr);
    fail(502, 'No se pudo contactar con el servicio de análisis.');
}

if ($status !== 200) {
    error_log('[ptracker] Gemini HTTP ' . $status . ': ' . substr((string) $response, 0, 500));
    fail(502, 'El servicio de análisis devolvió un error (' . $status . ').');
}

$data = json_decode((string) $response, true);
$text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

if (!is_string($text) || $text === '') {
    $reason = $data['candidates'][0]['finishReason'] ?? 'desconocido';
    error_log('[ptracker] Respuesta sin texto. finishReason=' . $reason);
    fail(502, 'El modelo no devolvió ningún análisis (motivo: ' . $reason . ').');
}

echo json_encode(['text' => $text], JSON_UNESCAPED_UNICODE);

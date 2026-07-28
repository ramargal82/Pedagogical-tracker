<?php
/**
 * Utilidades compartidas por analyze.php y sheets.php.
 * Este archivo no responde a peticiones directas (lo bloquea el .htaccess).
 */

declare(strict_types=1);

/** Devuelve un error JSON y termina. */
function fail(int $status, string $message): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Límite por IP basado en ficheros. Protege tu cuota del free tier. */
function enforceRateLimit(string $bucket, int $max, int $window): void
{
    $dir = sys_get_temp_dir() . '/ptracker_rl';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $ip   = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $file = $dir . '/' . $bucket . '_' . hash('sha256', $ip) . '.json';
    $now  = time();

    $hits = [];
    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = $decoded;
        }
    }

    $hits = array_values(array_filter(
        $hits,
        static fn($t) => is_int($t) && ($now - $t) < $window
    ));

    if (count($hits) >= $max) {
        fail(429, 'Demasiadas peticiones. Inténtalo de nuevo dentro de un rato.');
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
}

/**
 * POST de JSON con cURL.
 * @return array{0: string|false, 1: int, 2: string} [respuesta, códigoHTTP, errorCurl]
 */
function httpPostJson(string $url, array $payload, array $headers, int $timeout): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,   // Apps Script redirige a script.googleusercontent.com
        CURLOPT_MAXREDIRS      => 5,
        CURLOPT_TIMEOUT        => $timeout,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => $headers,
    ]);

    $response = curl_exec($ch);
    $status   = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err      = curl_error($ch);
    curl_close($ch);

    return [$response, $status, $err];
}

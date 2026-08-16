import crypto from 'crypto';

/**
 * Creates a stable SHA-256 fingerprint from an error.
 * Used to deduplicate recurring errors in the error_reports table.
 *
 * The fingerprint is derived from:
 *  - The error message (normalised — numbers stripped to reduce noise)
 *  - The first meaningful stack frame (file + line)
 *  - The route path (to distinguish same error on different pages)
 *
 * This means the same logical bug always produces the same fingerprint,
 * regardless of which user triggered it or what specific ID was in the URL.
 */
export function createFingerprint(
  message: string,
  stack?: string,
  routePath?: string,
): string {
  // Normalize message: strip dynamic IDs/numbers to reduce false-unique fingerprints
  // e.g. "User 1234 not found" → "User <id> not found"
  const normalizedMessage = message
    .replace(/\b[0-9a-f]{8,}\b/gi, '<id>')   // hex IDs
    .replace(/\b\d{4,}\b/g, '<n>');           // long numbers

  // Extract first meaningful stack frame (skip node_modules)
  const firstFrame = stack
    ?.split('\n')
    .find((line) => line.includes('at ') && !line.includes('node_modules'))
    ?.trim() ?? '';

  const raw = `${normalizedMessage}|${firstFrame}|${routePath ?? ''}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 64);
}

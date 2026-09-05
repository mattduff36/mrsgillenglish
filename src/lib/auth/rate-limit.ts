type Bucket = { count: number; resetAt: number };

const attempts = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function registerLoginAttempt(key: string): boolean {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  current.count += 1;
  return current.count <= MAX_ATTEMPTS;
}

export function loginAllowed(key: string): boolean {
  const current = attempts.get(key);
  if (!current || current.resetAt < Date.now()) return true;
  return current.count < MAX_ATTEMPTS;
}

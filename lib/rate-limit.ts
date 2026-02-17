const hits = new Map<string, { count: number; resetAt: number }>();

export function enforceRateLimit(key: string, max = 30, windowMs = 60_000) {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || record.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= max) return false;
  record.count += 1;
  return true;
}

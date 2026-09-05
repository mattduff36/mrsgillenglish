export function isProduction(): boolean {
  return process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
}

export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH,
  );
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function canPersistContent(): boolean {
  if (isProduction()) return isBlobConfigured();
  return true;
}

export function persistenceMode(): "blob" | "local" | "seed-only" {
  if (isBlobConfigured()) return "blob";
  if (!isProduction()) return "local";
  return "seed-only";
}

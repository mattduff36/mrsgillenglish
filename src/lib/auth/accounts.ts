export const MAX_ADMIN_ACCOUNTS = 4;

export type AdminAccount = {
  email: string;
  hash: string;
};

type EnvMap = Record<string, string | undefined>;

function readSlot(
  env: EnvMap,
  index: number,
): { email: string; hash: string } {
  const numberedEmail = env[`ADMIN_EMAIL_${index}`];
  const numberedHash = env[`ADMIN_PASSWORD_HASH_${index}`];
  const legacyEmail = index === 1 ? env.ADMIN_EMAIL : undefined;
  const legacyHash = index === 1 ? env.ADMIN_PASSWORD_HASH : undefined;

  return {
    email: String(numberedEmail || legacyEmail || "")
      .trim()
      .toLowerCase(),
    hash: String(numberedHash || legacyHash || "").trim(),
  };
}

export function getAdminAccounts(env: EnvMap = process.env): AdminAccount[] {
  const accounts: AdminAccount[] = [];
  const seen = new Set<string>();

  for (let index = 1; index <= MAX_ADMIN_ACCOUNTS; index += 1) {
    const slot = readSlot(env, index);
    if (!slot.email && !slot.hash) continue;
    if (!slot.email || !slot.hash) continue;
    if (seen.has(slot.email)) continue;
    seen.add(slot.email);
    accounts.push(slot);
  }

  return accounts;
}

export function findAdminAccount(
  email: string,
  env: EnvMap = process.env,
): AdminAccount | undefined {
  const normalised = email.trim().toLowerCase();
  return getAdminAccounts(env).find((account) => account.email === normalised);
}

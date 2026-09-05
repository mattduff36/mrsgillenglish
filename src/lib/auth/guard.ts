import { auth } from "@/auth";
import { assertAdminSession } from "@/lib/auth/session";
import { isAuthConfigured } from "@/lib/content/config";

export { assertAdminSession };

export async function requireAdmin() {
  if (!isAuthConfigured()) {
    throw new Error("Admin login is not configured.");
  }
  return assertAdminSession(await auth());
}

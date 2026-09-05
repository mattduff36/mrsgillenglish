export function assertAdminSession(
  session: { user?: { email?: string | null } } | null,
) {
  if (!session?.user?.email) {
    throw new Error("You need to sign in first.");
  }
  return session;
}

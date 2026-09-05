import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthConfigured, persistenceMode } from "@/lib/content/store";

function persistNote() {
  const mode = persistenceMode();
  if (mode === "blob") return "Changes save to the hosted content store.";
  if (mode === "local") return "Changes save to a local file on this computer.";
  return "Saving is blocked until hosted storage is configured.";
}

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthConfigured()) {
    return (
      <div className="min-h-full bg-navy-deep px-6 py-16 text-parchment">
        <h1 className="font-display text-3xl font-semibold">Site editor is not ready</h1>
        <p className="mt-4 max-w-lg text-parchment/80">
          Set AUTH_SECRET and at least one ADMIN_EMAIL_1 / ADMIN_PASSWORD_HASH_1
          pair before signing in. Up to four admin accounts are supported. See
          the project README.
        </p>
      </div>
    );
  }

  const session = await auth();
  if (!session?.user?.email) redirect("/admin/login");

  return (
    <AdminShell email={session.user.email} persistNote={persistNote()}>
      {children}
    </AdminShell>
  );
}

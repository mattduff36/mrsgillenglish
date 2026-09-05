"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = { ok: false, message: "" };

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-full items-center justify-center bg-navy-deep px-4 py-16">
      <main className="w-full max-w-md rounded-xl border border-white/10 bg-navy p-8 text-parchment shadow-[0_24px_48px_-28px_rgb(0_0_0_/_0.6)]">
        <p className="text-sm font-semibold tracking-wide text-brass">Mrs Gill English</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Site editor</h1>
        <p className="mt-3 text-sm leading-relaxed text-parchment/75">
          Sign in to update the public website. This page is private and is not
          listed on the site.
        </p>
        <form action={action} className="mt-8 space-y-4">
          {state.message ? (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-950">
              {state.message}
            </p>
          ) : null}
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brass"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-brass"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-parchment font-semibold text-navy hover:bg-page disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </div>
  );
}

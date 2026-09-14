"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import type { ActionState } from "@/app/admin/actions";

const initial: ActionState = { ok: false, message: "" };

export function AdminForm({
  action,
  children,
  saveLabel = "Save changes",
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  children: ReactNode;
  saveLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    function onLeave(event: BeforeUnloadEvent) {
      if (dirty && !pending) event.preventDefault();
    }
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty, pending]);

  return (
    <form
      action={(formData) => {
        setDirty(false);
        formAction(formData);
      }}
      onChange={() => setDirty(true)}
      className="space-y-6"
    >
      {state.message ? (
        <p
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.ok
              ? "border-navy/20 bg-parchment text-navy"
              : "border-red-800/30 bg-red-50 text-red-950"
          }`}
        >
          {state.ok ? "Saved. " : ""}
          {state.message}
        </p>
      ) : null}
      {children}
      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center rounded-lg bg-navy px-5 font-semibold text-navy-foreground hover:bg-navy-deep disabled:opacity-60"
        >
          {pending ? "Saving…" : saveLabel}
        </button>
        {dirty && !pending ? (
          <p className="text-sm text-parchment/70">You have unsaved changes.</p>
        ) : null}
      </div>
    </form>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  hint,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-parchment">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment outline-none focus-visible:ring-2 focus-visible:ring-brass"
      />
      {hint ? <span className="mt-1 block text-sm text-parchment/65">{hint}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  hint,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-parchment">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment outline-none focus-visible:ring-2 focus-visible:ring-brass"
      />
      {hint ? <span className="mt-1 block text-sm text-parchment/65">{hint}</span> : null}
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  hint,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-parchment">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment outline-none focus-visible:ring-2 focus-visible:ring-brass"
      >
        {children}
      </select>
      {hint ? <span className="mt-1 block text-sm text-parchment/65">{hint}</span> : null}
    </label>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-navy-deep/60 px-3 py-3">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 size-4 accent-brass"
      />
      <span>
        <span className="block font-semibold text-parchment">{label}</span>
        {hint ? <span className="block text-sm text-parchment/65">{hint}</span> : null}
      </span>
    </label>
  );
}

export function ConfirmSubmit({
  name,
  value,
  children,
  message,
}: {
  name: string;
  value: string;
  children: ReactNode;
  message: string;
}) {
  return (
    <button
      type="submit"
      name={name}
      value={value}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className="min-h-10 rounded-lg border border-white/20 px-3 text-sm font-semibold text-parchment hover:bg-white/5"
    >
      {children}
    </button>
  );
}

export function MoveButtons({ index }: { index: number }) {
  return (
    <div className="flex gap-2">
      <button
        type="submit"
        name="move"
        value={`up-${index}`}
        className="min-h-10 rounded-lg border border-white/20 px-3 text-sm text-parchment hover:bg-white/5"
      >
        Move up
      </button>
      <button
        type="submit"
        name="move"
        value={`down-${index}`}
        className="min-h-10 rounded-lg border border-white/20 px-3 text-sm text-parchment hover:bg-white/5"
      >
        Move down
      </button>
    </div>
  );
}

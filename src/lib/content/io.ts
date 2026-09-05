import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";
import {
  canPersistContent,
  isBlobConfigured,
  isProduction,
} from "./config";
import { createSeedContent } from "./seed";
import { siteContentSchema, type SiteContent } from "./schema";

export const BLOB_PATH = "mrs-gill/site-content.json";

export {
  canPersistContent,
  isBlobConfigured,
  isProduction,
} from "./config";

export function localContentPath(): string {
  if (process.env.CONTENT_DATA_PATH && process.env.VERCEL !== "1") {
    return process.env.CONTENT_DATA_PATH;
  }
  return path.join(process.cwd(), ".data", "site-content.json");
}

export function isMissingContentError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String(error.code) : "";
  if (code === "ENOENT" || code === "404" || code === "not_found") return true;
  const status = "status" in error ? Number(error.status) : NaN;
  if (status === 404) return true;
  const message = error instanceof Error ? error.message : String(error);
  return /not found|404|nosuchkey|does not exist/i.test(message);
}

async function readBlob(): Promise<SiteContent | null> {
  if (!isBlobConfigured()) return null;
  let result: Awaited<ReturnType<typeof get>>;
  try {
    result = await get(BLOB_PATH, {
      access: "private",
      useCache: false,
    });
  } catch (error) {
    if (isMissingContentError(error)) return null;
    throw new Error("The saved website content could not be read.");
  }
  if (!result) return null;
  const text = await new Response(result.stream).text();
  return siteContentSchema.parse(JSON.parse(text));
}

async function writeBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readLocal(): Promise<SiteContent | null> {
  try {
    const text = await readFile(/* turbopackIgnore: true */ localContentPath(), "utf8");
    return siteContentSchema.parse(JSON.parse(text));
  } catch (error) {
    if (isMissingContentError(error)) return null;
    throw error;
  }
}

async function writeLocal(content: SiteContent): Promise<void> {
  const file = localContentPath();
  await mkdir(/* turbopackIgnore: true */ path.dirname(file), { recursive: true });
  await writeFile(/* turbopackIgnore: true */ file, JSON.stringify(content, null, 2), "utf8");
}

export async function readStoredContent(): Promise<SiteContent> {
  if (isBlobConfigured()) {
    return (await readBlob()) ?? createSeedContent();
  }
  if (!isProduction()) {
    return (await readLocal()) ?? createSeedContent();
  }
  return createSeedContent();
}

export async function writeStoredContent(content: SiteContent): Promise<void> {
  if (!canPersistContent()) {
    throw new Error(
      "Content cannot be saved here. Production needs BLOB_READ_WRITE_TOKEN.",
    );
  }
  if (isBlobConfigured()) {
    await writeBlob(content);
    return;
  }
  await writeLocal(content);
}

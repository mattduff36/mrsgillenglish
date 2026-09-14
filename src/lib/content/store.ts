import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import {
  canPersistContent,
  isAuthConfigured,
  isBlobConfigured,
  isProduction,
  persistenceMode,
} from "./config";
import { readStoredContent, writeStoredContent } from "./io";
import { parseSiteContent, type SiteContent } from "./schema";

export const CONTENT_TAG = "site-content";

export {
  canPersistContent,
  isAuthConfigured,
  isBlobConfigured,
  isProduction,
  persistenceMode,
};

const readCached = unstable_cache(readStoredContent, ["site-content-document"], {
  tags: [CONTENT_TAG],
});

export async function getSiteContent(): Promise<SiteContent> {
  return readCached();
}

export async function saveSiteContent(input: unknown): Promise<SiteContent> {
  const content = parseSiteContent(input);
  await writeStoredContent(content);
  revalidateTag(CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/revision");
  revalidatePath("/privacy");
  return content;
}

export async function readSiteContentFresh(): Promise<SiteContent> {
  return readStoredContent();
}

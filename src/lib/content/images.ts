const LOCAL_IMAGE = /^\/(images|brand)\/[A-Za-z0-9._/-]+$/;

export function isBlockedHostname(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "::1" ||
    host === "0.0.0.0" ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
    const parts = host.split(".").map(Number);
    const [a, b] = parts;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b !== undefined && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }

  if (host.includes(":")) {
    if (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) {
      return true;
    }
  }

  return false;
}

export function isAllowedLocalImagePath(value: string): boolean {
  if (!LOCAL_IMAGE.test(value)) return false;
  if (value.includes("..") || value.includes("//") || value.includes("%") || value.includes("\\")) {
    return false;
  }
  return true;
}

export function isAllowedImageRef(value: string): boolean {
  if (!value) return false;
  if (/[<>]/.test(value) || /javascript:/i.test(value) || /^data:/i.test(value)) {
    return false;
  }
  if (value.startsWith("/")) {
    return isAllowedLocalImagePath(value);
  }
  if (value.startsWith("//") || /^http:\/\//i.test(value)) {
    return false;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (url.username || url.password) return false;
    if (isBlockedHostname(url.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

export function imageRefMessage(value: string): string {
  if (!value.trim()) return "Enter a /images or /brand path, or an https image URL.";
  return "Use a /images or /brand path, or a public https image URL. Do not use private hosts or other schemes.";
}

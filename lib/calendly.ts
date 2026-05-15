/** Ensure Calendly embed URLs are absolute scheduling links. */
export function normalizeCalendlyUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) {
    return "https://calendly.com";
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://calendly.com/${trimmed.replace(/^\//, "")}`;
}

export function isLikelyPlaceholderCalendlyUrl(url: string): boolean {
  return (
    url.includes("parallel-solutions/discovery-call") ||
    url.includes("your-org/") ||
    url === "https://calendly.com"
  );
}

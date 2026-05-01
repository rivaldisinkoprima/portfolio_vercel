import fs from "fs";
import path from "path";

export interface Certificate {
  id: number;
  filename: string;
  src: string;
  extension: string;
}

const SUPPORTED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

function getCertificatesFromFilesystem(): Certificate[] {
  const publicDir = path.join(process.cwd(), "public", "certificate");

  if (!fs.existsSync(publicDir)) return [];

  const files = fs.readdirSync(publicDir);
  const seen = new Map<number, Certificate>();

  for (const filename of files) {
    const match = filename.match(/^certificate(\d+)\.([a-z]+)$/i);
    if (!match) continue;
    const id = parseInt(match[1], 10);
    const ext = match[2].toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
    // Keep only first match per id (prefer jpg over others by sort order)
    if (!seen.has(id)) {
      seen.set(id, { id, filename, src: `/certificate/${filename}`, extension: ext });
    }
  }

  // Sort by id ascending
  return Array.from(seen.values()).sort((a, b) => a.id - b.id);
}

export function getCertificates(): Certificate[] {
  return getCertificatesFromFilesystem();
}

export const certificateFilenames: string[] = (() => {
  const certs = getCertificatesFromFilesystem();
  return certs.map((c) => c.src);
})();

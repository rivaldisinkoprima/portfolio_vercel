import fs from "fs";
import path from "path";

export interface Certificate {
  id: number;
  filename: string;
  src: string;
  extension: string;
}

const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];
const MAX_CERTIFICATES = 20;

function getCertificatesFromFilesystem(): Certificate[] {
  const certificates: Certificate[] = [];
  const publicDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    return certificates;
  }

  const files = fs.readdirSync(publicDir);

  for (let i = 1; i <= MAX_CERTIFICATES; i++) {
    for (const ext of SUPPORTED_EXTENSIONS) {
      const filename = `certificate${i}.${ext}`;
      if (files.includes(filename)) {
        certificates.push({
          id: i,
          filename,
          src: `/${filename}`,
          extension: ext,
        });
        break;
      }
    }
  }

  return certificates;
}

export function getCertificates(): Certificate[] {
  return getCertificatesFromFilesystem();
}

export const certificateFilenames: string[] = (() => {
  const certs = getCertificatesFromFilesystem();
  return certs.map((c) => c.src);
})();

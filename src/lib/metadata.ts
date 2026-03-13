import { Metadata } from "next";

type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  images?: OpenGraphImage[];
}

const SITE_URL = "https://www.valporto.my.id";
const DEFAULT_IMAGE = "/og-image.svg";

export function createPageMetadata({
  title,
  description,
  path,
  images = [],
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Rivaldi Eka Putra`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        id: url,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: "id_ID",
      url,
      siteName: "Rivaldi Eka Putra Portfolio",
      title: fullTitle,
      description,
      images: images.length > 0 ? images : [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: "Rivaldi Eka Putra Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.length > 0 ? [images[0].url] : [DEFAULT_IMAGE],
    },
  };
}

export const siteMetadata = {
  name: "Rivaldi Eka Putra",
  title: "Polyglot Engineer - AI, IoT, Web & Mobile Developer",
  description: "Portfolio Rivaldi Eka Putra - Full Stack Developer spesialis AI, IoT, Web, dan Mobile Development.",
  url: SITE_URL,
  email: "rivaldiekaputr@gmail.com",
  phone: "+62895616181056",
  location: "Jakarta, Indonesia",
  social: {
    instagram: "https://instagram.com/rivaldiekaptr",
    linkedin: "https://www.linkedin.com/in/rivaldiekaputr/",
    whatsapp: "https://wa.me/62895616181056",
  },
} as const;

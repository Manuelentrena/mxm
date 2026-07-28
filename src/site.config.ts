const dayMs = 24 * 60 * 60 * 1000;

export const siteConfig = {
  copyright: {
    text: "© 2026 ",
    linkText: "entrena.dev",
    linkUrl: "https://entrena.dev",
    suffix: " Todos los derechos reservados.",
  },
  heroMedia: {
    image: "https://res.cloudinary.com/manuelentrena/image/upload/v1785241205/MxM/hero_s87bgk.webp",
    caption: "2026.5.30",
    imageAlt: "Una foto de nosotros juntos, sonriendo y felices.",
  },
  relationship: {
    startDate: "2026-2-04",
  },
} as const;

export function getTogetherDays(referenceDate = new Date()) {
  const [year, month, day] = siteConfig.relationship.startDate.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);
  const current = Date.UTC(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return Math.max(1, Math.floor((current - start) / dayMs) + 1);
}

export function formatDateLabel(date = siteConfig.relationship.startDate) {
  return date.replaceAll("-", ".");
}

export function cloudinaryUrl(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

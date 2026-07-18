export const siteConfig = {
  name: "Jose Graphics",
  legalName: "Jose Graphics",
  tagline: "Your In-House Art Department",
  founder: "Jose Ajimon",
  description:
    "Jose Graphics is a vector conversion and embroidery digitizing studio led by Jose Ajimon, turning raster artwork into scalable, production-ready vector graphics for advertising, apparel, and embroidery clients worldwide.",
  url: "https://www.josegraphics.com",
  email: "artwork@josegraphics.com",
  secondaryEmail: "joseajimon@yahoo.com",
  whatsapp: "+919840281837",
  whatsappDisplay: "+91 98402 81837",
  founded: 2006,
  areaServed: [
    "United States",
    "Germany",
    "United Arab Emirates",
    "France",
    "Russia",
    "United Kingdom",
    "Japan",
    "China",
  ],
  areaServedCodes: ["US", "DE", "AE", "FR", "RU", "GB", "JP", "CN"],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export function whatsappHref(prefilledMessage?: string) {
  const number = siteConfig.whatsapp.replace(/[^\d]/g, "");
  const text = prefilledMessage ? `?text=${encodeURIComponent(prefilledMessage)}` : "";
  return `https://wa.me/${number}${text}`;
}

import type { Metadata } from "next";
import { Fraunces, Inter, Anton } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappButton } from "@/components/whatsapp-button";
import { OrganizationJsonLd } from "@/components/organization-json-ld";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// A bold, ultra-condensed display grotesque (in the spirit of Mango
// Grotesque, which isn't distributed via any font CDN/registry) used only
// for the home page hero captions — the rest of the site keeps Fraunces.
const anton = Anton({
  variable: "--font-mango",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "vector conversion",
    "raster to vector",
    "embroidery digitizing",
    "logo digitizing",
    "vector artwork services",
    "graphic design outsourcing",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <OrganizationJsonLd />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        {modal}
        <SiteFooter />
        <WhatsappButton />
        <Toaster position="bottom-right" duration={6000} />
      </body>
    </html>
  );
}

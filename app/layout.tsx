import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionProvider } from "@/components/motion";
import SiteMotion from "@/components/site-motion";

const inter = localFont({
  src: [
    { path: "./fonts/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/InterDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const site = "https://www.mdprana.site";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Prana — Data Scientist & ML Engineer",
    template: "%s — Prana",
  },
  description:
    "Portfolio of Prana, a data scientist and ML engineer building machine learning models, data pipelines, and web experiences.",
  openGraph: {
    type: "website",
    url: site,
    siteName: "Prana",
    title: "Prana — Data Scientist & ML Engineer",
    description:
      "Machine learning models, data pipelines, and web experiences that are accurate, fast, and measurable.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">
        <MotionProvider>
          {children}
          <SiteMotion />
        </MotionProvider>
      </body>
    </html>
  );
}

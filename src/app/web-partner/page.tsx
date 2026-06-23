import type { Metadata } from "next";
import WebPartnerClient from "./WebPartnerClient";

export const metadata: Metadata = {
  title: "Build Your Website — Official Web Partner",
  description: "WebHance is the Official Web Partner of ARES Business League 2026. Get premium, high-performance websites that drive real business growth for your brand.",
  openGraph: {
    title: "Build Your Website | WebHance × ARES Business League",
    description: "Premium custom websites by the Official Web Partner of ABL 2026. Fast. SEO-optimised. Built to grow your business.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Website | WebHance × ARES Business League",
    description: "Premium custom websites by the Official Web Partner of ABL 2026.",
  },
};

export default function WebPartnerPage() {
  return <WebPartnerClient />;
}

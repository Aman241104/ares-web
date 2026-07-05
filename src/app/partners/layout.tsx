import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "Meet the proud partners and sponsors powering ARES Business League 2026 — building businesses, building the nation.",
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every milestone, every victory, every connection from ARES Business League 2026 — captured and preserved forever.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

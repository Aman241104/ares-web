import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | ARES Business League 2026",
  },
  description: "Stories, strategies, and unfiltered insights from the arena floor to the boardroom — every perspective, every victory, every lesson from ABL 2026.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

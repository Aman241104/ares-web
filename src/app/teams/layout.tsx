import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "The 4 Teams",
    template: "%s | ARES Business League 2026",
  },
  description: "Four iconic team owners. Thirty elite business builders. One legendary tournament to define who leads the nation.",
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

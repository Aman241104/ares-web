import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule & Events",
  description: "Dynamic schedule, real-time updates. Track every upcoming event, challenge, and milestone for ABL 2026.",
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

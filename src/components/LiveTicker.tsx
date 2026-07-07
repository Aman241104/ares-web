"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import gsap from "gsap";

const activities = [
  "🏆 ARES Business League 2026 is LIVE — Week 1 underway",
  "🤝 4 teams. 30 business owners. 1 championship.",
  "📈 Scores refresh every Wednesday — check the leaderboard",
  "🔥 STRONG START. STRONGER IMPACT. — this week's theme",
  "⚡ Every referral, every meeting, every point counts",
  "👑 The race for the trophy has begun",
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(".live-ticker-content", { opacity: 0, y: 5, duration: 0.4, onComplete: () => {
        setIndex((prev) => (prev + 1) % activities.length);
        gsap.fromTo(".live-ticker-content", { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.4 });
      }});
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex fixed bottom-6 right-6 z-[900] bg-[#030712]/80 backdrop-blur-xl px-5 py-4 rounded-xl border border-white/10 items-center gap-4 shadow-2xl">
      <div className="relative flex items-center justify-center flex-shrink-0">
        <div className="absolute w-3 h-3 rounded-full bg-green-500/50 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-green-500 relative z-10" />
      </div>
      <Bell className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
      <div className="font-montserrat text-white/80 text-[10px] tracking-widest uppercase w-full xl:w-64 overflow-hidden">
        <div className="live-ticker-content truncate">{activities[index]}</div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import gsap from "gsap";

const activities = [
  "🏆 Team Modi leads with 1,285 points — Week 1 Champions",
  "🤝 610 referrals passed across all teams this week",
  "📈 ₹3.4M in TYFCB generated — and the season has just begun",
  "🔥 1,078 one-to-one meetings completed across 4 teams",
  "⚡ Week 1: STRONG START. STRONGER IMPACT. — underway",
  "👑 Team Doval closing in — only 125 points behind the lead",
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
    <div className="fixed bottom-6 right-6 z-[900] bg-[#0C0900]/80 backdrop-blur-xl px-5 py-4 rounded-xl border border-white/10 flex items-center gap-4 shadow-2xl">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-3 h-3 rounded-full bg-green-500/50 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-green-500 relative z-10" />
      </div>
      <Bell className="w-4 h-4 text-[#D4AF37]" />
      <div className="font-montserrat text-white/80 text-[10px] tracking-widest uppercase w-64 overflow-hidden">
        <div className="live-ticker-content">{activities[index]}</div>
      </div>
    </div>
  );
}

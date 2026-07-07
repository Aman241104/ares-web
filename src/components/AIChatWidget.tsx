"use client";
import { useState } from "react";
import Script from "next/script";
import { MessageCircle, X } from "lucide-react";

// Live demo of Gravity Media Marketing's own AI chat product - the "Website Widget" feature of
// the WhatsApp AI Agent platform (whatsapp-ai-agent-inky.vercel.app). Mounted once in the root
// layout (not inside a page's own component tree) so it survives client-side navigation between
// every route, including /contact and /about — widget.js queries its target div exactly once on
// script load and never retries, so if this lived inside a per-page component (e.g. GlobalCTA,
// which CTARenderer unmounts on /contact and /about), navigating away and back would remount a
// brand new target div that the already-loaded script would never bind to again, permanently
// breaking the chat until a full page reload. Keeping this outside {children} avoids that entirely.
const AI_WIDGET_SITE_ID = "f5cd9777-83a2-44f5-a880-088b0d6de332";
const AI_WIDGET_SCRIPT_SRC = "https://whatsapp-ai-agent-inky.vercel.app/widget.js";

export default function AIChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {!chatOpen && (
        <div className="hidden xl:flex fixed bottom-9 right-28 z-[998] items-center gap-2 bg-[#0B1120] ring-1 ring-[#D4AF37]/30 rounded-full pl-4 pr-5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] animate-[fadeIn_0.6s_ease]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-white/80 text-[11px] font-semibold tracking-wide whitespace-nowrap">Ask our AI Assistant about Gravity or ABL 2026</span>
        </div>
      )}

      <div
        className={`fixed left-4 right-4 bottom-40 xl:left-auto xl:right-6 xl:bottom-24 xl:w-[380px] z-[999] rounded-2xl overflow-hidden bg-[#0B1120] ring-1 ring-[#D4AF37]/25 shadow-[0_25px_70px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          chatOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setChatOpen(false)}
          aria-label="Close chat"
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div id="gravity-ai-widget" className="h-[65vh] max-h-[440px] xl:h-[480px] xl:max-h-none" style={{ isolation: "isolate" }} />
      </div>
      <Script src={AI_WIDGET_SCRIPT_SRC} data-site-id={AI_WIDGET_SITE_ID} data-target="#gravity-ai-widget" strategy="lazyOnload" />

      <button
        onClick={() => setChatOpen((v) => !v)}
        aria-label={chatOpen ? "Close AI Assistant" : "Open AI Assistant chat"}
        className="fixed bottom-24 right-4 w-14 h-14 xl:bottom-6 xl:right-6 xl:w-16 xl:h-16 z-[999] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] ring-1 ring-white/10 shadow-[0_10px_30px_rgba(212,175,55,0.5)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.7)] hover:scale-105 flex items-center justify-center transition-all duration-300"
      >
        {chatOpen ? (
          <X className="w-5 h-5 xl:w-6 xl:h-6 text-[#050B0A]" strokeWidth={2.25} />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 xl:w-7 xl:h-7 text-[#050B0A]" strokeWidth={2.25} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#FFC200] ring-2 ring-[#050B0A] animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}

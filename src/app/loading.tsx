export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0B132B] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-t border-b border-[#D4AF37] opacity-60 animate-spin" style={{ animationDuration: '2s' }} />
        {/* Inner static ring */}
        <div className="absolute inset-2 rounded-full border border-white/10" />
        {/* Center dot */}
        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
      </div>
      <div className="mt-8 font-cinzel text-white/40 text-[10px] tracking-[0.4em] uppercase animate-pulse">
        Initializing
      </div>
    </div>
  );
}

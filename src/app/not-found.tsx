import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#000000] flex flex-col items-center justify-center relative overflow-hidden py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <h1 className="font-cinzel font-light text-[#D4AF37] leading-none mb-4" style={{ fontSize: "clamp(80px, 15vw, 150px)" }}>
          404
        </h1>
        <div className="h-px w-20 bg-white/20 mx-auto mb-8" />
        <h2 className="font-montserrat text-white text-xl tracking-[0.3em] uppercase font-bold mb-6">
          Lost in the Arena
        </h2>
        <p className="font-montserrat text-white/50 text-sm leading-relaxed mb-12 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed in the ARES Business League records.
        </p>
        
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Base
        </Link>
      </div>
    </div>
  );
}

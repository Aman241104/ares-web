"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh]">
      <Command 
        className="w-[90%] max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        label="Global Command Menu"
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <Search className="w-4 h-4 text-white/40" />
          <Command.Input 
            autoFocus
            className="w-full bg-transparent border-none text-white p-4 focus:outline-none focus:ring-0 placeholder:text-white/30 font-montserrat" 
            placeholder="Search teams, members, or events..." 
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="p-4 text-center text-white/40 font-montserrat text-sm">No results found.</Command.Empty>

          <Command.Group heading="Teams" className="text-[10px] uppercase tracking-widest text-white/40 p-2 font-montserrat">
            <Command.Item onSelect={() => { setOpen(false); router.push("/teams/modi") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Team Modi</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/teams/doval") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Team Doval</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/teams/amit-shah") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Team Amit Shah</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/teams/jaishankar") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Team Jaishankar</Command.Item>
          </Command.Group>

          <Command.Group heading="Quick Links" className="text-[10px] uppercase tracking-widest text-white/40 p-2 font-montserrat mt-2">
            <Command.Item onSelect={() => { setOpen(false); router.push("/leaderboard") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Leaderboard</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/schedule") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Schedule</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/blog") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">The Arena Blog</Command.Item>
            <Command.Item onSelect={() => { setOpen(false); router.push("/wall-of-fame") }} className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white/80 hover:bg-white/10 hover:text-white">Wall of Fame</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
      
      {/* Click outside to close overlay */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
    </div>
  );
}

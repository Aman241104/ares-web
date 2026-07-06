<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# ARES Business League 2026 — Agent Brief

## What This Project Is
Marketing/portfolio site for the **ARES Business League 2026 ("Nation Builders Edition")** — a one-month BNI business tournament, 30 members across 4 teams. Built and maintained by **Gravity Media Marketing** (Gaurav Mehta's agency), who are credited site-wide as "Official Web & Media Partner."

**Intended domain:** `aresbusinessleague.com` (referenced throughout `layout.tsx` metadata/OpenGraph) — **not actually connected in this Vercel account as of 2026-07-06** (`vercel domains ls` doesn't list it, DNS doesn't resolve). Confirm whether that's expected before assuming the site is publicly reachable there.
**Vercel project:** `aman241104s-projects/ares-web` (deploys via `npx vercel --prod`, no `vercel.json`).

## Stack
| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) | Same breaking-changes caveat as above |
| UI | React 19 + Tailwind 4 + lucide-react | Cinzel/Montserrat/Cormorant Garamond fonts (gold/navy "arena" aesthetic) |
| Animation | GSAP + ScrollTrigger, Lenis (smooth scroll), split-type | Most pages use `gsap.context()` scroll-reveal patterns — see `GlobalCTA.tsx` for the reference pattern |
| Data | `src/lib/data.ts` — hardcoded teams/schedule/partners/rules, no CMS/DB | Contains real team-member contact info (phone/email) — do not surface that in any public-facing feature (e.g. the AI widget KB deliberately excludes it) |

## File Map (partial — see `src/app` for full route list)
- `src/lib/data.ts` — teams, `tournamentRules`, `specialEvents`, `partners` — source of truth for any ABL facts
- `src/components/GlobalCTA.tsx` + `CTARenderer.tsx` — the site-wide "Official Web & Media Partner" CTA (rendered on every page except `/contact`/`/about`), promotes Gravity Media Marketing
- `src/components/Navbar.tsx`, `Footer.tsx`, `MobileDock.tsx`, `CommandMenu.tsx` — global chrome

## Website AI Widget (added 2026-07-06)
`GlobalCTA.tsx` embeds a live, working AI chat widget (inline `data-target` mode, not a floating bubble) — a real product built in the sibling `whatsapp-agents/dashboard` project, not a mockup:
```html
<script src="https://whatsapp-ai-agent-inky.vercel.app/widget.js" data-site-id="f5cd9777-83a2-44f5-a880-088b0d6de332" data-target="#gravity-ai-widget" async />
```
That site id is the **Gravity Media Marketing** workspace in the WhatsApp AI Agent dashboard — its knowledge base covers Gravity's own services and real ABL facts (from `src/lib/data.ts`), so visitors can ask it about either. No WhatsApp number involved — it's the dashboard's new "web" channel. See `whatsapp-agents/dashboard/AGENTS.md`'s 2026-07-06 handoff for the full build. To change the widget's greeting/color, log into that dashboard → Settings → Website Widget (do not hardcode changes here beyond the site id).

## Known Issue (as of 2026-07-06)
`GlobalCTA.tsx`'s outer `<section>` background was independently changed from light (`#FDFBF7`) to dark (`#030712`) by a concurrent editing session, but the left-column text colors (heading, description, feature list — all originally tuned for a light background) were not updated to match, so they're currently low-contrast. Fix before considering this section done — verify current state first, this may already be resolved by the time you read this.

## Testing
No test runner configured (`package.json` has no `test` script, no `vitest`/`jest` config, no test files exist anywhere in this repo). `tdd-guard` is disabled here (`.claude/tdd-guard/data/config.json`, `guardEnabled: false`) to match that reality — re-enable only after actually setting up a test runner, otherwise it'll block every edit with no way to reach green.


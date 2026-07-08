<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# ARES Business League 2026 — Agent Brief

## What This Project Is
Marketing/portfolio site for the **ARES Business League 2026 ("Nation Builders Edition")** — a one-month BNI business tournament, 30 members across 4 teams. Built and maintained by **Gravity Media Marketing** (Gaurav Mehta's agency), who are credited site-wide as "Official Web & Media Partner."

**Intended domain:** `aresbusinessleague.com` — **still not connected in this Vercel account as of 2026-07-08** (`vercel domains ls` doesn't list it, DNS doesn't resolve). The live URL right now is `https://ares-web-nine.vercel.app`. `layout.tsx`'s `SITE_URL`, `sitemap.ts`'s `BASE`, and `robots.ts`'s `sitemap` field were switched to that Vercel URL on 2026-07-08 (previously hardcoded `aresbusinessleague.com`, which broke og:image resolution — WhatsApp/social link previews showed no image because the domain doesn't resolve). **Swap all three back to `aresbusinessleague.com` once DNS is actually connected**, or previews will keep pointing at the Vercel URL after the custom domain goes live.
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
That site id is the workspace (renamed "ARES Business League", was "Gravity Media Marketing") in the WhatsApp AI Agent dashboard. **As of 2026-07-08, scoped to ABL-only, not Gravity**: `ai_config.system_prompt` instructs it to only answer ARES Business League questions and deflect anything else, the 6 Gravity-services/company KB entries were deactivated (`is_active: false`, not deleted), and `widget_greeting` no longer mentions Gravity's services. No WhatsApp number involved — it's the dashboard's new "web" channel. See `whatsapp-agents/dashboard/AGENTS.md`'s 2026-07-06 handoff for the full build. To change scope/greeting/color again, log into that dashboard → Settings → Website Widget or Settings → AI Studio (do not hardcode changes here beyond the site id).

## Known Issue (resolved 2026-07-08)
`GlobalCTA.tsx`'s dark/light contrast mismatch (background changed to `#030712` without updating left-column text colors) — confirmed fixed as of 2026-07-08's pre-launch audit, all text now uses white/white-opacity classes against the dark background.

## Pending — not yet reproduced in code
Two mobile UI reports have been reviewed twice against source with no bug found (buttons wrap full content, no blocking overlays/z-index issues): "broken hover line on home page team captain cards" and "roster member card not clickable" (`src/app/page.tsx`, `src/app/teams/[team]/TeamPageClient.tsx`). If still seen live, the cause is likely runtime (GSAP/touch-state) rather than markup — reproduce with a live browser tool before further static review.

## Testing
No test runner configured (`package.json` has no `test` script, no `vitest`/`jest` config, no test files exist anywhere in this repo). `tdd-guard` is disabled here (`.claude/tdd-guard/data/config.json`, `guardEnabled: false`) to match that reality — re-enable only after actually setting up a test runner, otherwise it'll block every edit with no way to reach green.


# Raven Tech Group — Site Improvement Plan

Tracked implementation plan from the May 2026 full-site audit. Work in tier order; mark items complete in git commits.

**Legend:** `[ ]` pending · `[x]` done · `[~]` in progress

---

## Tier 1 — Credibility & broken surfaces (P0)

Fix before any paid traffic or aggressive SEO.

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Fix `/blog` → `/insights` links + service insight slugs | [x] | Footer, ServiceSections, `servicePageInsights.ts` |
| 1.2 | Wire `insightsBodies.ts`; noindex + sitemap filter for stubs | [x] | 3 published articles; 10 drafts noindex |
| 1.3 | Fix `StructuredData.tsx` — remove fake ratings, banned words, add `sameAs` | [x] | LinkedIn + X from footer |
| 1.4 | Replace unverifiable `serviceMetricsBand` stats with attributable metrics | [x] | Eagle HR / R4 referenced where possible |
| 1.5 | Standardise `www` canonical + non-www redirect | [x] | Service pages + HR capability pages + `next.config.js` |
| 1.6 | Metadata layouts for privacy, terms, cookies | [x] | Server layouts; pages stay client |
| 1.7 | Fix broken testimonial + case study image paths | [x] | Victor avatar, Honey Box, Eagle HR hero |

---

## Tier 2 — Proof & conversion (P1)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | One SACCO + one fintech case study (anonymised OK) | [ ] | Closes positioning vs proof gap |
| 2.2 | Strengthen Honey Box / R4 / Youth+ outcome metrics | [ ] | Business outcomes, not feature counts |
| 2.3 | Build `/audit` + `/api/audit` + thank-you page | [ ] | Highest-intent lead magnet in rules |
| 2.4 | Contact → Neon persistence + Zod + `/contact/thank-you` | [ ] | Conversion tracking for ads |
| 2.5 | Team section on About — who delivers beyond Victor | [ ] | Reduces solo-founder risk on large deals |
| 2.6 | Fix R4 testimonial avatars (real photos or initials) | [ ] | Depends on client assets |

---

## Tier 3 — SEO & authority (P2)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Publish remaining 10 insight articles | [ ] | One per sprint; wire into `insightsBodies.ts` |
| 3.2 | Industry landing pages (`/industries/saccos`, `/industries/fintech`) | [ ] | Match SEO claims to dedicated routes |
| 3.3 | Per-page OG images in `public/og/` | [ ] | Start with services, insights, HR platform |
| 3.4 | Add `public/og/hr-platform.png` | [ ] | Referenced in 10+ HR metadata files |
| 3.5 | Clutch or equivalent third-party reviews | [ ] | External social proof |
| 3.6 | `/pricing` — tier framing without numbers | [ ] | Procurement-minded buyers |
| 3.7 | JSON-LD on 4 HR industry pages + case study BreadcrumbList | [ ] | SEO completeness |
| 3.8 | Homepage H1 — single `<h1>` on mobile hero | [ ] | Accordion panels → `<h2>` |

---

## Tier 4 — Design system cleanup (P3)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | Define `--radius-card` in `globals.css` | [ ] | Unblocks token |
| 4.2 | Migrate active `rounded-sm` → `rounded-card` | [ ] | ServiceIntakeWizard, Testimonials, legal |
| 4.3 | Light reading sections OR update rules to all-dark | [ ] | Decision needed |
| 4.4 | Skip link + header focus rings | [ ] | Accessibility |
| 4.5 | `useReducedMotion` on ServiceIntakeWizard + legal motion | [ ] | Motion consistency |
| 4.6 | Wire `LetterFillReveal` on hero H1 or remove from rules | [ ] | |
| 4.7 | Delete or integrate orphaned section components | [ ] | Bridge, About, Portfolio, etc. |
| 4.8 | Restore homepage proof sections if positioning requires | [ ] | Industries, founder, stats, newsletter |

---

## Changelog

| Date | Tier | Summary |
|------|------|---------|
| 2026-05-26 | 1 | Tier 1 complete — links, insights, schema, metrics, canonicals, legal meta, images |

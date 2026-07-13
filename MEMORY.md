# MEMORY.md — Session 1

> **Date:** Jul 13, 2026
> **Agent:** opencode (deepseek-v4-flash-free)
> **Status:** Planning phase complete. Ready for build.

---

## What Was Accomplished

### Deliverables
1. **`specification.html`** (2,167 lines) — Design system tokens + product specification in a single self-contained document. Includes live color swatches, type scale, spacing/motion/component token tables, and the full refined product spec from Vision through North Star.

2. **`wireframes.html`** (1,305 lines) — 8 interactive wireframe screens:
   - Homepage (hero search, content grid, topic chips, recent activity)
   - Passage Read (translation selector, layer pills, verse text, discovery cards)
   - Passage + Inspector (right-side panel with lexicon, concepts, timeline, connections)
   - Knowledge Graph (node canvas with filter, search, detail panel)
   - Search Results (Perplexity-style summary + evidence list + sidebar)
   - Research Workspace (multi-panel resizable grid)
   - Timeline (horizontal scrollable from 2000 BC to 70 AD)
   - Mobile View (phone-sized card with bottom sheet)

3. **`implementation-plan.html`** (1,986 lines) — Full build plan:
   - MVP scope (12 in / 12 out, each linked to target version)
   - Architecture overview with data flow diagram
   - Route design (10 App Router routes)
   - Data models (Passage, Entity, User, SearchIndex)
   - 12 API endpoints
   - Component tree (~60 components, MVP-marked)
   - 7 MVP implementation phases (Phases 0-6) + 8 post-MVP phases (Phases 7-14)
   - Sprint breakdown (8 sprints, ~10 weeks)
   - 8 key technical decisions
   - Dependency map (MVP + post-MVP chains)
   - Database schemas (MVP + 6 post-MVP collections)

### Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| **Open lexical data** | Macula Hebrew + ETCBC + STEPBible + Strong's replace BDB/HALOT/TWOT. Zero licensing cost, fully auditable. |
| **Next.js App Router SSR for passages** | SEO, instant content. CSR for search only. |
| **Neo4j for entity graph** | Deeply interconnected data; single traversal queries. |
| **OpenSearch over Atlas Search** | Hebrew/Greek stemming + fuzzy matching quality. |
| **Translations stored per-verse** | Avoids N+1 on switch, enables multi-translation display. |
| **Inspector via client fetch** | Avoid preloading entity graph on every passage page. |
| **AI at v2.0 (after knowledge base matures)** | Ensures AI has rich, verified data to draw from. |

### Unresolved Questions / Next Steps

1. **Bible text sourcing** — Need to acquire public domain texts (KJV, ASV, WEB) for MVP prototyping. ESV/NRSV require licensing.
2. **Entity knowledge base** — People, places, concepts need to be curated or sourced from open datasets (e.g., STEPBible entity data, DBpedia, Wikidata).
3. **Macula Hebrew ingestion** — Need ETL scripts to parse Macula Hebrew XML/JSON into MongoDB and Neo4j.
4. **Design system implementation** — `tokens.css` needs to be created as a standalone file, then Tailwind configured to consume the custom properties.
5. **Component scaffolding** — shadcn/ui components need to be initialized and themed with the design tokens.
6. **OpenSearch analyzer** — Custom Hebrew/Greek stemmer configuration needs research.
7. **CI/CD** — GitHub Actions workflow for lint, typecheck, and test is planned but not implemented.

### Notes for Next Agent

- All three HTML files are **self-contained** — open in a browser to view. They are documentation, not code.
- The design system in `specification.html` is the **source of truth** for visual tokens. When you start building, extract `tokens.css` from the CSS custom properties defined there.
- `wireframes.html` is the **layout reference**. The actual implementation should match these layouts exactly, especially the passage layout, inspector panel position, and search results page.
- `implementation-plan.html` defines the **build order**. Sprint 0 is Foundation (Next.js init, Docker, tokens, layout shell). Start there.
- All lexical data decisions have been made — never introduce BDB, HALOT, or TWOT. Only Macula, ETCBC, STEPBible, Strong's.
- The user prefers to be asked before committing.

### Tools & Resources Referenced

- Google Fonts: Inter (body), Literata (headings)
- shadcn/ui component library
- Next.js App Router documentation
- NestJS documentation
- Macula Hebrew: https://github.com/Clear-Bible/macula-hebrew
- ETCBC: https://etcbc.nl/
- STEPBible: https://www.stepbible.org/
- Strong's Concordance (public domain)

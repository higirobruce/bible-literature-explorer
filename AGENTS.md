# Biblical Literature Explorer — AGENTS.md

## Project Overview
A transparent, evidence-based platform for exploring biblical literature. Not a Bible app — a research and reading platform.

**Repository:** `https://github.com/higirobruce/bible-literature-explorer.git`

## Current State (Session 1 — Jul 13, 2026)
Three specification documents exist. No code has been written yet. The project is in pre-build planning.

## Key Files

| File | Purpose |
|------|---------|
| `specification.html` | Design system + product specification. Defines tokens (color, typography, spacing, motion), component library, voice & tone, and full product spec. |
| `wireframes.html` | Interactive wireframes (8 screens). Clickable to switch between views. Must be opened in a browser. |
| `implementation-plan.html` | Full build plan: MVP scope, routes, data models, API endpoints, component tree, 7 MVP phases + 8 post-MVP phases, sprint breakdown, dependency map, database schemas, key technical decisions. |

## Design System Tokens
All visual decisions follow `specification.html`. Key values:

- **Colors:** Warm White (`#F7F3EE`) base, Slate (`#3D3D3D`) body, Deep Indigo (`#1E2440`) headings, Terracotta (`#C8664A`) accent. No saturated colors.
- **Typography:** Literata (headings), Inter (body). Google Fonts.
- **Spacing:** 4px base scale. Generous whitespace.
- **Motion:** 150ms/250ms/400ms durations. Ease-out curve. Functional, never decorative.

## Open Lexical Data Stack (NO licensed lexicons)
The platform explicitly avoids BDB, HALOT, TWOT, or any licensed lexical resources. Instead:

- **Macula Hebrew** — morphology, clause structures
- **ETCBC** — linguistic database of the Hebrew Bible
- **STEPBible** — open lexical definitions, glosses, frequency data
- **Strong's** — public domain

## Tech Stack (from implementation plan)
- **Frontend:** Next.js (App Router), TypeScript, Tailwind, shadcn/ui, Radix, Framer Motion, TanStack Query, TipTap, React Flow
- **Backend:** NestJS, Node.js, NextAuth.js
- **Databases:** MongoDB, Neo4j, OpenSearch, Redis, MinIO
- **Infra:** Docker, Kubernetes, Nginx, GitHub Actions, Prometheus, Grafana, Loki

## MVP Scope (from implementation-plan.html#mvp)
12 in-scope items (passage reading, translation selector, word-level inspector, discovery cards, search, auth, highlights/bookmarks/notes). 12 deferred to post-MVP.

## Agent Conventions
1. **Read the source files** before making any changes. Do not assume.
2. **Follow the design system tokens** in `specification.html` — no hardcoded values.
3. **Wireframes** in `wireframes.html` are the layout reference. The implementation should match these layouts.
4. **Implementation plan** in `implementation-plan.html` defines the phase order and sprint breakdown. Follow it.
5. **LEXICONS:** Never introduce BDB, HALOT, TWOT, or any licensed lexical data. Only Macula Hebrew, ETCBC, STEPBible, Strong's.
6. **Ask before committing** unless explicitly told to commit.
7. **Check this file** on every session startup for updated conventions.

## First Session Output
Session 1 (Jul 13, 2026) produced:
- Initial design system + product specification
- 8 interactive wireframes
- Implementation plan with MVP + post-MVP roadmap
- Git repo initialized with remote origin

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (also runs type-checking)
npm start       # serve the production build
npm run lint    # next lint
```

- There is no test suite or test framework configured.
- There is no ESLint config file committed, so `npm run lint` will prompt interactively to create one on first run.
- `CLAUDE_API_KEY` must be set in `.env.local` (copy from `.env.local.example`). Note the name: it is `CLAUDE_API_KEY`, not the SDK's default `ANTHROPIC_API_KEY`, and is passed explicitly to the client.

## Architecture

Next.js 14 App Router + TypeScript + Tailwind, with no database or auth. Three pieces:

- `app/page.tsx` — static marketing landing page (`/`) linking to the tool.
- `app/app/page.tsx` — the tool (`/app`), a single `"use client"` component holding all state in `useState`. It POSTs `{ lead, businessType }` to `/api/generate` and renders `reply` or `error` from the JSON response.
- `app/api/generate/route.ts` — the only server code. Validates input (non-empty `lead`, max 5,000 chars), builds a single-turn prompt, calls the Anthropic Messages API, and returns `{ reply }`; errors return `{ error }` with a user-facing message (401 and 429 from the SDK are mapped to specific messages).

Contract between client and server: the `BUSINESS_TYPES` list in `app/app/page.tsx` supplies the `businessType` string, which is interpolated directly into the prompt; an empty value falls back to `"General small business"` on the server. Adding a business type only requires editing that client-side list. The API contract is also documented in `README.md` — keep it in sync if request/response shapes change.

## Styling

- Fonts (Sora for display, DM Sans for body) are loaded via a Google Fonts `@import` in `app/globals.css` and exposed as CSS variables `--font-display` / `--font-body`, which Tailwind maps to `font-display` / `font-sans`. Pages also apply them with inline `style={{ fontFamily: "var(--font-display)" }}`.
- Custom animations/classes (e.g. `animate-fade-up`, `btn-pulse`) live in `app/globals.css`.
- Tailwind defines a `brand` color scale, but components mostly use stock `blue-*` classes.

## Deployment

Intended for Vercel; set `CLAUDE_API_KEY` in the host's environment variables.

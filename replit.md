# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Post for Me (`artifacts/post-for-me`)

- **Kind**: react-vite (frontend)
- **Preview path**: `/`
- **Purpose**: Social media content creation guide for newcomer entrepreneurs in Canada
- **Architecture**: React SPA with Replit Auth, real PostgreSQL backend via API server, phone-container UI
- **Auth**: Replit Auth (OIDC) via `@workspace/replit-auth-web` → `useAuth()` hook
- **Key files**:
  - `src/App.jsx` — Root component; auth gate (LoginScreen when unauthenticated), screen state machine, profile/usage state, settings overlay
  - `src/components/LoginScreen.jsx` — Login gate with new blue-heart logo, Sign in CTA (Google/Email only; Microsoft removed)
  - `src/components/OnboardingScreen.jsx` — 4-step first-time onboarding (business type → camera comfort → platforms → target customer); saved to localStorage `pfm_onboarding` + profile API; skipped for returning users
  - `src/components/Header.jsx` — App header with back button, screen title, profile avatar button (top right)
  - `src/components/SettingsOverlay.jsx` — Full-screen settings: profile, plan (free/premium demo), linked accounts (all Coming Soon), AI Help, delete account
  - `src/utils/mockGenerator.js` — Deterministic content generator
  - `src/index.css` — Full custom CSS design system (no UI library). **Original light theme**: BG `#f9fafb`, Card `#ffffff`, Primary `#4f8cff`, Accent `#8b5cf6`, Text `#111827`, Subtext `#6b7280`, Border `#e5e7eb`. Tab bar always dark (`#111827`). No background orbs or dark theme overrides.
- **Onboarding flow**: First login → OnboardingScreen (4 questions, one at a time) → Hub. Returning users skip directly to Hub. Data stored in localStorage `pfm_onboarding`.
- **Personalization**: Onboarding `comfortLevel` pre-fills InputForm and filters TRENDING_TEMPLATES. Selected `platforms` filter trending templates. `buildEmptyForm(onboarding)` builds pre-filled empty form. Template "Use This Template" pre-fills comfortLevel + format from template.
- **Screens**: LOGIN → ONBOARDING (first time only) → T.HOME(0) → T.FORM(1) → T.CONTENT(2) → T.CHECKLIST(3) → T.COMPLETE(4)
- **Features**: Auth gate, onboarding, usage counter (1/day free, unlimited premium), daily limit enforcement, premium upgrade (demo mode - labeled), AI Help (keyword-based server responses), linked accounts (all Coming Soon), delete account with confirmation, profile menu

### API Server (`artifacts/api-server`)

- **Kind**: api (Express 5)
- **Auth**: Replit Auth OIDC via `openid-client` v6, sessions stored in PostgreSQL
- **Routes**:
  - `GET /api/auth/user` — current session user
  - `GET /api/login` / `GET /api/callback` / `GET /api/logout` — OIDC flow
  - `GET /api/profile`, `PUT /api/profile` — user profile
  - `GET /api/usage`, `POST /api/usage/increment` — daily usage tracking
  - `POST /api/plan/upgrade`, `POST /api/plan/downgrade` — plan tier (demo mode)
  - `POST /api/help` — AI-style keyword-matched help responses
  - `DELETE /api/account` — delete account + session

## Database

- **Tables**: `sessions` (auth sessions), `users` (OIDC user data), `profiles` (plan_tier, display_name), `usage_tracking` (daily posts_used per user)
- **Plan tiers**: `free` (1 post/day), `premium` (unlimited)
- **Schema**: `lib/db/src/schema/auth.ts` + `lib/db/src/schema/app.ts`

## Libraries

- `lib/replit-auth-web` — `useAuth()` hook for browser auth state (login/logout/user)
- `lib/db` — Drizzle ORM + PostgreSQL pool
- `lib/api-spec` — OpenAPI spec → codegen via Orval
- `lib/api-zod` — Generated Zod schemas
- `lib/api-client-react` — Generated React Query hooks + API client

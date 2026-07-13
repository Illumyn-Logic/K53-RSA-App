# eHail Implementation Plan

This document defines what we will build first in eHail, how we will use `uber-main` for inspiration, and the order of execution.

## Product Direction

- `uber-main` is a reference project only.
- `ehail` is the real project and will contain original implementation.
- We borrow concepts (flows and architecture patterns), not direct copy-paste.

## Phase 1: Foundation (Build First)

Goal: establish app structure, navigation, and baseline UI primitives so future features are easy to add.

### 1. App shell and routing

- Define route groups for:
  - `(auth)` for onboarding/sign-in/sign-up
  - `(root)` for core app experience
  - `(tabs)` for Home, Rides, Profile, and Chat placeholder
- Add guard-ready layout structure so auth/non-auth separation is clear.

### 2. Design system baseline

- Create shared style tokens:
  - Color palette
  - Spacing scale
  - Radius scale
  - Typography styles
- Build reusable UI components:
  - Primary button
  - Input field
  - Screen container
  - Section header

### 3. Core screens (skeleton level)

- Auth:
  - Welcome
  - Sign In
  - Sign Up
- App:
  - Home
  - Rides
  - Profile
  - Chat (placeholder)

### 4. Local state and types

- Define TypeScript types for user, ride, and location primitives.
- Add a lightweight store pattern for auth/session and ride draft state.

## Phase 2: Booking Flow (After Foundation)

Goal: deliver first end-to-end value flow.

- Pickup/dropoff input
- Ride option selection
- Ride confirmation summary
- Mocked request lifecycle

## Phase 3: Integrations

Goal: connect real services once UX and state are stable.

- Auth provider integration
- Maps/geocoding integration
- Payments integration
- Backend APIs for rides and driver matching

## Definition of Done for Phase 1

- App launches with stable navigation structure.
- Auth and core tabs are reachable with no runtime route errors.
- Shared components are used by screens (not duplicated inline).
- TypeScript compiles without type errors.

## Current Next Actions

1. Implement route group structure in `app/` for `(auth)`, `(root)`, and `(tabs)`.
2. Add `constants/` design tokens file.
3. Create `components/ui/` primitives (Button, Input, Screen).
4. Build placeholder screens using those primitives.
5. Run app and verify navigation between auth and tabs.

## Progress Snapshot (2026-07-01)

- Completed: route groups for `(auth)` and `(root)` with nested `(tabs)`.
- Completed: design tokens in `constants/theme.ts`.
- Completed: reusable primitives in `components/ui/`.
- Completed: demo placeholder screens for auth, tabs, and booking flow.
- Completed: type validation (no TypeScript errors in updated files).
- Pending: visual polish pass and interaction tuning for the design demo.

## Notes

- Keep implementation in `ehail` only.
- Use `uber-main` as behavioral inspiration and reference architecture.
- Preserve flexibility: feature details can evolve, but phase order should stay stable.

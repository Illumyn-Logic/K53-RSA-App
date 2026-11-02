# K53 App: Current User Journey and App Flow

_Last updated: 2026-07-29_

## 1) Route Map (Current)

```text
/
|- index.tsx (redirect gate)
|- (onboarding)/
|  |- _layout.tsx
|  |- index.tsx
|- (tabs)/
|  |- _layout.tsx
|  |- home.tsx
|  |- study.tsx
|  |- practice.tsx
|  |- progress.tsx
|- study/[id].tsx
|- test/[id].tsx
|- test/results.tsx
|- resources.tsx
|- motorcycle.tsx
|- +not-found.tsx
```

## 2) Entry and Session Gate

- App starts at `/`.
- `index.tsx` checks `onboardingCompleted` in persisted Zustand store.
- First-time user: redirected to `/(onboarding)`.
- Returning user: redirected to `/(tabs)/home`.

## 3) Primary User Journeys

### A) First-Time Journey (Onboarding)

1. User opens app.
2. User sees a 3-slide onboarding carousel (`/(onboarding)/index.tsx`).
3. User taps next through slides.
4. On final slide, app sets `onboardingCompleted = true`.
5. App replaces route to `/(tabs)/home`.

### B) Returning User Journey (Home-Led)

1. User opens app.
2. App immediately redirects to `/(tabs)/home`.
3. User sees:
- Quick stats (question count, tests taken, best score).
- XP/streak card and daily check-in action.
- Quick actions to Practice, Study, and Progress.
- Short resources preview and Motorcycle Path shortcut.

### C) Study Journey

1. User opens `/(tabs)/study`.
2. User can:
- Open `resources` (read-only study resources).
- Open `motorcycle` (gamified motorcycle module path).
- Select a category card.
3. Category selection goes to `/study/[id]`.
4. `/study/[id]` displays question + explanation cards for that category.

### D) Practice Test Journey

1. User opens `/(tabs)/practice`.
2. User chooses:
- Category.
- Question count.
- Vehicle type (code8/code10/code1).
3. User taps start; app pushes `/test/[id]` with params.
4. Test screen:
- Builds random question set from selected category.
- Starts 30-minute timer.
- User answers question-by-question with immediate explanation visibility.
- User navigates Prev/Next or submits on final question.
- Auto-submit occurs when timer reaches 0.
5. App calculates result and pushes `/test/results`.
6. Results screen shows score, pass/fail message, weak areas, and actions.

### E) Progress Tracking Journey

1. User opens `/(tabs)/progress`.
2. User sees:
- XP/streak/badges summary.
- Aggregate test stats (count, average, passes).
- Weak areas inferred from test history.
- Full test history list with score bars.

## 4) State and Persistence Flow

- Global app state is managed in `store/useAppStore.ts`.
- Persisted keys include:
- `onboardingCompleted`
- `selectedVehicleType`
- `testHistory`
- `gamification`
- Persistence backend:
- Native: AsyncStorage
- Web: localStorage

### Test result lifecycle

1. `startTest` creates `currentTest` with question set and empty answers.
2. `answerQuestion` updates answer index in `currentTest.answers`.
3. `submitTest` computes score and weak areas, appends result to `testHistory`, awards XP, and clears `currentTest`.

## 5) Navigation Flow Diagram

```mermaid
flowchart TD
  A[App Launch /] --> B{onboardingCompleted?}
  B -->|No| C[Onboarding Slides]
  C --> D[Set onboardingCompleted = true]
  D --> E[Tabs Home]
  B -->|Yes| E

  E --> F[Tabs Study]
  E --> G[Tabs Practice]
  E --> H[Tabs Progress]
  E --> I[Motorcycle]

  F --> J[Resources]
  F --> I
  F --> K[Study Category /study/:id]

  G --> L[Test /test/[id]]
  L --> M[Test Results]
  M --> E

  H --> E
  J --> F
  I --> F
```

## 6) Current Gaps / Placeholder Behavior

- Results screen "Review Answers" button currently has no action.
- Results screen "Retry" uses `router.back()`, so destination depends on navigation history.
- Root stack explicitly lists some screens in `_layout.tsx`, while others (`resources`, `motorcycle`) are still reachable via file-based routing.
- Motorcycle screen content is currently static showcase content (not tied to completion state).

## 7) Practical Test Script (Manual QA)

1. Fresh install or clear storage.
2. Launch app and verify onboarding appears.
3. Complete onboarding and verify redirect to home.
4. Go to Study, open a category, return.
5. Go to Practice, run a short test, submit.
6. Verify results and weak areas display.
7. Open Progress and confirm new test history + updated stats.
8. Relaunch app and verify onboarding is skipped (persistence check).

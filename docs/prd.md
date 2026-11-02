# K53 App: Enhanced User Journey and App Flow

> **Last updated:** 2026-07-29  
> **Sources:** Rules of the Road.pdf, FAQ 3.Code 1.pdf, existing K53 app flow

---

## Executive Summary

Using the attached **Rules of the Road** and **FAQ Code 1** documents, I would enhance the current K53 app experience by implementing three major improvements.

### 1. Add an Official Learner's Licence Application Journey

The FAQ provides a complete pre-test journey covering:

- Licence categories
- Age requirements
- Required documents
- Application channels
- Required forms
- Eye test requirements
- Test-day requirements
- Licence issuance

---

### 2. Make Study and Practice Topic-Aware

The **Rules of the Road** document provides a comprehensive content taxonomy that should power the study and practice experience.

Topics include:

- General duties of drivers/riders
- Pedestrians
- Motorcycles
- Roundabouts
- Overtaking
- Freeways
- Speed limits
- Parking and stopping
- Seatbelts
- Lights
- Reflectors
- Brakes
- Tyres
- Load projection
- Towing
- Alcohol
- Noise
- ...and many more.

---

### 3. Fix and Extend the Current App Flow

Improve the learning experience by adding:

- Review Answers
- Retry Test
- Resume Test
- Learner's Licence Guide
- Test-Day Checklist
- A dedicated Code 1 Motorcycle learning path

The sections below describe an enhanced end-to-end user journey and application flow.

---

# 1. What the Attached Documents Add to the Product

## Current App Coverage

The current application mainly provides:

- Onboarding
- Home dashboard
- Study mode
- Practice tests
- Progress tracking
- Motorcycle placeholder module

The attached documents expand the application into a complete learner's licence preparation platform.

---

## Information Added by the FAQ Document

The FAQ introduces the official learner's licence journey.

| Stage | Key Information |
|--------|-----------------|
| **Why a learner's licence is needed** | Demonstrates basic knowledge of the vehicle and rules of the road. Learners may only drive while supervised by a licensed driver. |
| **Validity** | Valid for **24 months** and cannot be extended. |
| **Licence categories** | **Code 1:** Motorcycle, quadrucycle, tricycle.<br>**Code 2:** Motor vehicles with a gross mass of **3,500 kg or less**.<br>**Code 3:** Motor vehicles with a gross mass above **3,500 kg**. |
| **Age requirements** | **Code 1:** 16+ (≤125 cc), 18+ (>125 cc)<br>**Code 2:** 17+<br>**Code 3:** 18+ |
| **Application channels** | Apply online via NATIS or book at the nearest DLTC. |
| **Required documents** | Identity document, photos, booking fee, proof of postal and residential address, affidavit (if utility bill is not in applicant's name), ward councillor letter (if living in an informal settlement). |
| **Forms** | LL1 learner's licence form. MC medical certificate if 65 years or older. |
| **Eye test** | Conducted at the DLTC or by a qualified optometrist. |
| **Study areas** | Rules of the Road, Vehicle Controls/Motorcycle Controls, Road Signs and Road Markings. |
| **Test-day materials** | Booking receipt, ID document, pen and pencil. |
| **Issuance** | Learner's licence is issued on the same day after passing the test and paying the issuing fee. |

---

## Information Added by the Rules of the Road Document

The Rules of the Road document provides the taxonomy for the app's study material and question bank.

### Major Rule Areas

- General duties of driver/rider
- Pedestrian right of way
- Motorcycle duties
- Crossing or entering a public road
- Roundabouts and mini-traffic circles
- Lane changing
- Overtaking and passing
- Intersections
- Freeways
- Direction indicators
- Driving on the left side of the road
- Speed limits
- Parking and stopping
- Compulsory stops
- Seatbelts and children
- Protective helmets for motorcycle riders and passengers
- Retro-reflectors
- Warning flags and reflectors
- Rear-view mirrors
- Windscreen and windscreen wipers
- Lights and number plates
- Main beam
- Dipped beam
- Parking lamps
- Rear lamps
- Stop lamps
- Fog lamps
- Steering gear
- Brakes and tyres
- Exhaust silencer
- Fuel tank
- Electrical wiring
- Battery
- Engine
- Emergency warning triangles
- Vehicle length, height and width
- Transporting goods and projections
- Carrying persons on goods vehicles
- Towing and vehicle combinations
- Sidecar attachment
- Cell phone use
- Reckless, negligent and inconsiderate driving
- Alcohol and drugs
- Abandoned vehicles and road damage
- Hooter, sirens, emergency warning devices and excessive noise

These topics should become the primary study taxonomy and question categorisation system inside the app.

---

# 2. Recommended Licence Code Mapping

The current application uses:

- `code1`
- `code8`
- `code10`

The official FAQ uses:

- Code 1
- Code 2
- Code 3

To avoid confusing users, the application should support both naming conventions while maintaining a clean internal identifier.

## Suggested Mapping

| Internal Code | Current Label | Official Label | Display Label | Vehicle Type |
|--------------|--------------|---------------|--------------|--------------|
| `code1` | Code 1 | Code 1 | **Motorcycle / Code 1** | Motorcycle, tricycle, quadrucycle, sidecar |
| `code8` | Code 8 | Code 2 | **Light Motor Vehicle / Code 8** | Light motor vehicle, minibus and goods vehicle up to 3,500 kg |
| `code10` | Code 10 | Code 3 | **Heavy Motor Vehicle / Code 10** | Heavy motor vehicle above 3,500 kg |

---

## Recommended UX Labels

### Instead of

```
Code 8
```

Display

```
Code 8 — Light Motor Vehicle

Official learner category:
Code 2

Gross vehicle mass:
3,500 kg or less
```

---

### Instead of

```
Code 10
```

Display

```
Code 10 — Heavy Motor Vehicle

Official learner category:
Code 3

Gross vehicle mass:
Above 3,500 kg
```

---

### Instead of

```
Code 1
```

Display

```
Code 1 — Motorcycle

125 cc or less
Minimum age: 16 years

Above 125 cc
Minimum age: 18 years
```

This approach aligns the application with the official learner's licence terminology while preserving the familiar Code 1, Code 8 and Code 10 naming used throughout South Africa.

---

# 3. Enhanced Route Map

## Current Route Map

```text
/
├── index.tsx
├── (onboarding)/
│   ├── _layout.tsx
│   └── index.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── study.tsx
│   ├── practice.tsx
│   └── progress.tsx
├── study/[id].tsx
├── test/[id].tsx
├── test/results.tsx
├── resources.tsx
├── motorcycle.tsx
└── +not-found.tsx
```

---

## Enhanced Route Map

```text
/
├── index.tsx
│
├── (onboarding)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── licence-code.tsx
│
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── study.tsx
│   ├── practice.tsx
│   └── progress.tsx
│
├── study/
│   ├── [id].tsx
│   └── topic/[topicId].tsx
│
├── test/
│   ├── [id].tsx
│   ├── results/[resultId].tsx
│   └── review/[resultId].tsx
│
├── license/
│   ├── index.tsx
│   ├── eligibility.tsx
│   ├── application-checklist.tsx
│   └── test-day.tsx
│
├── resources.tsx
├── motorcycle.tsx
└── +not-found.tsx
```

---

## New Screens

| Screen | Purpose |
|---------|---------|
| `(onboarding)/licence-code.tsx` | Allow users to select Code 1, Code 8 or Code 10 during onboarding. |
| `license/index.tsx` | Main Learner's Licence Guide hub. |
| `license/eligibility.tsx` | Display licence category, age requirements and vehicle type. |
| `license/application-checklist.tsx` | Interactive checklist covering documents, forms, eye test and booking. |
| `license/test-day.tsx` | Test-day reminders and preparation checklist. |
| `test/results/[resultId].tsx` | Persisted results page tied to a saved test result. |
| `test/review/[resultId].tsx` | Review user answers, correct answers and explanations. |
| `study/topic/[topicId].tsx` | Topic-based study pages such as Speed Limits, Overtaking or Motorcycle Helmets. |

---

# 4. Enhanced Entry and Session Gate

## Current Behavior

```text
App Launch (/)

├── Check onboardingCompleted
│
├── false → Onboarding
└── true  → Home
```

---

## Enhanced Behavior

```text
App Launch (/)

├── Check onboardingCompleted
├── Check selectedLicenceCode
├── Check hasUnfinishedTest
└── Check applicationChecklistStarted

If onboardingCompleted = false
    ├── Navigate to Onboarding
    ├── Prompt user to select a licence code
    └── If Code 1 is selected
            └── Optionally ask for motorcycle engine capacity

If onboardingCompleted = true
    └── Navigate to Home

If hasUnfinishedTest = true
    └── Display "Resume Test" banner

If selectedLicenceCode = code1
    └── Highlight the Motorcycle Path

If applicationChecklist is incomplete
    └── Display the Licence Application Checklist card
```

---

## Session Initialization Logic

When the application launches, it should evaluate the user's saved state before determining the initial navigation flow.

| State | Purpose |
|--------|---------|
| `onboardingCompleted` | Determines whether onboarding has already been completed. |
| `selectedLicenceCode` | Personalises the application experience for the selected learner category. |
| `hasUnfinishedTest` | Allows users to continue an interrupted practice session. |
| `applicationChecklistStarted` | Reminds users to complete their learner's licence application requirements. |

---

## Home Screen Personalisation

Depending on the stored application state, the Home screen should dynamically present relevant shortcuts and reminders.

| Condition | Home Screen Action |
|-----------|--------------------|
| Unfinished test exists | Display **Resume Test** banner |
| Selected licence is Code 1 | Highlight **Motorcycle Learning Path** |
| Application checklist incomplete | Display **Continue Application Checklist** card |
| Returning learner | Show personalised study recommendations |

This provides a more context-aware experience and helps learners continue where they previously left off.

---

# 5. End-to-End User Journey

The attached documents describe a complete learner's licence journey, extending beyond exam preparation to include eligibility, application, testing and post-test guidance.

The application should support the following end-to-end journey.

```text
Awareness
    ↓
Understand why a learner's licence is required

Eligibility
    ↓
Choose:
• Code 1
• Code 8 (Official Code 2)
• Code 10 (Official Code 3)

Confirm age and vehicle type

Application
    ↓
Apply online via NATIS or book at a DLTC

Prepare:
• Identity document
• Passport photographs
• Proof of address
• Booking fee

Complete:
• LL1 Form
• MC Form (65+ only)

Eye Test
    ↓
Complete at:
• DLTC
or
• Qualified optometrist

Study
    ↓
• Rules of the Road
• Road Signs & Road Markings
• Vehicle Controls
• Motorcycle Controls

Practice
    ↓
• Topic drills
• Timed mock exams
• Weak-area practice

Test Day
    ↓
Bring:
• Booking receipt
• Identity document
• Pen
• Pencil

Use the app for final offline revision

Result
    ↓

PASS
• Learner's licence issued the same day
• Valid for 24 months
• Drive only while supervised

FAIL
• Review incorrect answers
• Practice weak topics
• Retry mock examinations
```

---

## Why This Journey Matters

Rather than functioning only as a question bank, the application becomes a complete learner's licence companion by supporting users throughout the entire journey:

1. Understanding eligibility
2. Preparing the application
3. Studying official content
4. Practising effectively
5. Preparing for test day
6. Reviewing performance
7. Becoming ready for licensing

---

# 6. Primary Enhanced User Journeys

This section describes the major user journeys supported by the enhanced application.

---

## A. First-Time User Journey

### Current Experience

1. User opens the app.
2. User completes the three-slide onboarding.
3. User taps **Get Started**.
4. User is redirected to the Home screen.

---

### Enhanced Experience

1. User launches the application.

2. The onboarding carousel introduces:

   - The purpose of the K53 preparation app.
   - Study content covering Rules of the Road, Road Signs and Vehicle Controls.
   - Practice exams that simulate the official learner's licence test.
   - Progress tracking and personalised recommendations.

3. User selects a licence code:

   - **Code 1 — Motorcycle**
   - **Code 8 — Light Motor Vehicle**
   - **Code 10 — Heavy Motor Vehicle**

4. If **Code 1** is selected, the application asks an optional onboarding question:

   - Is your motorcycle **125 cc or less?**
   - Is your motorcycle **above 125 cc?**

5. The application displays the relevant age requirement:

   | Engine Capacity | Minimum Age |
   |-----------------|-------------|
   | 125 cc or less | 16 years |
   | Above 125 cc | 18 years |

6. The following state is persisted:

```text
onboardingCompleted = true
selectedLicenceCode
motorcycleEngineClass (optional)
```

7. The user is redirected to the Home screen.

8. The personalised Home screen displays:

   - Quick statistics
   - Recommended study path
   - Learner's Licence Application Checklist
   - Resume Test banner (if applicable)
   - Motorcycle shortcut (Code 1 users only)

---

### Why This Enhancement Matters

The FAQ clearly distinguishes learner categories based on both vehicle type and age.

The application should therefore personalise the learning experience rather than presenting identical content to every learner.

For example:

- Code 1 learners require motorcycle-specific rules, controls and legislation.
- Code 8 learners focus on light motor vehicles.
- Code 10 learners require heavy vehicle regulations.

Personalised onboarding ensures users immediately begin studying content relevant to their intended licence category.

---

## B. Learner's Licence Application Journey

> **User Goal:**  
> *"I want to know everything I need before taking the learner's licence test."*

### Entry Point

```text
/license/index.tsx
```

---

### User Journey

1. User opens the Home screen.

2. User selects **Licence Guide** or **Apply for Learner's Licence**.

3. The application navigates to:

```text
/license
```

4. The learner is presented with four sections:

- Eligibility
- Application Checklist
- Eye Test
- Test Day

5. User opens **Eligibility**.

6. The application displays:

- Selected licence category
- Vehicle type
- Age requirements
- Official learner licence information

7. User opens **Application Checklist**.

8. The learner sees an interactive checklist.

```text
Application Checklist

□ Identity document

□ Two identical passport photographs

□ Booking fee

□ Proof of postal and residential address

□ Affidavit
  (if utility bill is not in your name)

□ Ward councillor letter
  (if living in an informal settlement)

□ LL1 Learner's Licence Form

□ MC Medical Certificate
  (65 years or older)

□ Eye test
  (DLTC or qualified optometrist)
```

9. Users can tick completed items.

10. Checklist progress is automatically saved locally.

11. The application provides a shortcut to the official online booking portal.

```text
Apply Online

https://online.natis.gov.za/#/
```

12. If offline, the learner can continue viewing and updating the saved checklist.

---

### Persisted State

```ts
applicationChecklist: {
  idDocument: boolean;
  photos: boolean;
  bookingFee: boolean;
  proofOfAddress: boolean;
  affidavit: boolean;
  wardCouncillorLetter: boolean;
  ll1Form: boolean;
  medicalCertificate: boolean;
  eyeTest: boolean;
  bookingConfirmed: boolean;
}
```

---

### Why This Enhancement Matters

The FAQ describes the complete learner's licence application process—not just the examination itself.

By incorporating this guidance into the application, learners can:

- Prepare all required documentation.
- Track application progress.
- Reduce the likelihood of missing required documents on test day.
- Use the application as both a study platform and an official preparation guide.

---

## C. Study Journey

### Current Experience

1. User opens the **Study** tab.
2. User selects **Resources**, **Motorcycle**, or a study category.
3. The selected category opens at `/study/[id]`.
4. User reads question and explanation cards.

---

### Enhanced Experience

The **Study** tab should become the application's primary learning hub, allowing learners to study by category, topic and licence code.

### Study Tab Structure

```text
Study
├── My Licence Code
├── Categories
│   ├── Rules of the Road
│   ├── Road Signs and Road Markings
│   ├── Vehicle Controls
│   └── Motorcycle Controls
│
├── Topics
│   ├── Speed Limits
│   ├── Overtaking
│   ├── Roundabouts
│   ├── Freeways
│   ├── Parking and Stopping
│   ├── Seatbelts
│   ├── Lights
│   ├── Motorcycle Rules
│   └── ...
│
├── Resources
└── Motorcycle Path
```

---

### User Journey

1. User opens the **Study** tab.
2. The application displays categories relevant to the selected licence code.
3. User selects a study category.
4. The application opens `/study/[id]`.
5. The category screen displays:
   - Mastery percentage
   - Total questions
   - Topic filters
   - Question and explanation cards
6. User filters questions by topic.
7. User bookmarks difficult questions.
8. User starts a topic-specific practice drill.
9. User returns to the Study hub.

---

### Example Category View

```text
Rules of the Road

Mastery: 64%
Questions: 120

Topics

• General Duties
• Pedestrian Right of Way
• Motorcycles
• Roundabouts
• Overtaking
• Intersections
• Freeways
• Speed Limits
• Parking and Stopping
• Seatbelts
• Lights
• Reflectors
• Brakes and Tyres
• Towing
• Alcohol and Drugs
```

---

### Example Study Card

```text
Question

What is the minimum following distance for a light motor vehicle under normal conditions?

Options

○ At least 1 second
○ At least 2 seconds
○ At least 3 seconds
○ At least 4 seconds

Correct Answer

At least 2 seconds

Explanation

A light motor vehicle or motorcycle should maintain at least a
2-second following distance.

Heavy motor vehicles should maintain at least a
3-second following distance.

Increase your following distance during rain,
poor visibility or slippery road conditions.

Source

Rules of the Road — General Duties of a Driver/Rider
```

---

### Why This Enhancement Matters

The **Rules of the Road** document is more than a collection of examination questions—it is a structured rulebook.

The Study experience should therefore be organised around topics rather than random question cards, enabling learners to build knowledge progressively, revisit weak areas and focus on specific concepts before attempting practice tests.

---

# D. Practice Test Journey

### Current Experience

1. User opens the **Practice** tab.
2. User selects:
   - Category
   - Number of questions
   - Vehicle type
3. User starts the test.
4. User answers questions.
5. The test automatically submits when the timer reaches zero.
6. User views the results.

---

### Enhanced Experience

The Practice module should support multiple testing modes that cater for different learning objectives.

## Test Modes

| Mode | Purpose |
|------|---------|
| **Quick Drill** | 10 questions with immediate explanations for low-pressure practice. |
| **Topic Drill** | Questions focused on a single topic or weak area (e.g. Speed Limits or Motorcycle Rules). |
| **Mock Exam** | Full timed examination with a 30-minute limit and an 80% pass requirement. |

---

### Practice Configuration

```text
Practice Test

Licence Code

• Code 1 — Motorcycle
• Code 8 — Light Motor Vehicle
• Code 10 — Heavy Motor Vehicle

Category

• All Categories
• Rules of the Road
• Road Signs and Road Markings
• Vehicle Controls
• Motorcycle Controls

Topic

• Optional topic filter

Number of Questions

• 10
• 20
• 30
• 50

Mode

• Quick Drill
• Topic Drill
• Mock Exam
```

---

### Enhanced Test Flow

1. User opens the **Practice** tab.
2. User selects a licence code.
3. User selects a category and optional topic.
4. User chooses the number of questions.
5. User selects a test mode.
6. User taps **Start Test**.
7. The application creates a new test session.

```ts
currentTest: {
  id: string;
  startedAt: string;
  licenceCode: "code1" | "code8" | "code10";
  category: string;
  topicId?: string;
  mode: "quick" | "topic" | "mock";
  totalQuestions: number;
  timeLimitSeconds: number;
  currentIndex: number;
  questionIds: string[];
  answers: Record<string, number | null>;
  status: "active" | "submitted";
}
```

8. Questions are filtered and shuffled.
9. The timer starts for Mock Exam mode.
10. User answers questions one at a time.
11. User can navigate using **Previous** and **Next**.
12. If the user exits the test:
    - Test progress is automatically saved.
    - The Home screen displays a **Resume Test** banner.
13. User submits the test manually or it auto-submits when the timer expires.
14. The application calculates:
    - Score
    - Pass/Fail status
    - Correct and incorrect answers
    - Weak categories
    - Weak topics
15. A new `resultId` is generated and the result is saved.
16. The application navigates to:

```text
/test/results/[resultId]
```

---

### Result Actions

```text
Results

• Review Answers
• Retry Same Test
• Practice Weak Topics
• Return Home
```

---

### Why This Enhancement Matters

The current Results screen includes a **Review Answers** action that is incomplete or non-functional.

Reviewing mistakes is one of the most valuable parts of the learning process. Every completed test should allow learners to review:

- The original question
- Their selected answer
- The correct answer
- A detailed explanation
- The associated topic
- Whether the answer was correct or incorrect

---

# E. Review Answers Journey

The Review Answers experience should become a first-class feature within the application.

## Route

```text
/test/review/[resultId]
```

---

### User Journey

1. User completes a practice test.
2. The Results screen is displayed.
3. User selects **Review Answers**.
4. The application opens `/test/review/[resultId]`.
5. All questions from the completed test are displayed.
6. Each review card includes:

```text
Question 4 of 20

Category
Rules of the Road

Topic
Speed Limits

Status
Incorrect

Question

What is the general speed limit on a public road
within an urban area unless otherwise indicated?

Your Answer

100 km/h

Correct Answer

60 km/h

Explanation

Unless otherwise indicated by a traffic sign,
the speed limit within an urban area is 60 km/h.

Source

Rules of the Road — Speed Limits
```

7. Users can filter questions by:
   - All
   - Correct
   - Incorrect
   - Topic
8. Users can retry only incorrectly answered questions.
9. Users can return to either the Results screen or the Home screen.

---

### State Requirements

The saved test result must contain sufficient information to reconstruct the review experience.

```ts
testResult: {
  resultId: string;
  date: string;
  licenceCode: string;
  category: string;
  topicId?: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  passed: boolean;
  weakAreas: string[];
  weakTopics: string[];
  answers: {
    questionId: string;
    selectedAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
}
```

---

### Why This Enhancement Matters

Providing detailed feedback transforms practice tests into meaningful learning opportunities.

Rather than simply displaying a score, the application should help learners understand **why** an answer was incorrect, reinforce the correct rule and encourage focused revision before attempting another test.

---

# F. Progress Tracking Journey

### Current Experience

The existing Progress screen displays:

- XP
- Streaks
- Badges
- Total tests
- Average score
- Pass count
- Weak areas
- Test history

---

### Enhanced Experience

The Progress screen should measure both **test performance** and **learning progress**, giving learners a clearer indication of their readiness for the official learner's licence examination.

### Progress Screen Structure

```text
Progress

├── Licence Code
├── Readiness Summary
├── Test Statistics
├── Topic Mastery
├── Weak Areas
├── Test History
└── Application Checklist Progress
```

---

### Licence Readiness Card

```text
Code 8 Readiness

Average Score
74%

Last 3 Tests

68%
75%
80%

Status

Almost Ready

Recommendation

Practice:
• Speed Limits
• Overtaking
```

---

### Topic Mastery Card

```text
Topic Mastery

Speed Limits .............. 58%
Overtaking ................ 71%
Roundabouts ............... 86%
Freeways .................. 63%
Motorcycle Rules .......... 91%
Parking and Stopping ...... 52%
```

---

### Weak Areas Card

```text
Weak Areas

Below 70%

• Speed Limits
• Parking and Stopping
• Freeways

Recommended Action

Start a 10-question Topic Drill
for each weak area.
```

---

### Licence Application Progress

```text
Licence Application Progress

Completed

7 of 10 checklist items

Remaining

• Eye Test
• LL1 Form
• Booking Confirmation
```

---

### Why This Enhancement Matters

Passing the learner's licence examination is only one milestone in the overall journey.

The Progress screen should therefore measure both academic readiness and application readiness by helping learners:

- Track examination performance.
- Monitor mastery across study topics.
- Identify weak areas requiring additional practice.
- Monitor progress through the learner's licence application process.
- Understand when they are fully prepared to book and attend the official learner's licence test.

---


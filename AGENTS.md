<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Session Summary — 2026-06-21

### Goal
Build a complete AgroSmart mobile MVP frontend (Next.js + Tailwind + Lucide) with 11 screens, i18n, and pixel-perfect UI.

### Constraints & Preferences
- Strictly mobile-first: `max-w-md mx-auto h-dvh bg-gray-50 shadow-2xl relative overflow-hidden flex flex-col`
- Apple HIG, ultra-minimalist, glassmorphism, soft shadows
- Colors: `green-800` (#166534) primary, `bg-gray-50` background, `gray-900`/`gray-500` text
- Extreme rounding: `rounded-3xl`/`rounded-2xl` cards, `rounded-xl` inputs/buttons
- Offline-first PWA architecture, role-based UI (Owner/Worker)
- Language switching must show explicit 3-option selector (not auto-cycle)
- All screens must have identical width (`px-5` padding), height (`h-dvh`), and font sizes

### Done
- Initialized Next.js 16.2.9 project with Tailwind v4, TypeScript, `lucide-react`
- Created 11 screen components: LanguageScreen, WelcomeScreen, AuthScreen, OnboardingScreen, Dashboard, BottomNav, AiLogScreen, AnimalManagement, ProductionProcessing, Inventory, FinancialLedger, TaskManagement
- Implemented i18n: `src/translations/index.ts` (~170 keys × 3 languages: uz/ru/en), `src/context/LanguageContext.tsx` with `useLanguage()` hook returning `language`, `changeLanguage()`, `t(key, params?)`
- Fixed `h-full` → `flex-1` across all screens for reliable height inside `min-h-screen`
- Changed `min-h-screen` → `h-dvh` for fixed viewport height across all screens
- Added `overflow-y-auto` to all screen content wrappers
- Standardised all inner wrappers to `px-5` (was `px-6` on most screens)
- Fixed hardcoded English strings: `"Yesterday"`, `"Today"`, placeholders, initial onboarding selection state
- Added explicit 3-option language selector dropdown (with flags, labels, checkmark) to Dashboard — replaces globe auto-cycle button
- Fixed layout shifting on language change: added `min-w-0`, `truncate`, `shrink-0` across all screens to prevent text-width changes from stretching flex layouts

### Key Decisions
- Language switching uses a React Context (`LanguageContext`) with global state, re-rendering all `t()` calls on change
- Translation function supports `{n}` parameter substitution (e.g., `"time_hours_ago"`)
- All screens share the exact same outer container (`max-w-md mx-auto h-dvh ... flex flex-col`) with a `flex-1 flex flex-col overflow-hidden` child wrapper for the screen content
- BottomNav is absolutely positioned at the bottom of the relative parent; main screens add `pb-24` to the screen wrapper to clear it
- Language selector: dropdown overlay with 3 options (flags + labels + active checkmark), opens on language code button tap, dismisses on backdrop tap or option selection — no auto-cycling

### Next Steps
- Test all 3 languages on every screen for visual consistency
- Add PWA manifest + service worker for offline support
- Implement actual data layer (localStorage/IndexedDB) for persistent state

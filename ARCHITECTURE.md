# DoofEngShui by Deenaa — Architecture

> This document is kept in sync with the codebase. Updated on every architectural change.

**Last updated**: 2026-03-28

## Overview

DoofEngShui by Deenaa is a Feng Shui consultation and education platform based in Bahrain. It offers consultations, courses, a shop, blog, events, and an admin panel. The site is bilingual (Arabic default + English) and processes payments through Tap Payments.

This is a full revamp of the existing site (doofengshuibydeenaa.com), which was built in Laravel by Emcan and abandoned. The new build replaces everything with a modern React + Vite stack.

## Current Site (Being Replaced)

| Aspect | Current | New |
|--------|---------|-----|
| Framework | Laravel (PHP) | React + Vite + TypeScript |
| Styling | Custom CSS + Slick + AOS | Tailwind CSS + shadcn/ui + GSAP |
| Payments | Broken / none visible | Tap Payments (RAL partner) |
| Admin | Non-functional | Full CRUD admin panel |
| Auth | Broken login/register | JWT-based auth |
| Language | Arabic + English (basic toggle) | Full i18n with RTL/LTR support |
| Builder | Emcan | RAL |

## Pages / Routes

### Public Pages
| # | Page | Description |
|---|------|-------------|
| 1 | Home | Landing page — hero, featured services, testimonials, CTA |
| 2 | About Us | About Feng Shui + About Deena (sub-sections) |
| 3 | Consultations | Browse 14 consultation types, view details, book & pay |
| 4 | Courses | Browse courses, enroll, and access learning content |
| 5 | Events | Browse events, buy tickets / enlist |
| 6 | Shop | E-commerce — Feng Shui products and guides (BHD) |
| 7 | Blog | Articles on Feng Shui topics |
| 8 | Contact Us | Contact form, WhatsApp, email, social links |

### Auth Pages
- Login / Register / Forgot Password
- User Dashboard (purchases, bookings, course progress)

### Admin Pages
- Dashboard (overview stats)
- Consultations CRUD + booking management
- Courses CRUD
- Events CRUD
- Shop / Products CRUD
- Blog CRUD
- Members / Users management
- Calendar view (bookings & events)

## Tech Architecture

```
┌─────────────────────────────────────────────┐
│                   Browser                    │
├─────────────────────────────────────────────┤
│  React 19 + Vite (SPA)                      │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ TanStack     │  │ UI Layer             │  │
│  │ Router       │  │ shadcn/ui + 21st.dev │  │
│  │              │  │ Tailwind CSS         │  │
│  └─────────────┘  └──────────────────────┘  │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ TanStack     │  │ Animation Layer      │  │
│  │ Query        │  │ GSAP + ScrollTrigger │  │
│  │ (data)       │  │ Lenis (smooth scroll)│  │
│  └─────────────┘  └──────────────────────┘  │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ Forms        │  │ 3D Layer             │  │
│  │ react-hook-  │  │ Spline Runtime       │  │
│  │ form + zod   │  │ Three.js             │  │
│  └─────────────┘  └──────────────────────┘  │
│  ┌──────────────────────────────────────┐   │
│  │ i18n Layer (Arabic RTL + English LTR) │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │ Payments: Tap Payments (RAL partner)  │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Directory Structure

```
doofengshuibydeenaa/
├── public/              # Static assets served as-is
├── src/
│   ├── assets/          # Images, fonts, icons
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui base components
│   │   └── sections/    # Page sections (hero, features, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, helpers, config
│   ├── pages/           # Route-level page components
│   │   ├── admin/       # Admin panel pages
│   │   └── auth/        # Login, register, etc.
│   ├── styles/          # Global CSS / Tailwind config
│   ├── i18n/            # Translations (ar, en)
│   ├── App.tsx          # Root app component
│   └── main.tsx         # Entry point
├── ARCHITECTURE.md      # This file
├── CLAUDE.md            # AI assistant instructions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Bun | Fast installs, native TS support |
| Bundler | Vite | Fast HMR, optimized builds |
| Styling | Tailwind CSS + shadcn/ui | Utility-first, composable components |
| Animation | GSAP + Lenis | Industry-standard, performant scroll animations |
| 3D | Spline + Three.js | Visual editor (Spline) + custom 3D (Three.js) |
| Routing | TanStack Router | Type-safe, file-based routing |
| State/Data | TanStack Query | Cache management, background refetching |
| Payments | Tap Payments | RAL partner account, Bahrain-native gateway |
| Language | Arabic default (RTL) + English (LTR) | Client's audience is primarily Arabic-speaking |
| Admin | Built-in admin panel | Client has no technical skills, needs simple CRUD |
| E-commerce | Custom (no WooCommerce/Shopify) | Products are courses, consultations, event tickets — not traditional cart/shipping. Tap Payments API direct integration. Full control over enrollment, booking, and registration flows |

## Brand & Visual Identity

### Logo
`src/assets/logo.png` — Mandala/flower pattern in green (#9CBF1B) and teal (#36ABD9/#1686AF) with "DOO FENG SHUI" text. Also at `public/logo.png` for favicon/meta use.

### Color System
| Role | Hex | Notes |
|------|-----|-------|
| Primary Teal | `#1686AF` | Main brand, buttons, links |
| Secondary Blue | `#0057A9` | Active states, secondary actions |
| Gold Accent | `#D9B95F` | Premium/luxury feel |
| Green | `#9CBF1B` | Nature, growth, gradient start |
| Light Teal | `#36ABD9` | Gradient end, accents |
| Cream | `#F6DFA2` | Warm backgrounds |
| Beige | `#f2e7d8` | Soft backgrounds |
| Light Blue | `#E7FDFD` | Section backgrounds |

**Gradient**: `linear-gradient(to bottom, #9CBF1B, #36ABD9)` — the signature brand gradient

### Typography
- English: **Roboto**, sans-serif
- Arabic: **Cairo** (primary), **Tajawal** (alternative)

## Component Architecture

Components follow a layered approach:
1. **Base UI** (`src/components/ui/`) — shadcn/ui primitives (Button, Card, Input, etc.)
2. **Composed** (`src/components/`) — Business-specific components built from base UI
3. **Sections** (`src/components/sections/`) — Full page sections (Hero, Features, CTA, etc.)
4. **Pages** (`src/pages/`) — Route-level compositions of sections
5. **Admin** (`src/pages/admin/`) — Admin panel with CRUD interfaces

## Animation Strategy

- **Scroll animations**: GSAP ScrollTrigger for element reveals, parallax, pinning
- **Smooth scroll**: Lenis for buttery page scrolling
- **3D scenes**: Spline for designed scenes, Three.js for programmatic 3D
- **Micro-interactions**: CSS transitions + Tailwind `animate-*` utilities

## Key Features

### Consultations (14 types)
Users browse consultation types, view details/pricing, book a time slot, and pay via Tap Payments. Admin manages all consultation types and bookings.

### Courses
Users purchase and enroll in courses. Future: Duolingo-style gamification with progress tracking, points, rewards, and achievements.

### Shop (E-commerce)
Products priced in BHD. Add to cart, checkout via Tap Payments. Admin manages product catalog.

### Blog
Admin creates/edits/deletes articles. Public site displays them with categories and search.

### Events
Admin creates events. Users browse and buy tickets / register. Calendar integration.

### Admin Panel
Full CRUD dashboard for all content types. Calendar view for bookings/events. Member management. Designed for a non-technical user.

## Bilingual Support
- **Arabic** (default): RTL layout, Arabic typography
- **English**: LTR layout
- Language toggle in header
- All content must support both languages
- Direction-aware components (margins, paddings, icons flip for RTL)

## Payment Integration
- **Provider**: Tap Payments
- **Account**: RAL partner account (not client-owned)
- **Used for**: Consultations, courses, shop purchases, event tickets
- **Currency**: BHD (Bahraini Dinar)

## Future Features (Not Yet in Scope)
- **Gamification**: Duolingo-style course experience with progress panels, points, rewards, scores
- **Mobile App**: Potential native app — not yet discussed in detail

## Change Log

| Date | Change | Files Affected |
|------|--------|----------------|
| 2026-03-28 | Initial architecture setup | ARCHITECTURE.md, CLAUDE.md |
| 2026-03-28 | Added mandatory frontend tools checklist with auto-prompt enforcement | CLAUDE.md |
| 2026-03-28 | Added full project context — pages, features, payments, admin, bilingual, business details | ARCHITECTURE.md, CLAUDE.md, memory files |
| 2026-03-28 | Scaffolded Vite + React + TS project, installed all deps, set up Tailwind v4, path aliases | package.json, vite.config.ts, tsconfig.app.json, src/ |
| 2026-03-28 | Extracted brand colors, fonts, logo from current site; added brand section | ARCHITECTURE.md, CLAUDE.md, memory/project_brand.md |
| 2026-03-28 | Built full landing page: Navbar (glassmorphism), Hero (video bg + GSAP), About, Services, Articles, CTA, Footer. Lenis smooth scroll. All images organized | src/components/, src/App.tsx, src/index.css, src/assets/ |

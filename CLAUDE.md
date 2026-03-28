# DoofEngShui by Deenaa — Project Instructions

## Project Overview
- **Name**: DoofEngShui by Deenaa
- **Type**: Full-stack web application (Feng Shui consultation & education platform)
- **Stack**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Live site (being replaced)**: https://doofengshuibydeenaa.com
- **Region**: Bahrain | **Currency**: BHD (Bahraini Dinar)
- **Language**: Bilingual — Arabic (default, RTL) + English (LTR)

## Project Background
This is a full revamp of an existing Feng Shui platform owned by Deena in Bahrain. The previous developer (Emcan) ditched the project, leaving broken payments, a non-functional admin panel, and general UX issues. RAL is rebuilding it from scratch.

### Business Terms
- **Setup fee**: 450 BD | **Annual fee**: 80 BD/year
- **Hosting**: RAL VPS (client migrating from previous host)
- **Payments**: Tap Payments via RAL partner account

### Current Site Pages (reference for revamp)
1. Home
2. About Us (sub: About Feng Shui, About Deena)
3. Consultations (14 types)
4. Courses
5. Events
6. Shop
7. Blog
8. Contact Us

### Core Requirements
- **Consultations**: Browse, book, and pay for 14 consultation types
- **Courses**: Buy and enroll in online courses
- **Shop**: E-commerce for Feng Shui products (BHD pricing)
- **Blog**: CRUD from admin, displayed on public site
- **Events**: CRUD from admin, users can browse and buy/enlist
- **Admin Panel**: Full CRUD on courses, consultations, bookings, blog, events + calendar view + member management (CRITICAL — client currently has NO admin access)
- **Auth**: User registration, login, account management
- **Payments**: Tap Payments integration (replacing broken system)
- **Bilingual**: Arabic (default, RTL) + English (LTR) support

### Future Features (not yet in scope)
- **Gamification**: Duolingo-style course progress — points, rewards, scores, achievements, progress panel
- **Mobile App**: Potential future — not discussed in detail yet

## Tech Stack
- **Runtime**: Bun
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Routing**: TanStack Router
- **Data Fetching**: TanStack Query
- **Forms**: react-hook-form + zod
- **Animation**: GSAP + ScrollTrigger + Lenis (smooth scroll)
- **3D**: Spline (@splinetool/runtime) + Three.js
- **Components**: shadcn/ui + 21st.dev pre-built components

## Frontend Design Tools (MANDATORY)

> **IMPORTANT**: All 10 tools below MUST be installed and active before doing ANY UI/frontend work in this project. At the start of every conversation that involves UI work, verify each tool is set up. If ANY tool is missing or not configured, **immediately prompt the user to install/set it up before proceeding**. Do NOT skip this check. Do NOT build plain static UI when these tools are available.

### Tools Checklist

| # | Tool | Type | How to Verify | Install/Setup Command |
|---|------|------|---------------|----------------------|
| 1 | **UI UX Pro Max** | Skill/Plugin | Check for `.uipro` or `uipro.config.*` in project root | `uipro init --ai claude` |
| 2 | **21st.dev** | Component Library | N/A — no install needed, browse https://21st.dev | None — just use it |
| 3 | **Frontend Design Plugin** | Global Plugin | Already installed globally (`frontend-design@claude-plugins-official`) | None — auto-activates |
| 4 | **Spline** | npm package | Check `package.json` for `@splinetool/react-spline` | `bun add @splinetool/react-spline @splinetool/runtime` |
| 5 | **GSAP + ScrollTrigger** | npm package | Check `package.json` for `gsap` | `bun add gsap` |
| 6 | **Lenis** | npm package | Check `package.json` for `lenis` | `bun add lenis` |
| 7 | **Three.js** | npm package | Check `package.json` for `three` | `bun add three @types/three` |
| 8 | **shadcn/ui** | Component Library | Check for `components.json` in project root | `npx shadcn@latest init` |
| 9 | **shadcn MCP** | MCP Server | Check for shadcn entry in `.mcp.json` | `npx shadcn@latest mcp init --client claude` |
| 10 | **Context7 MCP** | MCP Server | Check global MCP config at `C:\Users\User\.claude\.mcp.json` for context7 | Already configured globally — use for ALL library/framework doc lookups |

### Usage Rules
- **Always use UI UX Pro Max** for design system decisions (colors, typography, spacing, style direction)
- **Always prefer 21st.dev** pre-built components over building from scratch
- **Always use Context7 MCP** to look up library/framework docs — never rely on training data alone
- **Always use shadcn MCP** to search for shadcn/ui components before building custom ones
- **Always use GSAP + Lenis** for scroll animations — never use plain CSS scroll or IntersectionObserver alone
- **Always use Spline or Three.js** for 3D — never fake 3D with CSS transforms
- **Combine tools freely** when it produces a better result (e.g., GSAP + Lenis + Spline together)
- If a tool is not set up, **stop and prompt the user** with the exact install command before continuing

### Mandatory Skills & MCP Usage (EVERY Session)
> **CRITICAL**: At the start of EVERY conversation involving UI/frontend work, you MUST:
> 1. **Activate the `frontend-design` skill** — invoke it before writing any UI code. It enforces premium design standards: distinctive typography, bold aesthetic direction, intentional color use, and production-grade polish. Never build generic/plain UI.
> 2. **Activate the `context7-mcp` skill** — invoke it before writing code that uses any library/framework (GSAP, React, Tailwind, Lenis, etc.). Always resolve the library ID and query docs for current API patterns instead of relying on training data.
> 3. **Use `@gsap/react` `useGSAP()` hook** — prefer `useGSAP()` over raw `useEffect` + `gsap.context()` for all GSAP animations. It handles cleanup automatically and works properly with React strict mode. Install: `bun add @gsap/react`.

## Brand & Design System

### Logo
- **Primary logo**: `src/assets/logo.png` (also `public/logo.png`)
- Mandala/flower pattern in green and teal/blue with "DOO FENG SHUI" text
- Use for navbar, favicon, and anywhere brand identity is needed

### Colors (from current site — may be refined)
| Role | Color | Hex |
|------|-------|-----|
| Primary (Teal) | Blue-teal | `#1686AF` |
| Secondary (Blue) | Darker blue | `#0057A9` |
| Accent (Gold) | Gold/bronze | `#D9B95F` |
| Green | Nature/growth | `#9CBF1B` |
| Light Teal | Bright accent | `#36ABD9` |
| Light Cream | Warm bg | `#F6DFA2` |
| Beige | Soft bg | `#f2e7d8` |
| Light Blue | Section bg | `#E7FDFD` |

### Brand Gradient
```css
background: linear-gradient(to bottom, #9CBF1B, #36ABD9);
```

### Fonts
- **English**: "Roboto", sans-serif
- **Arabic**: "Cairo" (primary), "Tajawal" (alt)

### Design Direction
- Nature/harmony inspired — aligns with Feng Shui energy themes
- Gold accents for premium/luxury feel (consultation pricing)
- Green-to-teal gradient is the strongest brand element after the logo
- Clean, spacious layouts with soft backgrounds

## Layout Rules (CRITICAL)
- **Full width always** — NO `max-w-*` containers anywhere on the site. Every section, navbar, footer, and page element must span the full viewport width. Use horizontal padding for breathing room, never width caps.
- This applies to: navbar, all page sections, footer, admin pages, every layout wrapper
- Individual text elements and card grids CAN use `max-w-*` for readability — only layout wrappers are full width.

## Responsive Design Rules (MANDATORY)
> **CRITICAL**: Every component and section MUST be optimized for all device sizes. Mobile-first approach with progressive enhancement. Never build desktop-only UI.

### Horizontal Padding Scale
Use this responsive padding on ALL content wrappers:
```
px-6 sm:px-8 md:px-12 lg:px-14 xl:px-20
```
- `px-6` (24px) — mobile baseline, keeps content away from screen edges
- `sm:px-8` (32px) — small tablets and larger phones
- `md:px-12` (48px) — tablets
- `lg:px-14` / `xl:px-20` — desktop

### Typography Scale
Always scale font sizes progressively. Never use a single large size across all breakpoints:
```
Headings:  text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
Subtitles: text-sm sm:text-base md:text-lg lg:text-xl
Body:      text-sm sm:text-base
Labels:    text-[8px] sm:text-[10px] lg:text-[11px]
```

### Spacing Between Sections
Use `clamp()` for fluid spacing that adapts without breakpoints:
```
marginBottom: clamp(min, preferred-vw, max)
```
Example: `clamp(2.5rem, 5vw, 4.5rem)` — 40px on mobile, grows to 72px on desktop.

### Mobile-Specific Rules
- **Viewport height**: Use `100dvh` (dynamic viewport height) not `100vh` — accounts for mobile browser chrome
- **Buttons**: Must be `w-full sm:w-auto` — full width on mobile, auto on desktop
- **Cards/grids**: Reduce internal padding on mobile (`px-2 sm:px-5 lg:px-6`, `py-4 sm:py-6 lg:py-7`)
- **Stat cards, feature cards**: Keep grid columns but shrink padding and font sizes rather than stacking
- **Touch targets**: Minimum 44×44px tap targets on all interactive elements
- **Flex layouts**: Use `flex-col sm:flex-row` for button groups and horizontal layouts
- **Border radius**: Scale down on mobile (`rounded-xl sm:rounded-2xl`)
- **Icon sizes**: Scale with breakpoints (`w-4 h-4 sm:w-5 sm:h-5`)
- **Emblem/logo sizes**: Scale with breakpoints, smaller on mobile to save vertical space
- **Content padding top**: Add `py-28 sm:py-32 lg:py-0` on hero-type sections to account for navbar + safe area

## Code Conventions
- Use TypeScript strict mode — no `any`
- Prefer functional components with hooks
- Use absolute imports via `@/` path alias
- Co-locate components with their styles and tests
- All UI must handle loading, error, and empty states
- Every user action needs success AND error toast notifications
- Form fields: mandatory with red border on validation error

## File Structure
```
src/
  components/    # Reusable UI components
  pages/         # Route-level page components
  hooks/         # Custom React hooks
  lib/           # Utilities, helpers, config
  assets/        # Static assets (images, fonts, icons)
  styles/        # Global styles
public/          # Public static files
```

## Commands
- `bun install` — install dependencies
- `bun run dev` — start dev server
- `bun run build` — production build
- `bun run preview` — preview production build
- `bun run lint` — run linter

## Architecture Doc
- See [ARCHITECTURE.md](ARCHITECTURE.md) — **MUST be updated on every architectural change, new feature, or structural decision**
- Update the Change Log table at the bottom of ARCHITECTURE.md with date, change description, and files affected

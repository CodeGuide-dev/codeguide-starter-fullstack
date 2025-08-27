# Project Requirements Document: codeguide-starter

---

## 1. Project Overview

The **codeguide-starter** project is a boilerplate web application that provides a ready-made foundation for any web project requiring secure user authentication and a post-login dashboard. It sets up the common building blocks—sign-up and sign-in pages, API routes to handle registration and login, and a simple dashboard interface driven by static data. By delivering this skeleton, it accelerates development time and ensures best practices are in place from day one.

This starter kit is being built to solve the friction developers face when setting up repeated common tasks: credential handling, session management, page routing, and theming. Key objectives include: 1) delivering a fully working authentication flow (registration & login), 2) providing a gated dashboard area upon successful login, 3) establishing a clear, maintainable project structure using Next.js and TypeScript, and 4) demonstrating a clean theming approach with global and section-specific CSS. Success is measured by having an end-to-end login journey in under 200 lines of code and zero runtime type errors.

---

## 2. In-Scope vs. Out-of-Scope

### In-Scope (Version 1)
- User registration (sign-up) form with validation
- User login (sign-in) form with validation
- Next.js API routes under `/api/auth/route.ts` handling:
  - Credential validation
  - Password hashing (e.g., bcrypt)
  - Session creation or JWT issuance
- Protected dashboard pages under `/dashboard`:
  - `layout.tsx` wrapping dashboard content
  - `page.tsx` rendering static data from `data.json`
- Global application layout in `/app/layout.tsx`
- Basic styling via `globals.css` and `dashboard/theme.css`
- TypeScript strict mode enabled

### Out-of-Scope (Later Phases)
- Integration with a real database (PostgreSQL, MongoDB, etc.)
- Advanced authentication flows (password reset, email verification, MFA)
- Role-based access control (RBAC)
- Multi-tenant or white-label theming
- Unit, integration, or end-to-end testing suites
- CI/CD pipeline and production deployment scripts

---

## 3. User Flow

A new visitor lands on the root URL and sees a welcome page with options to **Sign Up** or **Sign In**. If they choose Sign Up, they fill in their email, password, and hit “Create Account.” The form submits to `/api/auth/route.ts`, which hashes the password, creates a new user session or token, and redirects them to the dashboard. If any input is invalid, an inline error message explains the issue (e.g., “Password too short”).

Once authenticated, the user is taken to the `/dashboard` route. Here they see a sidebar or header defined by `dashboard/layout.tsx`, and the main panel pulls in static data from `data.json`. They can log out (if that control is present), but otherwise their entire session is managed by server-side cookies or tokens. Returning users go directly to Sign In, submit credentials, and upon success they land back on `/dashboard`. Any unauthorized access to `/dashboard` redirects back to Sign In.

---

## 4. Core Features

- **Sign-Up Page (`/app/sign-up/page.tsx`)**: Form fields for email & password, client-side validation, POST to `/api/auth`.
- **Sign-In Page (`/app/sign-in/page.tsx`)**: Form fields for email & password, client-side validation, POST to `/api/auth`.
- **Authentication API (`/app/api/auth/route.ts`)**: Handles both registration and login based on HTTP method, integrates password hashing (bcrypt) and session or JWT logic.
- **Global Layout (`/app/layout.tsx` + `globals.css`)**: Shared header, footer, and CSS resets across all pages.
- **Dashboard Layout (`/app/dashboard/layout.tsx` + `dashboard/theme.css`)**: Sidebar or top nav for authenticated flows, section-specific styling.
- **Dashboard Page (`/app/dashboard/page.tsx`)**: Reads `data.json`, renders it as cards or tables.
- **Static Data Source (`/app/dashboard/data.json`)**: Example dataset to demo dynamic rendering.
- **TypeScript Configuration**: `tsconfig.json` with strict mode and path aliases (if any).

---

## 5. Tech Stack & Tools

- **Framework**: Next.js (App Router) for file-based routing, SSR/SSG, and API routes.
- **Language**: TypeScript for type safety.
- **UI Library**: React 18 for component-based UI.
- **Styling**: Plain CSS via `globals.css` (global reset) and `theme.css` (sectional styling). Can easily migrate to CSS Modules or Tailwind in the future.
- **Backend**: Node.js runtime provided by Next.js API routes.
- **Password Hashing**: bcrypt (npm package).
- **Session/JWT**: NextAuth.js or custom JWT logic (to be decided in implementation).
- **IDE & Dev Tools**: VS Code with ESLint, Prettier extensions. Optionally, Cursor.ai for AI-assisted coding.

---

## 6. Non-Functional Requirements

- **Performance**: Initial page load under 200 ms on a standard broadband connection. API responses under 300 ms.
- **Security**:
  - HTTPS only in production.
  - Proper CORS, CSRF protection for API routes.
  - Secure password storage (bcrypt with salt).
  - No credentials or secrets checked into version control.
- **Scalability**: Structure must support adding database integration, caching layers, and advanced auth flows without rewiring core app.
- **Usability**: Forms should give real-time feedback on invalid input. Layout must be responsive (mobile > 320 px).
- **Maintainability**: Code must adhere to TypeScript strict mode. Linting & formatting enforced by ESLint/Prettier.

---

## 7. Constraints & Assumptions

- **No Database**: Dashboard uses only `data.json`; real database integration is deferred.
- **Node Version**: Requires Node.js >= 14.
- **Next.js Version**: Built on Next.js 13+ App Router.
- **Authentication**: Assumes availability of bcrypt or NextAuth.js at implementation time.
- **Hosting**: Targets serverless or Node.js-capable hosting (e.g., Vercel, Netlify).
- **Browser Support**: Modern evergreen browsers; no IE11 support required.

---

## 8. Known Issues & Potential Pitfalls

- **Static Data Limitation**: `data.json` is only for demo. A real API or database will be needed to avoid stale data.
  *Mitigation*: Define a clear interface for data fetching so swapping to a live endpoint is trivial.

- **Global CSS Conflicts**: Using global styles can lead to unintended overrides.
  *Mitigation*: Plan to migrate to CSS Modules or utility-first CSS in Phase 2.

- **API Route Ambiguity**: Single `/api/auth/route.ts` handling both sign-up and sign-in could get complex.
  *Mitigation*: Clearly branch on HTTP method (`POST /register` vs. `POST /login`) or split into separate files.

- **Lack of Testing**: No test suite means regressions can slip in.
  *Mitigation*: Build a minimal Jest + React Testing Library setup in an early iteration.

- **Error Handling Gaps**: Client and server must handle edge cases (network failures, malformed input).
  *Mitigation*: Define a standard error response schema and show user-friendly messages.

---

This PRD should serve as the single source of truth for the AI model or any developer generating the next set of technical documents: Tech Stack Doc, Frontend Guidelines, Backend Structure, App Flow, File Structure, and IDE Rules. It contains all functional and non-functional requirements with no ambiguity, enabling seamless downstream development.

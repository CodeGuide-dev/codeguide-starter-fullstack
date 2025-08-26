# Frontend Guideline Document

This document explains, in simple terms, how the frontend of the `codeguide-starter` project is structured, styled, and built. Anyone—technical or not—can read this and understand which tools are used, how components fit together, and what practices keep the app fast, reliable, and easy to maintain.

---

## 1. Frontend Architecture

**Core Frameworks and Libraries**
- **Next.js (App Router)**: A React-based framework that provides file-based routing, server-side rendering (SSR), static site generation (SSG), and built-in API endpoints all in one project.
- **React 18**: The library for building user interfaces using components and hooks.
- **TypeScript**: A superset of JavaScript that adds static types, helping catch errors early and making the code easier to understand and refactor.

**How It’s Organized**
- The `app/` folder holds all pages and layouts. Each URL path corresponds to a folder:
  - `/app/sign-in` and `/app/sign-up` for authentication pages.
  - `/app/dashboard` for the protected user area.
  - API routes live under `/app/api/auth/route.ts`.
- Each route folder contains:
  - `page.tsx` (the UI for that page)
  - `layout.tsx` (wrapping structure, like headers or sidebars)
  - Styles (e.g., `theme.css` in the dashboard).

**Why This Works**
- **Scalability**: Adding new pages or features means creating new folders with their own layouts and pages. You don’t have to touch a central router file.
- **Maintainability**: Code is separated by feature. Backend logic (API routes) lives alongside the frontend code for that feature, reducing context-switching.
- **Performance**: Next.js pre-renders pages where possible and splits code by route, so users download only what’s needed.

---

## 2. Design Principles

1. **Usability**: Forms give instant feedback. Buttons and links are clearly labeled.
2. **Accessibility**: Semantic HTML, proper color contrast, and focus outlines ensure people using screen readers or keyboards can navigate easily.
3. **Responsiveness**: Layouts adapt from mobile (320px) up to large desktop screens. CSS media queries ensure content resizes and stacks neatly.
4. **Consistency**: Shared global layout and styling mean pages look and feel like part of the same app.

**How We Apply Them**
- Form fields use `aria-*` attributes and visible labels.
- Error messages appear inline under inputs.
- Navigation elements (header, sidebar) appear in every layout.
- Breakpoints at 480px, 768px, and 1024px guide responsive adjustments.

---

## 3. Styling and Theming

**Approach**
- **Global Styles (`globals.css`)**: Resets, base typography, and common utility classes.
- **Section Styles (`theme.css` in dashboard)**: Styles specific to the dashboard area (colors, layouts).
- We follow a **BEM-inspired naming** for classes when writing new CSS to avoid conflicts and keep selectors clear.

**Visual Style**: Modern flat design with subtle shadows for depth. Clear spacing and large touch targets on mobile.

**Color Palette**
- **Primary Blue**: #1E90FF  (buttons, highlights)
- **Secondary Navy**: #2C3E50  (header, sidebar background)
- **Accent Cyan**: #00CEC9  (links, hover states)
- **Neutral Light**: #F8F9FA  (page backgrounds)
- **Neutral Dark**: #2D3436  (text, icons)

**Font**
- **Inter** (sans-serif): Clean, modern, highly legible on screens. Fallback to system fonts like `-apple-system, BlinkMacSystemFont, sans-serif`.

**Theming**
- To keep a consistent look, all colors and font sizes are defined in CSS variables in `globals.css`:
  ```css
  :root {
    --color-primary: #1E90FF;
    --color-secondary: #2C3E50;
    --color-accent: #00CEC9;
    --color-bg: #F8F9FA;
    --color-text: #2D3436;
    --font-family: 'Inter', sans-serif;
  }
  ```
- Components consume these variables for backgrounds, borders, and text.

---

## 4. Component Structure

**File Layout**
- `/app` (top-level folder)
  - `layout.tsx`: Global wrapper (nav, footer).
  - `page.tsx`: Landing or redirect logic.
  - `/sign-in`, `/sign-up`, `/dashboard`, `/api/auth`
    - Each has its own `layout.tsx` and `page.tsx`.
- **Common Components**: Put reusable UI pieces (buttons, inputs, cards) into a `/components` folder at the project root.

**Reusability & Encapsulation**
- Components are self-contained: each has its own styles (class names scoped to BEM) and behavior.
- Shared logic (e.g., API calls) lives in `/lib` or `/hooks` so pages import only what they need.

**Benefits**
- **Easier Maintenance**: Fix a bug in one button component, and it updates everywhere.
- **Better Team Collaboration**: Developers can own specific components or pages without stepping on each other’s code.

---

## 5. State Management

**Current Approach**
- **Local State**: React `useState` and `useEffect` for form values, loading flags, and error messages.
- **Server State**: Fetch data (e.g., dashboard JSON) directly in page components or using React Server Components.

**Sharing State**
- **React Context**: A simple auth context (`AuthContext`) holds the user’s session info, login/logout methods, and makes it available to any component.
  - Located in `/context/AuthContext.tsx`.

**Future Growth**
- If complexity grows (deeply nested data, multiple user roles), consider:
  - **Redux Toolkit** or **Zustand** for centralized state.
  - Query libraries like **React Query** or **SWR** for caching and re-fetch logic.

---

## 6. Routing and Navigation

**Routing Library**
- Built into **Next.js App Router**. Each folder under `/app` becomes a route automatically.
- Layouts (`layout.tsx`) and pages (`page.tsx`) are colocated for that route.

**Protected Pages**
- The dashboard’s `layout.tsx` checks for a valid session (via cookie or context). If missing, it issues a server-side redirect to `/sign-in`.

**Navigation Structure**
- **Header**: Present in global layout with the app logo and conditional Sign In/Sign Out links.
- **Sidebar**: Included in `dashboard/layout.tsx` with links to dashboard sections (expandable in future).

---

## 7. Performance Optimization

1. **Code Splitting**: Next.js automatically breaks code by route. Users only load JS needed for the current page.
2. **Lazy Loading**: For large components (charts, maps), wrap with `next/dynamic` to load them only when needed.
3. **Image Optimization**: Use Next.js `<Image>` component to serve responsive, compressed images.
4. **Caching**:
   - Static assets (CSS, fonts) use long cache headers.
   - API responses can be cached or ISR (Incremental Static Regeneration) applied.
5. **Minification & Compression**: Next.js production builds automatically minify JS and CSS, and enable Brotli/Gzip on the CDN.

These steps ensure fast page loads and smooth interactions.

---

## 8. Testing and Quality Assurance

**Unit Tests**
- **Jest** + **React Testing Library** for components and utility functions.
- Example: test that the Sign In form shows an error message when fields are empty.

**Integration Tests**
- Combine multiple components and hooks; test API calls with **msw** (Mock Service Worker).

**End-to-End (E2E) Tests**
- **Cypress** or **Playwright** to simulate real user flows: signing up, logging in, and viewing the dashboard.

**Linting & Formatting**
- **ESLint** enforces code style and catches common bugs.
- **Prettier** applies consistent formatting.
- **Git Hooks** (via Husky) run linting/tests before each commit.

**Continuous Integration (CI)**
- **GitHub Actions** runs tests and lint on each pull request, preventing regressions.

---

## 9. Conclusion and Overall Frontend Summary

The `codeguide-starter` frontend is built on modern, well-established tools—Next.js, React, and TypeScript—and follows clear principles around usability, accessibility, and maintainability. Its file-based structure, component-driven approach, and CSS-variable theming keep things organized and consistent.

Key takeaways:
- **Scalable Structure**: Add new features by creating new folders under `app/` without touching a central router.
- **Component Reuse**: Shared UI pieces live in one place, making updates quick and error-free.
- **Simple Styling**: Global and section-specific CSS, underpinned by CSS variables, ensures a unified look.
- **Smooth Performance**: Next.js automatic optimizations plus best practices like lazy loading and caching.
- **Quality Assurance**: A testing plan that covers unit, integration, and E2E scenarios, enforced by CI.

With these guidelines, any developer coming into the project can understand how the pieces fit together, how to follow existing patterns, and how to keep the app fast, reliable, and easy to grow.
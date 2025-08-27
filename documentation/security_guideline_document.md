# Security Guidelines for codeguide-starter

This document defines mandatory security principles and implementation best practices tailored to the **codeguide-starter** repository. It aligns with Security-by-Design, Least Privilege, Defense-in-Depth, and other core security tenets. All sections reference specific areas of the codebase (e.g., `/app/api/auth/route.ts`, CSS files, environment configuration) to ensure practical guidance.

---

## 1. Security by Design

• Embed security from day one: review threat models whenever adding new features (e.g., new API routes, data fetching).
• Apply “secure defaults” in Next.js configuration (`next.config.js`), enabling strict mode and disabling debug flags in production builds.
• Maintain a security checklist in your PR template to confirm that each change has been reviewed against this guideline.

---

## 2. Authentication & Access Control

### 2.1 Password Storage
- Use **bcrypt** (or Argon2) with a per-user salt to hash passwords in `/app/api/auth/route.ts`.
- Enforce a strong password policy on both client and server: minimum 12 characters, mixed case, numbers, and symbols.

### 2.2 Session Management
- Issue sessions via Secure, HttpOnly, SameSite=strict cookies. Do **not** expose tokens to JavaScript.
- Implement absolute and idle timeouts. For example, invalidate sessions after 30 minutes of inactivity.
- Protect against session fixation by regenerating session IDs after authentication.

### 2.3 Brute-Force & Rate Limiting
- Apply rate limiting at the API layer (e.g., using `express-rate-limit` or Next.js middleware) on `/api/auth` to throttle repeated login attempts.
- Introduce exponential backoff or temporary lockout after N failed attempts.

### 2.4 Role-Based Access Control (Future)
- Define user roles in your database model (e.g., `role = 'user' | 'admin'`).
- Enforce server-side authorization checks in every protected route (e.g., in `dashboard/layout.tsx` loader functions).

---

## 3. Input Handling & Processing

### 3.1 Validate & Sanitize All Inputs
- On **client** (`sign-up/page.tsx`, `sign-in/page.tsx`): perform basic format checks (email regex, password length).
- On **server** (`/app/api/auth/route.ts`): re-validate inputs with a schema validator (e.g., `zod`, `Joi`).
- Reject or sanitize any unexpected fields to prevent injection attacks.

### 3.2 Prevent Injection
- If you introduce a database later, always use parameterized queries or an ORM (e.g., Prisma) rather than string concatenation.
- Avoid dynamic `eval()` or template rendering with unsanitized user input.

### 3.3 Safe Redirects
- When redirecting after login or logout, validate the target against an allow-list to prevent open redirects.

---

## 4. Data Protection & Privacy

### 4.1 Encryption & Secrets
- Enforce HTTPS/TLS 1.2+ for all front-end ↔ back-end communications.
- Never commit secrets—use environment variables and a secrets manager (e.g., AWS Secrets Manager, Vault).

### 4.2 Sensitive Data Handling
- Do ​not​ log raw passwords, tokens, or PII in server logs. Mask or redact any user identifiers.
- If storing PII in `data.json` or a future database, classify it and apply data retention policies.

---

## 5. API & Service Security

### 5.1 HTTPS Enforcement
- In production, redirect all HTTP traffic to HTTPS (e.g., via Vercel’s redirect rules or custom middleware).

### 5.2 CORS
- Configure `next.config.js` or API middleware to allow **only** your front-end origin (e.g., `https://your-domain.com`).

### 5.3 API Versioning & Minimal Exposure
- Version your API routes (e.g., `/api/v1/auth`) to handle future changes without breaking clients.
- Return only necessary fields in JSON responses; avoid leaking internal server paths or stack traces.

---

## 6. Web Application Security Hygiene

### 6.1 CSRF Protection
- Use anti-CSRF tokens for any state-changing API calls. Integrate Next.js CSRF middleware or implement synchronizer tokens stored in cookies.

### 6.2 Security Headers
- In `next.config.js` (or a custom server), add these headers:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: no-referrer-when-downgrade`
  - `Content-Security-Policy`: restrict script/style/src to self and trusted CDNs.

### 6.3 Secure Cookies
- Set `Secure`, `HttpOnly`, `SameSite=Strict` on all cookies. Avoid storing sensitive data in `localStorage`.

### 6.4 Prevent XSS
- Escape or encode all user-supplied data in React templates. Avoid `dangerouslySetInnerHTML` unless content is sanitized.

---

## 7. Infrastructure & Configuration Management

- Harden your hosting environment (e.g., Vercel/Netlify) by disabling unnecessary endpoints (GraphQL/GraphiQL playgrounds in production).
- Rotate secrets and API keys regularly via your secrets manager.
- Maintain minimal privileges: e.g., database accounts should only have read/write on required tables.
- Keep Node.js, Next.js, and all system packages up to date.

---

## 8. Dependency Management

- Commit and maintain `package-lock.json` to guarantee reproducible builds.
- Integrate a vulnerability scanner (e.g., GitHub Dependabot, Snyk) to monitor and alert on CVEs in dependencies.
- Trim unused packages; each added library increases the attack surface.

---

Adherence to these guidelines will ensure that **codeguide-starter** remains secure, maintainable, and resilient as it evolves. Regularly review and update this document to reflect new threats and best practices.
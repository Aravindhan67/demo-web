# UI/UX Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the approved usability, accessibility, trust, and conversion issues without changing the website's current visual design.

**Architecture:** Add one small WhatsApp URL utility, integrate it into the existing contact experience, improve semantics inside existing components, and add global accessibility CSS plus a focused Not Found route. Existing layouts and styling patterns remain intact.

**Tech Stack:** React 19, TypeScript, React Router, CSS, Node built-in test runner

---

### Task 1: WhatsApp enquiry utility

**Files:**
- Create: `src/utils/whatsapp.ts`
- Create: `src/utils/whatsapp.test.ts`
- Modify: `package.json`

- [ ] Write a failing Node test asserting that `createWhatsAppUrl()` trims fields, omits an empty phone field, URL-encodes the enquiry, and targets `919489227725`.
- [ ] Run `node --experimental-strip-types --test src/utils/whatsapp.test.ts` and confirm it fails because the utility does not exist.
- [ ] Implement `createWhatsAppUrl(data)` using `URLSearchParams`.
- [ ] Add `"test": "node --experimental-strip-types --test src/utils/whatsapp.test.ts"` to `package.json`.
- [ ] Run `npm test` and confirm the utility tests pass.

### Task 2: Honest WhatsApp contact flow

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] Replace the false sent-success state with a status explaining that WhatsApp opened and the visitor still needs to send the message.
- [ ] Use `createWhatsAppUrl()` in form submission and scheduling actions.
- [ ] Add connected `label`/`id` pairs, `name`, and `autoComplete` attributes.
- [ ] Remove inline `outline: none` declarations.
- [ ] Add `role="status"` and `aria-live="polite"` to the form status.
- [ ] Preserve all existing layout and visual styles.

### Task 3: Navigation, footer, and homepage integrity

**Files:**
- Modify: `src/layout/Navbar.tsx`
- Modify: `src/layout/Footer.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] Add `aria-expanded`, `aria-controls`, descriptive theme text, and dialog/menu semantics to navigation controls.
- [ ] Replace broken encoded navigation icons with accessible React icons already used by the project.
- [ ] Remove placeholder footer social links and fix the copyright character.
- [ ] Make the homepage video action navigate to About.
- [ ] Replace unsupported client-logo and numerical-claim sections with capability and process proof using the same section/card styles.
- [ ] Fix touched visible text such as “Industries We Serve” and “How We Are.”

### Task 4: Route recovery and global accessibility

**Files:**
- Create: `src/pages/NotFound.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

- [ ] Add a visually consistent Not Found page with Home and Contact actions.
- [ ] Add a catch-all `*` route.
- [ ] Add shared `:focus-visible` styles.
- [ ] Make the desktop services dropdown open on `:focus-within`.
- [ ] Prevent the closed mobile menu from receiving pointer interaction or visibility.
- [ ] Add `prefers-reduced-motion: reduce` rules that disable decorative animation, transitions, and smooth scrolling.

### Task 5: Verification

**Files:**
- Review all modified files

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Search modified user-facing files for placeholder `href="#"`, false success language, and mojibake.
- [ ] Review the Git diff to ensure no visual redesign or unrelated changes were introduced.

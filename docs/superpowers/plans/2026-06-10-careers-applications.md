# Careers and Applications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build CMS-managed openings and a secure website-to-CMS applicant tracking workflow with GridFS resumes.

**Architecture:** Continue using the existing structured content system for job openings. Add a focused NestJS careers module for multipart applications, GridFS resume persistence, protected applicant administration, and status updates. Add public React job detail/application experiences and a Next.js CMS application inbox.

**Tech Stack:** NestJS, MongoDB/GridFS, class-validator, Next.js, React, TypeScript, Node test runner

---

### Task 1: Database contract

**Files:**
- Modify: `cms-platform/database/bootstrap.mjs`
- Modify: `cms-platform/database/schema.test.mjs`

- [ ] Add failing schema assertions for `jobApplications`, scoped indexes, and the expanded opening seed.
- [ ] Run `node --test database/schema.test.mjs` and confirm failure.
- [ ] Add the collection, indexes, and complete talent-network seed.
- [ ] Run the schema tests and confirm they pass.

### Task 2: Careers application API

**Files:**
- Create: `cms-platform/apps/api/src/careers/careers.service.ts`
- Create: `cms-platform/apps/api/src/careers/careers.repository.ts`
- Create: `cms-platform/apps/api/src/careers/careers.controller.ts`
- Create: `cms-platform/apps/api/src/careers/careers.module.ts`
- Create: `cms-platform/apps/api/src/careers/careers.service.test.ts`
- Create: `cms-platform/apps/api/src/careers/careers.repository.test.ts`
- Modify: `cms-platform/apps/api/src/app.module.ts`
- Modify: `cms-platform/apps/api/src/database/database.service.ts`

- [ ] Write failing service tests for role-specific/general applications, opening availability, validation, and duplicate protection.
- [ ] Write failing repository tests for tenant/site scope, GridFS metadata, listing, and status updates.
- [ ] Run focused tests and confirm failure.
- [ ] Implement service validation and repository persistence.
- [ ] Implement multipart public submit plus protected list, status, and resume-download endpoints.
- [ ] Run focused API tests and confirm they pass.

### Task 3: CMS careers administration

**Files:**
- Modify: `cms-platform/apps/admin/lib/collections.ts`
- Modify: `cms-platform/apps/admin/app/admin-shell.tsx`
- Create: `cms-platform/apps/admin/app/applications/page.tsx`
- Create: `cms-platform/apps/admin/careers-page.test.mjs`
- Modify: `cms-platform/apps/admin/package.json`
- Modify: `cms-platform/apps/admin/app/globals.css`

- [ ] Write a failing source contract test for opening fields, application filters, statuses, details, and resume download.
- [ ] Run the admin test and confirm failure.
- [ ] Add complete friendly opening fields and an Applications navigation item.
- [ ] Build the application inbox with filters, candidate detail view, status update, and authenticated resume download.
- [ ] Run admin tests and build.

### Task 4: Public careers experience

**Files:**
- Modify: `src/data/cmsSections.ts`
- Modify: `src/api/contracts.ts`
- Modify: `src/api/cmsClient.ts`
- Modify: `src/pages/Careers.tsx`
- Create: `src/pages/CareerOpening.tsx`
- Create: `src/components/CareerApplicationForm.tsx`
- Create: `src/data/careers.test.ts`
- Modify: `src/api/cmsClient.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `package.json`

- [ ] Write failing tests for opening normalization and multipart submission.
- [ ] Run website tests and confirm failure.
- [ ] Add job detail routes, opening cards, role detail content, and role-specific/general application forms.
- [ ] Add client-side file validation and clear success/error states.
- [ ] Run website tests and build.

### Task 5: End-to-end verification

- [ ] Run `npm test` and `npm run build` in the website.
- [ ] Run `npm test` and builds in `cms-platform`.
- [ ] Run `npm run db:setup`.
- [ ] Verify public openings, multipart application submission, admin listing, status update, and protected resume download against localhost.

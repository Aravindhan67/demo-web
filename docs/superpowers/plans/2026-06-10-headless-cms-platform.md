# Headless CMS Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separately deployable, multi-tenant headless CMS vertical slice and connect the existing website to it only through versioned HTTP APIs.

**Architecture:** `cms-platform` is an independent npm workspace containing a NestJS REST API, Next.js admin application, shared contracts, PostgreSQL migrations, and Docker/Kubernetes deployment assets. The existing Vite website receives a small CMS client that calls public endpoints and retains local content as a resilience fallback; neither codebase imports source from the other.

**Tech Stack:** TypeScript, NestJS, Next.js, PostgreSQL, Redis, S3-compatible storage, OpenAPI/Swagger, Node test runner, Docker Compose, Kubernetes.

---

## File Structure

```text
cms-platform/
  apps/api/                 NestJS API, domain services, PostgreSQL repositories
  apps/admin/               Next.js admin panel
  packages/contracts/       Shared request/response contracts
  database/migrations/      PostgreSQL schema and RLS policies
  deploy/docker/            Local independent infrastructure
  deploy/kubernetes/        Production deployment templates
src/api/                    Website-owned CMS HTTP client
```

### Task 1: Independent Workspace Foundation

**Files:**
- Create: `cms-platform/package.json`
- Create: `cms-platform/tsconfig.base.json`
- Create: `cms-platform/.env.example`
- Create: `cms-platform/README.md`
- Create: `cms-platform/packages/contracts/package.json`
- Create: `cms-platform/packages/contracts/tsconfig.json`
- Create: `cms-platform/packages/contracts/src/index.ts`

- [ ] **Step 1: Write the failing contract test**

Create `cms-platform/packages/contracts/src/contracts.test.ts` with assertions that published status values and API envelope shapes are stable.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --workspace @jac-cms/contracts`
Expected: FAIL because the contract module does not exist.

- [ ] **Step 3: Implement minimal contracts**

Define tenant/site context, content status, page, service, settings, form submission, lead, API envelope, and paginated response types.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test --workspace @jac-cms/contracts`
Expected: PASS.

### Task 2: PostgreSQL Domain Schema

**Files:**
- Create: `cms-platform/database/migrations/001_initial_schema.sql`
- Create: `cms-platform/database/seeds/001_jac_media_land.sql`
- Create: `cms-platform/database/schema.test.mjs`

- [ ] **Step 1: Write the failing schema test**

Assert the migration contains tenant/site foreign keys, pages, revisions, services, settings, forms, leads, users, roles, permissions, refresh tokens, audit logs, indexes, and row-level security policies.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test database/schema.test.mjs`
Expected: FAIL because the migration is absent.

- [ ] **Step 3: Implement schema and seed**

Create UUID-based tables, status constraints, tenant/site indexes, RLS policies, and initial JAC MediaLand site/settings/services seed data.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test database/schema.test.mjs`
Expected: PASS.

### Task 3: NestJS API Foundation

**Files:**
- Create: `cms-platform/apps/api/package.json`
- Create: `cms-platform/apps/api/tsconfig.json`
- Create: `cms-platform/apps/api/src/main.ts`
- Create: `cms-platform/apps/api/src/app.module.ts`
- Create: `cms-platform/apps/api/src/config/env.ts`
- Create: `cms-platform/apps/api/src/common/api-response.ts`
- Create: `cms-platform/apps/api/src/common/api-response.test.ts`
- Create: `cms-platform/apps/api/src/database/database.module.ts`
- Create: `cms-platform/apps/api/src/database/database.service.ts`

- [ ] **Step 1: Write failing API response and environment tests**
- [ ] **Step 2: Run tests and confirm expected failures**
- [ ] **Step 3: Implement validated environment loading, PostgreSQL pool, global validation, CORS, versioning, and Swagger**
- [ ] **Step 4: Run API tests and build**

Run: `npm test --workspace @jac-cms/api && npm run build --workspace @jac-cms/api`
Expected: PASS.

### Task 4: Authentication and RBAC

**Files:**
- Create: `cms-platform/apps/api/src/auth/token.service.ts`
- Create: `cms-platform/apps/api/src/auth/token.service.test.ts`
- Create: `cms-platform/apps/api/src/auth/auth.controller.ts`
- Create: `cms-platform/apps/api/src/auth/auth.service.ts`
- Create: `cms-platform/apps/api/src/auth/auth.module.ts`
- Create: `cms-platform/apps/api/src/auth/auth.guard.ts`
- Create: `cms-platform/apps/api/src/auth/permissions.decorator.ts`
- Create: `cms-platform/apps/api/src/auth/permissions.guard.ts`

- [ ] **Step 1: Write failing token expiry, tampering, and permission tests**
- [ ] **Step 2: Run tests and confirm expected failures**
- [ ] **Step 3: Implement HMAC access/refresh tokens, login/refresh/logout, authenticated request context, and permission checks**
- [ ] **Step 4: Run API tests**

### Task 5: Public and Admin Content APIs

**Files:**
- Create: `cms-platform/apps/api/src/content/content.repository.ts`
- Create: `cms-platform/apps/api/src/content/content.service.ts`
- Create: `cms-platform/apps/api/src/content/content.service.test.ts`
- Create: `cms-platform/apps/api/src/content/public-content.controller.ts`
- Create: `cms-platform/apps/api/src/content/admin-content.controller.ts`
- Create: `cms-platform/apps/api/src/content/content.module.ts`
- Create: `cms-platform/apps/api/src/content/dto/*.ts`

- [ ] **Step 1: Write failing tests for published-only public reads, tenant scoping, slug validation, and revisions**
- [ ] **Step 2: Run tests and confirm expected failures**
- [ ] **Step 3: Implement settings, pages, services, menus, and publish/revision APIs**
- [ ] **Step 4: Run API tests and build**

### Task 6: Forms and Lead Management

**Files:**
- Create: `cms-platform/apps/api/src/leads/leads.service.ts`
- Create: `cms-platform/apps/api/src/leads/leads.service.test.ts`
- Create: `cms-platform/apps/api/src/leads/public-forms.controller.ts`
- Create: `cms-platform/apps/api/src/leads/admin-leads.controller.ts`
- Create: `cms-platform/apps/api/src/leads/leads.module.ts`

- [ ] **Step 1: Write failing tests for field validation, honeypot rejection, idempotency, and tenant scoping**
- [ ] **Step 2: Run tests and confirm expected failures**
- [ ] **Step 3: Implement public submission and admin lead workflow**
- [ ] **Step 4: Run API tests and build**

### Task 7: Next.js Admin Shell

**Files:**
- Create: `cms-platform/apps/admin/package.json`
- Create: `cms-platform/apps/admin/tsconfig.json`
- Create: `cms-platform/apps/admin/next.config.ts`
- Create: `cms-platform/apps/admin/app/layout.tsx`
- Create: `cms-platform/apps/admin/app/page.tsx`
- Create: `cms-platform/apps/admin/app/content/page.tsx`
- Create: `cms-platform/apps/admin/app/leads/page.tsx`
- Create: `cms-platform/apps/admin/app/settings/page.tsx`
- Create: `cms-platform/apps/admin/app/globals.css`
- Create: `cms-platform/apps/admin/lib/api.ts`

- [ ] **Step 1: Write failing API URL configuration test**
- [ ] **Step 2: Run test and confirm expected failure**
- [ ] **Step 3: Implement accessible responsive dashboard, content, lead, and settings screens backed by the admin API**
- [ ] **Step 4: Run admin test and build**

### Task 8: Deployment and Operations

**Files:**
- Create: `cms-platform/deploy/docker/docker-compose.yml`
- Create: `cms-platform/apps/api/Dockerfile`
- Create: `cms-platform/apps/admin/Dockerfile`
- Create: `cms-platform/deploy/kubernetes/base/*.yaml`
- Create: `cms-platform/deploy/kubernetes/overlays/production/kustomization.yaml`

- [ ] **Step 1: Write failing deployment manifest test**
- [ ] **Step 2: Run test and confirm expected failure**
- [ ] **Step 3: Implement independent API/admin images, PostgreSQL/Redis/MinIO local stack, health probes, secrets references, and autoscaling templates**
- [ ] **Step 4: Run deployment manifest tests**

### Task 9: Website API Integration

**Files:**
- Create: `src/api/contracts.ts`
- Create: `src/api/cmsClient.ts`
- Create: `src/api/cmsClient.test.ts`
- Modify: `public/sw.js`

- [ ] **Step 1: Write failing website CMS client tests for URL construction, envelope parsing, timeout, and fallback**
- [ ] **Step 2: Run test and confirm expected failure**
- [ ] **Step 3: Implement website-owned public API client and exclude CMS/API requests from service-worker caching**
- [ ] **Step 4: Run website tests, lint, and build**

### Task 10: Full Verification

- [ ] **Step 1: Run all CMS tests**

Run: `npm test --prefix cms-platform`
Expected: PASS.

- [ ] **Step 2: Build API and admin independently**

Run: `npm run build --prefix cms-platform`
Expected: PASS.

- [ ] **Step 3: Verify existing website independently**

Run: `npm test && npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Review source boundaries**

Confirm the website imports no `cms-platform` source and the CMS imports no website source.
# Implementation Override

As of June 10, 2026, the approved implementation uses MongoDB and does not use
Docker or Kubernetes. PostgreSQL, RLS, Redis, S3, Docker, and Kubernetes tasks
below are historical and superseded for the current project.

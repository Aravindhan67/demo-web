# Careers and Applications Design

## Goal

Allow JAC CMS administrators to publish job openings and manage applicants, while candidates can apply for a specific role or join the general talent network directly from the website.

## Openings

Job openings remain in the existing tenant-scoped `careerOpenings` structured collection so they retain the CMS editor, status publishing, ordering, and content revisions.

Each opening supports title, slug, department, location, employment type, workplace type, salary text, summary, full description, responsibilities, requirements, benefits, closing date, and whether applications are accepted. Public APIs expose only published openings. Closed or archived openings cannot receive applications.

## Applications

Applications use a dedicated `jobApplications` collection. Each record stores the tenant/site scope, optional opening ID and slug, candidate contact details, experience, portfolio/LinkedIn URL, cover letter, resume metadata, source, status, and timestamps.

The general talent-network form submits without an opening ID. Statuses are `new`, `reviewing`, `shortlisted`, `interview`, `hired`, and `rejected`.

## Resume Storage

Resumes are uploaded as multipart form data and stored in a MongoDB GridFS bucket named `careerResumes`. Accepted files are PDF, DOC, and DOCX up to 5 MB. Files include tenant/site/application metadata. Resume download is available only through an authenticated, site-scoped admin endpoint.

## User Experience

The public careers page lists published openings and links to dedicated job pages. Each job page shows structured role information and an application form. The careers page also includes a general talent-network application.

The CMS adds an Applications inbox with filtering, candidate details, status updates, and secure resume downloads. The existing Careers collection editor gains friendly opening fields.

## Validation and Security

The API validates candidate name, email, phone, URLs, required cover letter, opening availability, file type, and file size. Applicant APIs are tenant/site scoped. Public submissions include a honeypot and idempotency key. Resume files are never exposed through public URLs.

## Verification

Tests cover opening publishing, application validation, duplicate protection, GridFS upload metadata, site-scoped administration, status progression, CMS UI source contracts, public form behavior, builds, and a live local submission workflow.

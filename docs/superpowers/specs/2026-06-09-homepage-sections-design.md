# Homepage Sections And Contact Destinations Design

## Goal

Update the confirmed contact and social destinations, remove the Trusted
Companies section, and redesign only the Industries and Highlights sections
without changing the rest of the website.

## Approved Changes

- Use WhatsApp number `+91 73388 91367` everywhere.
- Add the supplied Instagram, LinkedIn, Facebook, and X links to the footer.
- Remove the complete Trusted Companies/capability marquee section.
- Redesign Industries We Serve as a responsive icon-card grid with clearer
  spacing, subtle orange accents, and hover/focus feedback.
- Redesign Our Highlights as four premium statistic cards using:
  - `3,000+` Hours of Support
  - `30+` Projects
  - `20+` Happy Clients
  - `15+` SmartMates
- Keep all other site design, layout, routes, and content unchanged.

## Validation

- WhatsApp utility tests assert the new phone number.
- Footer links use the exact supplied URLs.
- The homepage contains no trusted-companies/capability marquee.
- Industries and Highlights remain responsive and keyboard-safe.
- Tests, lint, and production build pass.

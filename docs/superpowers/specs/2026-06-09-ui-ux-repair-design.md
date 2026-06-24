# UI/UX Repair Design

## Goal

Improve the existing website's usability, accessibility, trustworthiness, and
lead-conversion behavior without changing its current visual design.

## Design Boundary

The implementation must preserve the existing:

- Page layouts and section ordering
- Orange-led color palette
- Typography choices
- Card shapes, spacing style, illustrations, and visual effects
- Dark-first theme with optional light mode
- Existing page routes and service offering

The implementation must not introduce a redesign, new visual direction, or
large content rewrite.

## Approved Changes

### Functional Actions

- Replace the homepage's inactive video action with a working navigation action
  to the About page, where visitors can learn about the company.
- Make the contact-page scheduling action open a WhatsApp conversation.
- Convert the contact form into a WhatsApp enquiry flow. Submission validates
  the fields and opens WhatsApp with the visitor's entered details.
- Remove placeholder footer links that currently point to `#`. Keep only social
  links with real destinations.

### Accessibility

- Add visible keyboard focus styles for links, buttons, and form controls.
- Connect form labels and controls with `htmlFor`, `id`, `name`, and useful
  autocomplete attributes.
- Add accurate `aria-expanded`, `aria-controls`, and menu labels to navigation
  controls.
- Make the desktop services dropdown usable with keyboard focus as well as
  pointer hover.
- Prevent the closed mobile menu from exposing its controls to keyboard users.
- Add a global reduced-motion mode that disables decorative animation and
  smooth scrolling when the visitor requests reduced motion.
- Give changing contact-form status meaningful live-region behavior.

### Trust And Content Integrity

- Remove the unsupported client-logo marquee and large numerical claims from
  the homepage.
- Replace those areas using existing visual patterns with honest capability and
  process proof. No unverifiable client names, counts, or performance metrics
  will be introduced.
- Fix visible mojibake and broken encoded characters in user-facing source
  touched by this work.

### Route Recovery

- Add a visually consistent Not Found page.
- Add a catch-all route so invalid URLs provide a clear path back home and to
  contact.

## WhatsApp Enquiry Behavior

The WhatsApp destination is the existing business number:
`+91 94892 27725`.

Submitting the contact form opens a new WhatsApp tab with a pre-filled,
plain-text message containing:

- Full name
- Email address
- Phone number when supplied
- Subject
- Message details

The website must not claim that a message was sent because opening WhatsApp
does not guarantee that the visitor sends it. The interface instead tells the
visitor that WhatsApp has opened and asks them to send the prepared message.

## Implementation Structure

- Put WhatsApp URL/message construction in a small reusable utility.
- Keep navigation behavior inside `Navbar`.
- Keep contact-form state and validation inside `Contact`.
- Add a focused `NotFound` page.
- Use global CSS for shared focus and reduced-motion behavior.
- Preserve existing component and styling patterns where possible.

## Validation

- Add automated tests for WhatsApp message construction.
- Run the project's lint and production build commands.
- Verify keyboard navigation for the primary navigation, services dropdown,
  mobile menu, contact form, theme toggle, and footer.
- Verify that reduced-motion preferences suppress decorative animations.
- Verify an invalid route renders the Not Found page.
- Verify contact form submission creates the expected WhatsApp URL without
  displaying a false sent-success message.

## Out Of Scope

- Rebranding or visual redesign
- New backend or database
- Adding or inventing client testimonials, client logos, or performance metrics
- Replacing all inline styles or broadly refactoring unrelated pages
- Rewriting the site's entire content

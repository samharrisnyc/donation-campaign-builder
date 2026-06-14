# Donation Campaign Builder

Donation Campaign Builder is a focused React and TypeScript tool for nonprofit fundraising teams drafting a campaign appeal. It keeps the workflow intentionally small: write the core appeal, review the donation page preview, and scan a response forecast.

The app is designed for [samharrisnyc.github.io](https://samharrisnyc.github.io/) as a realistic front-end case study with a bold poster-inspired operations-board interface.

The default workspace opens with a realistic Community Kitchen Spring Drive campaign so the tool feels like an active campaign review surface rather than an empty template.

## Features

- Compact campaign intake form for campaign name, headline, intro copy, donation amounts, and CTA text
- Live responsive campaign preview with desktop and mobile modes
- Realistic sample campaign loaded by default
- Typed validation for required campaign content
- Campaign Pulse section with plausible response metrics and a CSS-based A/B comparison chart
- Automatic local draft persistence in the browser
- Inline validation and readiness rules for required content, CTA specificity, and donation amount setup
- Responsive UI with semantic markup, visible focus states, labels, and keyboard-friendly controls
- Vitest and React Testing Library coverage for validation, preview updates, variant switching, and local draft persistence

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- CSS custom properties
- Local Storage API

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm run test
```

## What I Learned

This project focuses on the details that make a front-end tool feel production-minded: shaping clear TypeScript types, keeping form state predictable, validating user-entered content, designing responsive preview states, and saving a draft without a backend.

It also reinforces a practical accessibility workflow. The app does not pretend automated review can replace a full audit, but it nudges the user toward stronger headings, specific CTA copy, keyboard-friendly controls, readable donation options, and a high-contrast fixed visual system without making the interface feel like a demo checklist.

## Accessibility Notes

- Form controls use visible labels and validation messages connected with `aria-describedby`.
- The preview updates in an `aria-live` region so content changes are announced politely.
- Buttons, inputs, and textareas have visible focus states.
- The CTA checker flags short or generic action text.
- The donation amount checker warns when no suggested amounts are available.
- The fixed visual palette uses high-contrast black, ivory, green, and restrained hot pink accents.

## Future Improvements

- Add reviewer assignment and approval history
- Add campaign templates for different nonprofit verticals
- Add a real contrast checker using WCAG formulas
- Add richer donation amount editing with drag-to-reorder controls
- Add lightweight campaign goal and channel fields for internal planning

## Portfolio Case Study Blurb

Donation Campaign Builder is a React and TypeScript tool for nonprofit teams creating donation appeals. I built a focused campaign editor with responsive preview modes, typed validation, automatic local draft persistence, and response forecasting. The project highlights practical front-end architecture, form handling, accessible UI patterns, and a bold poster-inspired interface suited to a real fundraising workflow.

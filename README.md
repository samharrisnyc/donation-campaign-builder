# Donation Campaign Builder

Donation Campaign Builder is a polished React and TypeScript portfolio project for nonprofit fundraising teams. It lets a user draft a donation campaign, preview the donor-facing card in desktop or mobile mode, review content validation and accessibility warnings, save campaign drafts locally, inspect mock performance data, and export a clean HTML snippet.

The app is designed for [samharrisnyc.github.io](https://samharrisnyc.github.io/) as a realistic front-end case study rather than a tutorial-style demo.

## Features

- Campaign builder form for headline, intro copy, donation amounts, CTA text, theme, hero image, urgency copy, and thank-you copy
- Live responsive campaign preview with desktop and mobile toggles
- Typed custom validation for required campaign fields
- Accessibility checker for headline, CTA specificity, image alt text, donation buttons, and theme contrast status
- Mock analytics cards for impressions, clicks, conversion rate, and average donation
- CSS-based A/B comparison chart
- Local storage draft saving, loading, and deletion
- Included sample campaign
- Exportable HTML snippet with copy-to-clipboard support
- Responsive UI with semantic markup, visible focus states, labels, and keyboard-friendly controls
- Vitest and React Testing Library coverage for validation, preview updates, and draft persistence

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

This project focuses on the kinds of details that make a front-end tool feel production-minded: shaping reusable TypeScript types, keeping form state predictable, validating user-entered content, designing responsive preview states, using local storage without a backend, and preparing generated HTML for handoff.

It also reinforces a practical accessibility workflow. The app does not pretend automated checks can replace a full audit, but it nudges the user toward stronger headings, useful CTA copy, image alt text, keyboard-friendly controls, and theme contrast review.

## Accessibility Notes

- Form controls use visible labels and validation messages connected with `aria-describedby`.
- The preview updates in an `aria-live` region so content changes are announced politely.
- Buttons, inputs, and textareas have visible focus states.
- The app warns when an image URL is present without alt text.
- The CTA checker flags short or generic action text.
- The theme checker includes a mock contrast status to demonstrate accessibility review thinking.

## Future Improvements

- Add image upload with client-side compression
- Add richer donation amount editing with drag-to-reorder controls
- Include a real contrast checker using WCAG formulas
- Add campaign templates for different nonprofit verticals
- Export a ZIP with HTML and CSS
- Add import/export for saved drafts as JSON

## Portfolio Case Study Blurb

Donation Campaign Builder is a React and TypeScript tool for nonprofit teams creating donation appeals. I built a live campaign editor with responsive preview modes, typed validation, accessibility warnings, local draft storage, mock analytics, and HTML export. The project highlights practical front-end architecture, form handling, accessible UI patterns, and a clean editorial visual system suited to a real fundraising workflow.

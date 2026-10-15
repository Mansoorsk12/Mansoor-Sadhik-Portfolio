# Project guidance

This is a JavaScript-only React/Vite portfolio. Do not migrate to TypeScript.

## Architecture

- `src/App.jsx`: page composition, section navigation, filters, preference management, hero, project dialogs.
- `src/data/portfolio.js`: editable profile, projects, skill groups, education-related achievements, and internship records.
- `src/components/Scene3D.jsx`: dynamically imported React Three Fiber sculpture.
- `src/components/ProjectVisual.jsx`: code-native project illustrations, not actual product screenshots.
- `src/components/Overlays.jsx`: native-dialog modal, keyboard command palette, and desktop-only cursor.
- `src/components/GitHubActivity.jsx`: public API requests with timeout, abort cleanup, and static verified-link fallback.
- `src/components/ResumeSection.jsx`: public resume configuration and strictly browser-local IndexedDB PDF utility.
- `src/components/ContactForm.jsx` and `public/__forms.html`: synchronized Netlify Forms fields.
- `src/styles.css`: Tailwind v4 import, custom editorial styling, breakpoints, and reduced-motion rules.

## Conventions

Use semantic JSX and keep links real. All external new-tab links require noopener noreferrer. Native dialog provides focus containment; cleanup restores focus and body scrolling. Respect both visual-effects preferences and OS reduced motion. Preserve readable hero content when WebGL is unavailable.

Never invent metrics, experience, certificate URLs, or project functionality. Preserve the explicit resume-backed label on LeetCode. Do not treat GitHub language metadata as evidence of an entire application stack.

## Non-obvious configuration

No verified resume was available. `profile.resume` is intentionally null; replace with `'/resume.pdf'` only after adding an authentic PDF. The original public portfolio PDF was a placeholder and must not be reused.

Netlify Forms is enabled. The email notification to mansoorsk115@gmail.com still requires setup in the Netlify dashboard because the notification API rejected authorization. Never claim confirmed email delivery without an inbox test. Keep form field names synchronized with the static skeleton, and POST to `/__forms.html`, not an SPA route.

The PDF utility is explicitly local to the visitor as requested; do not upload these files or introduce a remote database. Portfolio content is authored static data, not mutable application records. No remote database is needed.

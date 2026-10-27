# Prana — Portfolio

Personal portfolio of **Made Pranajaya Dibyacita** — data science & machine learning engineer.

Live: https://www.mdprana.site (mirror: https://mdprana-portofolio.vercel.app). Every push to `main` deploys automatically on Vercel.

Design source: Figma file `Portofolio` (key `Vfa2sw0KvmhagP7jjrZBJ6`), replicated in code.
Product requirements: [`docs/PRD.md`](docs/PRD.md). UI/UX audit: [`docs/design-audit.md`](docs/design-audit.md).

## Stack

Chosen for performance, security, and being the current de-facto standard for a static-first marketing site.

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Static prerender by default, image/font optimisation built in, largest ecosystem, React Server Components cut client JS |
| Language | TypeScript (strict) | Type errors surface at build time, not for visitors |
| UI | React 19 | Required by Next 16; Server Components render on the server only |
| Styling | Tailwind CSS v4 | Zero-runtime CSS, token-driven via `@theme`, no stylesheet growth per component |
| Motion | Motion (ex-Framer Motion) | Tree-shakable, honours `prefers-reduced-motion` |
| Hosting | Vercel | Static CDN edge, automatic HTTPS, preview deploy per PR |

Deliberately **not** used: database, CMS, auth, analytics SDK, component library. A portfolio is a static site; everything else is bundle weight plus attack surface.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run lint
```

## Structure

```
app/            routes (App Router)
components/     UI, one file per section
lib/            content + helpers
public/         static assets
assets/logos/   source SVGs exported from Figma
docs/           PRD, design audit
```

## Content

All copy lives in `lib/` — no strings hardcoded in components. Facts (awards, metrics, stack) are limited to what is verifiable from the CV and published work.

## Commits

Conventional Commits, one commit per finished section or page, pushed to `main` as soon as it builds:

```
feat(home): build hero, featured projects, capabilities, toolkit, highlights
feat(projects): add index page and case-study template
fix(a11y): …
docs: …
```

Rules:
- The commit message explains *why*, not just what.
- `npm run build` must pass before pushing.
- Author and committer are the repository owner only. No tooling, agent, or
  co-author attribution appears anywhere in the history.
- Audit findings that the change resolves are named in the message body, so the
  reason survives without re-reading `docs/design-audit.md`.


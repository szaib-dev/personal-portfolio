# Personal Portfolio

Static portfolio content is kept in small, focused files:

- `src/content/home.ts` for homepage text.
- `src/content/projects/trend-bible.ts` for the Trend Bible project.
- `src/content/projects/visual-poetry.ts` for the Visual Poetry project.
- `src/content/projects/index.ts` for the project registry.
- `src/types/index.ts` for shared content types.

`src/data/site-content.ts` only re-exports the new content modules for older imports.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Content Rules

- Add a new project as its own file in `src/content/projects`.
- Register it in `src/content/projects/index.ts`.
- Use `next/image` for rendered images.
- Keep repeated types in `src/types/index.ts`.
- Keep repeated UI as components.

## Environment

Copy `.env.example` to `.env.local` and fill the values.

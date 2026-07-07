# ReactMiniBlog_Steps

`ReactMiniBlog_Steps` is a beginner-friendly React mini blog curriculum built with Vite.

This project is a preparation course before `NextJsBlog_Steps`. It focuses on React fundamentals first: JSX, components, props, arrays, routing, state, forms, basic CRUD, search, and browser storage.

## Learning Style

Each `step-N` branch adds one small concept on top of the previous step.

Students can start from `main` and move through the branches in order:

```bash
git switch step-1
git switch step-2
```

The project intentionally avoids backend, database, authentication, TypeScript, Tailwind CSS, and production-level architecture. Those topics belong to later courses.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Documentation

Documentation is split into short overview documents and hands-on lecture documents.
Each `step-N` branch contains the documents available up to that step.

- `docs/overview/index.md`
- `docs/overview/step-N.md`
- `docs/lecture/README.md`
- `docs/lecture/step-N.md`

The lecture folder uses `README.md` as its entry point, so students can open the folder and follow the step list from there.

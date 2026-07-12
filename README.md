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

## Branch Hierarchy

These branches are not independent example copies. They are a parent-child learning chain that starts at `main` and continues as `main -> step-1 -> step-2 -> ... -> step-N`.

Future work must preserve that ancestry. When a change belongs to a specific lesson step, commit it at the earliest affected step first, then merge forward one step at a time. Do not make the same change as unrelated commits on multiple `step-N` branches, because that breaks the curriculum history students and instructors compare against.

The project intentionally avoids backend, database, authentication, TypeScript, Tailwind CSS, and production-level architecture. Those topics belong to later courses.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Documentation

Read the documents in this order:

1. `docs/basic/README.md` and `docs/basic/chapter-N.md`
2. `docs/overview/index.md` and `docs/overview/step-N.md`
3. `docs/lecture/README.md` and `docs/lecture/step-N.md`

The `main` branch contains the complete React basics course. Hands-on overview and lecture documents are added cumulatively to their matching `step-N` branches. After the basics, switch to `step-1` and follow the practice branches in order.

Each documentation folder uses its index or `README.md` as an entry point, so students can open the folder and follow the available chapter or step list from there.

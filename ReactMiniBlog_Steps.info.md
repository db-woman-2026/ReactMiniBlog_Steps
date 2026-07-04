# ReactMiniBlog_Steps Capsule

## Project Purpose

`ReactMiniBlog_Steps` is a beginner-friendly educational React project. It is designed as a prerequisite curriculum before `NextJsBlog_Steps`, especially for non-developers and first-time React learners.

The project teaches React basics through a small local mini blog. It does not teach backend, database, authentication, deployment, or production architecture.

## Tooling Direction

- Use Vite with the React JavaScript template.
- Use React Router only to teach the basic relationship between URL and screen.
- Keep CSS minimal. Do not introduce a CSS framework or a dedicated CSS learning step.
- Use React state first, then `localStorage`, to explain why later projects need APIs and databases.

## Branch Structure

- `main`: initial Vite React starter plus project documentation.
- `step-1` to `step-15`: cumulative beginner React mini blog lessons.

Branches are cumulative. `step-2` is based on `step-1`, `step-3` is based on `step-2`, and so on.

The branch chain should preserve this invariant:

```bash
git merge-base --is-ancestor step-N step-(N+1)
```

## Documentation Layout

- `README.md`: student-facing project introduction.
- `ReactMiniBlog_Steps.info.md`: project maintenance and curriculum capsule.
- `docs/overview/`: short step overview files.

Detailed `docs/lecture/` materials are intentionally deferred.

## Curriculum Scope

Included:

- Vite React file structure
- JSX
- component extraction
- props
- arrays and `map`
- React Router basics
- dynamic route params
- event handling
- `useState`
- controlled inputs
- create, update, delete operations using state
- conditional rendering and validation messages
- search/filtering
- `useEffect`
- `localStorage`
- simple static JSON fetch
- connection map to `NextJsBlog_Steps`

Excluded:

- TypeScript
- CSS frameworks
- React Router advanced loaders/actions
- Context
- Reducer
- backend APIs
- database
- authentication
- deployment
- testing

## Overview Steps

- `step-1`: file structure and first JSX screen
- `step-2`: component extraction
- `step-3`: React Router basics
- `step-4`: props
- `step-5`: arrays and list rendering
- `step-6`: dynamic route detail page
- `step-7`: events and state
- `step-8`: controlled form inputs
- `step-9`: create a post with state
- `step-10`: validation and conditional rendering
- `step-11`: delete a post
- `step-12`: update a post
- `step-13`: search posts
- `step-14`: persist posts with `localStorage`
- `step-15`: load starter data from a static JSON file and compare with Next.js

## Operational Notes

- Keep each step small enough for beginner students to type by hand.
- If an earlier step changes, update that branch first and propagate forward by merging upward through the step chain.
- `docs/overview` should remain short. Detailed copy-paste-friendly lecture material belongs in a future `docs/lecture` pass.

# ReactMiniBlog_Steps

`ReactMiniBlog_Steps` is a beginner-friendly React mini blog curriculum built with Vite.

This project prepares students for `NextJsBlog_Steps`. It focuses on JSX, components, props, arrays, routing, state, forms, browser-side CRUD, search, and browser storage before server and database concepts are introduced.

## Teaching Model

`main` contains the starter project and the complete basic reading course. Students read `docs/basic/` first, then move through the cumulative practice branches in order. Instructors can use each `step-N` branch as the completed reference for that lesson.

```text
main -> step-1 -> step-2 -> ... -> step-15
```

## Learning Path

| Branch | Focus |
| --- | --- |
| `main` | Vite starter and React basic reading course |
| `step-1` | First JSX mini blog screen |
| `step-2` | Header, Footer, and page component separation |
| `step-3` | React Router pages and navigation |
| `step-4` | Reusable post card with props |
| `step-5` | Array and list rendering with `map` |
| `step-6` | Dynamic post detail route |
| `step-7` | Events and local state |
| `step-8` | Controlled new-post form |
| `step-9` | Create a post in state |
| `step-10` | Input validation and conditional errors |
| `step-11` | Delete a post |
| `step-12` | Edit and update a post |
| `step-13` | Client-side keyword search |
| `step-14` | Persist posts in `localStorage` |
| `step-15` | Load starter posts from mock JSON and prepare for Next.js |

## Branch Maintenance

These branches are not independent example copies. They are a parent-child learning chain, and future changes must preserve that ancestry.

When a change belongs to a specific lesson, commit it at the earliest affected branch and merge it forward one branch at a time. Project-wide documentation or maintenance changes start from `main` and are propagated through the full chain. Do not create unrelated copies of the same commit on multiple branches.

```bash
git merge-base --is-ancestor step-N step-(N+1)
```

Students can inspect completed stages with:

```bash
git switch step-1
git switch step-2
```

## Completed App At `step-15`

The final branch is still a frontend-only learning project, but it contains a complete browser-based mini blog flow:

- shared Header and Footer components
- list and detail pages with dynamic routes
- create, update, and delete flows held in React state
- input validation and not-found handling
- client-side keyword search
- starter data loaded from `public/posts.json`
- browser persistence with `localStorage`

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Course home |
| `/about` | Project introduction |
| `/posts` | Searchable post list |
| `/posts/new` | New-post form |
| `/posts/:postId` | Post detail, like, and delete actions |
| `/posts/:postId/edit` | Edit-post form |

### Data Flow

When no saved data exists, the app fetches `/posts.json`. If that request fails, it falls back to `src/data/posts.js`. After loading, every post change is saved under the `react-mini-blog-posts` key in `localStorage`.

This is intentionally a mock frontend data flow. `step-15` uses it to make the transition to the server and database flow in `NextJsBlog_Steps` easier to understand.

## Project Structure At `step-15`

```text
docs/basic/       prerequisite React and JavaScript reading
docs/overview/    short step summaries
docs/lecture/     detailed hands-on lesson documents
public/posts.json mock starter data
src/components/   shared UI components
src/data/         fallback starter data
src/pages/        routed page components
src/App.jsx       routes, post state, persistence, and CRUD handlers
```

## Documentation

Read the available documents in this order:

1. On `main`, read `docs/basic/README.md` and `docs/basic/chapter-N.md`.
2. After switching to a practice branch, read `docs/overview/index.md` and the matching `docs/overview/step-N.md`.
3. Follow `docs/lecture/README.md` and the matching `docs/lecture/step-N.md` for hands-on work.

The `main` branch contains the complete React basics course. Overview and lecture documents are added cumulatively to their matching `step-N` branches. After the basics, switch to `step-1` and follow the practice branches in order.

## Getting Started

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) after starting the development server.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Stack At `step-15`

- React 19
- React Router 7
- Vite 8
- Oxlint

## Scope

The project intentionally avoids backend APIs, databases, authentication, TypeScript, Tailwind CSS, and production architecture. Those topics belong to later courses.

# Todo List (Simple JS)

A small, dependency-light client-side todo app built with plain JavaScript, CSS and HTML. Keeps data in localStorage and uses a tiny Project/Todo model structure in `src/modules`. Part of my personal effort to practice vanilla JS and localStorage.

## Features

- Create projects and todos (title, due date, priority).
- Edit and delete todos.
- Delete projects.
- Persistence using browser `localStorage` (module: `src/modules/Storage.js`).

## Project limits

- The app enforces a maximum of 10 projects. If you attempt to create more than 10, the app will show an alert and prevent creation.

## File layout

- `src/` — application source files (preferred place to edit).
  - `src/index.js` — main app logic and DOM rendering.
  - `src/modules/Project.js` — Project model.
  - `src/modules/Todo.js` — Todo model.
  - `src/modules/Storage.js` — localStorage persistence helpers (save/load/clear).
- `dist/` — built assets (HTML, CSS, bundle). If you use the bundler, rebuild after editing `src/`.

## Getting started

Requirements: Node.js and npm (for building the `dist` bundle with webpack).

1. Install dev dependencies:

```bash
npm install
```

2. Build (produce `dist/main.js`):

```bash
npm run build
```

3. For development with automatic rebuilds:

```bash
npm run watch
```

Note: `dist/main.js` is a build artifact; source edits belong in `src/`.

## Data persistence

All projects and todos are serialized (IDs, titles, due dates, priorities, completion) into a single localStorage key (`todo-list:v1`) by `src/modules/Storage.js`. The app attempts to load saved data on start and falls back to a default "Inbox" project when none is present.


# test reviewer notes

## Architecture

This repository contains a minimal React 19 single-page app under `react/`, built and served with Vite. The entry point is `src/main.jsx`, which mounts `App` in `StrictMode`; the application logic is currently concentrated in `src/App.jsx` and persists its list in browser `localStorage`. Vite, React Compiler support, and ESLint are configured at the project root.

## Conventions

- Use JavaScript/JSX rather than TypeScript: ESLint targets `**/*.{js,jsx}` in `react/eslint.config.js`.
- Components are defined as function components and exported as default, as shown by `App` in `react/src/App.jsx`.
- React hooks are imported directly from `react`; state initialization that reads persisted data uses a lazy initializer (`useState(() => ...)`) in `react/src/App.jsx`.
- Browser persistence uses the `localStorage` key `"myList"` and synchronizes through a `useEffect` dependent on `list`; changes to this contract should be treated as data-format changes.
- Event handlers use `handle...` naming (`handleAdd`, `handleDelete`) and are defined inside the component in `react/src/App.jsx`.
- The root render is wrapped in `<StrictMode>` in `react/src/main.jsx`; retain this unless there is a concrete compatibility reason to remove it.
- Styling is imported from `./App.css` in `react/src/main.jsx`; component markup uses the existing class names such as `div-container`, `btn`, `list-header`, and `data-card`.
- `dist` is intentionally ignored by ESLint, and the project’s supported checks are the package scripts `npm run lint` and `npm run build` (`react/package.json`).

## Intentional non-standard choices

- The React Compiler is enabled through the Babel/Rolldown setup in `react/vite.config.js`, despite the README noting possible development/build performance impact. Do not flag the compiler preset as unnecessary without evidence of a problem.
- The app intentionally stores a simple array of student-name strings in `localStorage` rather than using a backend or global state library (`react/src/App.jsx`).
- List items use the array index as their React key (`react/src/App.jsx`). For this small append/delete-only list, this appears to be a deliberate minimal implementation, though it should be reconsidered if items become reorderable or editable.

## Watch out for

- `JSON.parse(savedList)` in `react/src/App.jsx` can crash startup if `"myList"` contains malformed or non-array JSON; persistence reads should be hardened if storage may be externally modified.
- `setList([...list, ...])` and `setList(list.filter(...))` capture the current render’s state. Prefer functional state updates if multiple updates can be queued or handlers become asynchronous.
- Do not bypass the controlled input/state flow: the input’s `value` and `onChange` are intentionally tied to `name`, and blank/whitespace-only names are rejected by `handleAdd`.
- Preserve the `list` dependency on the persistence effect; removing it can leave `localStorage` stale, while adding unrelated dependencies can cause unnecessary writes.
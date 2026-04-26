# IPI Smart — Mobile

Student mobile app for the IPI Smart Academic System. Built with React Native and Expo.

[![CI](https://github.com/EvillDeadSpace/IPI-Smart-Academic-System-Mobile/actions/workflows/ci.yml/badge.svg)](https://github.com/EvillDeadSpace/IPI-Smart-Academic-System-Mobile/actions/workflows/ci.yml)

## Stack

- **React Native** + **Expo SDK 54**
- **TypeScript** (strict)
- **React Navigation v7** — native stack + bottom tabs
- **Zustand v5** — client state
- **TanStack Query v5** + **Axios** — server state & API
- **ESLint v9** + **Prettier** — code quality
- **Husky** + **commitlint** — git hooks & conventional commits

## Getting started

```bash
npm install
npm start
```

Run on a specific platform:

```bash
npm run android
npm run ios
npm run web
```

## Development

```bash
npm run lint          # ESLint check
npm run lint:fix      # ESLint auto-fix
npm run format        # Prettier
npm run type-check    # TypeScript check
```

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready. Merge via PR only. |
| `develop` | Integration branch. All features merge here first. |
| `feature/*` | New functionality |
| `fix/*` | Bug fixes |
| `chore/*` | Config, tooling, dependencies |

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow and commit conventions.

## Related

- [IPI Smart Academic System](https://github.com/EvillDeadSpace/IPI-Smart-Academic-System) — backend & web

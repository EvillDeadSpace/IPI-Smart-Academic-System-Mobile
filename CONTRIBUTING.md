# Contributing Guide — IPI Smart Mobile

## Branch strategy

```
main
 └── develop
      ├── feature/feature-name
      ├── fix/bug-name
      └── chore/task-name
```

| Branch | Purpose | Direct push |
|---|---|---|
| `main` | Production-ready. Merge from `develop` via PR only. | Never. |
| `develop` | Integration branch. All features land here first. | Never. |
| `feature/*` | New functionality. | Branch author. |
| `fix/*` | Bug fixes. | Branch author. |
| `chore/*` | Config, tooling, dependencies. | Branch author. |

## Workflow

```bash
# 1. Always start from an up-to-date develop
git checkout develop
git pull origin develop

# 2. Create a feature branch
git checkout -b feature/login-screen

# 3. Work, commit
git add src/screens/LoginScreen.tsx
git commit -m "feat(auth): add login screen with email/password fields"

# 4. Push and open a PR targeting develop
git push origin feature/login-screen
```

## Commit format

```
<type>(<scope>): <short description>
```

**Types:** `feat`, `fix`, `refactor`, `chore`, `style`, `docs`, `test`

**Scope** is optional — use the module name: `auth`, `navigation`, `courses`, `grades`, etc.

Examples:
```
feat(auth): implement login with email and password
fix(navigation): resolve deep link crash on Android
chore(deps): update react-navigation to 7.2.3
refactor(api): extract error handling into interceptor
```

## PR rules

- PRs target `develop`, never directly `main`
- PR title follows the conventional commit format
- CI must pass (lint + type-check) before merge
- At least 1 review required to merge into `develop`
- `develop` → `main` is done via PR

## Local setup

```bash
npm install
npm run lint
npm run type-check
npm start
```

# Contributing Guide — IPI Smart Mobile

## Branch strategija

```
main
 └── develop
      ├── feature/naziv-funkcionalnosti
      ├── fix/naziv-buga
      └── chore/naziv-zadatka
```

| Branch | Svrha | Ko može push-ati direktno |
|---|---|---|
| `main` | Production-ready. Merge samo iz `develop` via PR. | Nikad direktno. |
| `develop` | Integracijska grana. Sve features idu ovdje. | Nikad direktno. |
| `feature/*` | Nova funkcionalnost. | Autor grane. |
| `fix/*` | Ispravka buga. | Autor grane. |
| `chore/*` | Config, tooling, dependencije. | Autor grane. |

## Workflow

```bash
# 1. Uvijek kreni od ažurnog developa
git checkout develop
git pull origin develop

# 2. Kreiraj feature granu
git checkout -b feature/login-screen

# 3. Radi, commitaj
git add src/screens/LoginScreen.tsx
git commit -m "feat(auth): add login screen with email/password fields"

# 4. Push i otvori PR prema develop
git push origin feature/login-screen
```

## Commit format

```
<type>(<scope>): <kratki opis>
```

**Tipovi:** `feat`, `fix`, `refactor`, `chore`, `style`, `docs`, `test`

**Scope** je opcionalan, koristi naziv modula: `auth`, `navigation`, `courses`, `grades`, itd.

Primjeri:
```
feat(auth): implement login with email and password
fix(navigation): resolve deep link crash on Android
chore(deps): update react-navigation to 7.2.3
refactor(api): extract error handling into interceptor
```

## PR pravila

- PR se otvara prema `develop`, nikad direktno prema `main`
- Naslov PR-a = naslov commita (conventional format)
- CI mora prolaziti (lint + type-check) prije merge-a
- Minimalno 1 review za merge u `develop`
- `develop` → `main` merge radi se kao PR, squash nije obavezan

## Lokalni setup

```bash
npm install
npm run lint
npm run type-check
npm start
```

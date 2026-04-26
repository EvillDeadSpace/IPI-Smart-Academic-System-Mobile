# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

**IPI Smart** — mobilna aplikacija za studente fakulteta. Korisnici su studenti koji prate raspored, ocjene, obavijesti i ostale akademske informacije. Backend je Node.js/Express API koji već postoji (web verzija radi). Mobilna app se spaja na isti backend.

Auth flow: login s emailom/lozinkom + provjera postoji li user. Nema JWT refresh tokena za početak — samo session provjera.

## Log protokol — OBAVEZNO

Svaki put kada radiš na ovom projektu, **na kraju sesije** (ili pri značajnijem napretku) kreiraj ili update-aj log fajl u `../LOGS/` (putanja: `C:/Users/Amar/Desktop/App/LOGS/`).

Format naziva fajla: `YYYY-MM-DD_kratki-opis.md`
Primjer: `2026-04-26_login-screen.md`

Struktura log fajla:
```markdown
# Session: YYYY-MM-DD — Naziv

## Urađeno
- Konkretne stvari koje su implementirane

## Naučeno / Napomene
- Problemi na koje smo naišli i kako su riješeni
- Odluke koje smo donijeli i zašto

## Sljedeći korak
- [ ] Task 1
- [ ] Task 2
```

Ako sesija nastavlja prethodni rad, pročitaj zadnji log fajl u `../LOGS/` da znaš kontekst.

## Commands

```bash
# Start dev server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web

# Lint & format
npm run lint          # check only
npm run lint:fix      # auto-fix
npm run format        # prettier na src/**
npm run type-check    # tsc --noEmit
```

Commits: **Conventional Commits** format (`feat:`, `fix:`, `chore:`, `refactor:`, itd.) — enforces commitlint. Pre-commit hook pokreće lint-staged (ESLint + Prettier) na staged `.ts`/`.tsx` fajlovima.

## Architecture

**Entry:** `index.ts` → `App.tsx` → `<QueryClientProvider>` → `<RootNavigator>`

**`src/` layout:**

| Folder | Purpose |
|---|---|
| `navigation/` | React Navigation stacks/tabs. `RootNavigator.tsx` je root. Auth split (unauthenticated/authenticated stack) ide ovdje. |
| `screens/` | Jedan fajl po screenu: `<Name>Screen.tsx`. Screen ne sadrži business logiku — delegira na hookove. |
| `components/` | Reusable UI komponente. Bez screen-level statea. Složenije komponente dobijaju vlastiti podfolder sa `index.tsx`. |
| `store/` | Zustand stores. `authStore.ts`: `isAuthenticated`, `userId`, `setAuthenticated()`, `logout()`. |
| `services/` | `api.ts` eksportuje Axios instancu. Ostali servisi (npr. `authService.ts`) importuju tu instancu i eksportuju async funkcije. Nikad direktno `axios.get()` van services foldera. |
| `hooks/` | Custom hookovi. Data-fetching hookovi koriste TanStack Query + `services/`. Naming: `use<Entity><Action>` (npr. `useAuthLogin`). |
| `types/` | Samo TypeScript tipovi/interfejsi. `navigation.ts` drži `RootStackParamList`. Jedan fajl po domeni (npr. `user.ts`, `course.ts`). |
| `constants/` | `config.ts` — `API_BASE_URL` prebacuje dev/prod via `__DEV__`. Ostale konstante idu u tematske fajlove. |
| `utils/` | Pure funkcije bez side effecta. |

**Path aliasi** (konfigurisani u `babel.config.js` i `tsconfig.json`):
```
@components/  @screens/  @navigation/  @services/
@hooks/       @types/    @constants/   @utils/   @store/
```

**State pravilo:** Zustand = client/UI state. TanStack Query = server state (fetch, cache, loading, error). Ne koristiti oboje za iste podatke.

## Key conventions

- Svaki screen prima navigation props tipiziran sa `NativeStackScreenProps<RootStackParamList, 'ScreenName'>`
- API error handling: TanStack Query `onError` + Axios interceptori u `api.ts`, ne try/catch po screenu
- ESLint v9 flat config (`eslint.config.js`). Import order: builtin → external → internal → parent → sibling → index, sa praznom linijom između grupa
- `@FlatCompat` je importan ali nekorišten u `eslint.config.js` — ukloniti pri prvoj prilici
- Expo new architecture je uključen (`newArchEnabled: true`) — izbjegavati packete koji je ne podržavaju

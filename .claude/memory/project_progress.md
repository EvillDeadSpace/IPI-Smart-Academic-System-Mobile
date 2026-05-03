---
name: IPI Smart Mobile - project progress
description: Trenutni napredak projekta, šta je urađeno i gdje nastaviti
type: project
---

Header je završen (avatar, inicijali, bell ikona, SafeAreaView fix, StatusBar).

News API je spojen: `getAllNews` service → `useNewsQuery` hook → `HomeScreen` (testirano, radi).

Backend URL: `https://ipi-smart-academic-system-dzhc.vercel.app/api`

**Gdje nastaviti:**
1. Dodati `Notifications` u `RootStackParamList` (`src/types/navigation.ts`)
2. Registrovati `NotificationsScreen` u `RootNavigator.tsx`
3. Kreirati `NotificationsScreen.tsx` sa `FlatList` vijesti (title, createdAt, tagName)
4. Navigacija iz zvona u `Header` → `NotificationsScreen`
5. Kreirati `NewsCard` komponentu
6. Zustand store za `readIds` (Set<number>) — badge broj na zvonu

**Why:** Korisnik je student koji uči programiranje — mentor pristup, ne davati gotov kod odmah.

**How to apply:** Uvijek pročitati zadnji log u `/home/amartubic/Programing/LOGS/` za detaljan kontekst.

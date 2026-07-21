# Roadmap: QR evidencija prisustva

> Live dokument. Update-aj checkboxove kako napreduješ. Mentorski stil: korak po korak,
> korisnik piše kod, Claude vodi.

## Cilj feature-a

Profesor na webu aktivira sesiju prisustva → web prikazuje QR koji **rotira ~20s** →
student skenira telefonom u roku ~1 min → prisustvo zabilježeno → student vidi
potvrdu + svoj lični pregled (npr. 14/15).

**Zašto QR rotira:** anti-fraud. Statičan QR bi se slikao i poslao drugovima koji
nisu na predavanju. Rotacija čini sliku QR-a beskorisnom nakon ~20s.

## Donesene odluke

- **Scope:** mobilni = SAMO student (skeniranje + potvrda + lični pregled). Profesorski
  QR ostaje na webu.
- **Pattern:** server-rotated random token + kratki TTL + mali grace prozor.
  Mobilni NE validira sam — samo proslijedi skenirani sadržaj backendu.
- **QR sadržaj:** kompaktan string `sessionId:token` (mali QR = brži scan, O(1) lookup).
- **Redoslijed:** BACKEND PRVO, pa onda mobilni.
- **Ko radi:** ti + Claude zajedno, mentorski.
- **Backend stack:** Express + Prisma + Postgres
  (`C:/Users/atubic/Desktop/Udemy/MojProjekat/IPI-Smart-Academic-System/backend`).
- **Mobilni stack:** Expo + React Navigation + TanStack Query + Zustand + axios.

## Otvorena pitanja (zatvoriti prije relevantne faze)

- [ ] **Identitet studenta:** mobilni šalje `email`? (`authStore` ima `userId`, ali
      `examService` koristi email — uskladiti)
- [ ] **Definicija "14/15":** brojnik = sesije gdje je prisutan; nazivnik = ukupno
      održanih sesija za predmet? Potvrditi prije stats endpointa.
- [ ] **TTL + grace:** prijedlog TTL 20s + grace 20s (prihvati i prethodni token).
- [ ] **Ulazna tačka u app:** dugme na Home / tab / FAB?

---

## FAZA 1 — Backend: Prisma modeli

- [ ] Razmisliti o 3 design odluke (relacije / idempotentnost / gdje žive token polja)
- [ ] Napisati `AttendanceSession` model
- [ ] Napisati `AttendanceRecord` model (`@@unique([sessionId, studentId])`)
- [ ] Dodati enum `SessionStatus { ACTIVE CLOSED }`
- [ ] Dodati dvosmjerne relacije na `Subject`, `Professor`, `Student`
- [ ] Pregled sa Claude prije migracije
- [ ] Pokrenuti migraciju (`prisma migrate dev`)

## FAZA 2 — Backend: Service sloj (`attendance.service.ts`)

- [ ] `startSession(subjectId, professorId, lectureId?)` — kreira sesiju + prvi token
- [ ] `rotateToken(sessionId)` — generiše novi token + novi expiry
- [ ] `scanAttendance(sessionId, token, email)` — validacija + upsert record
      - [ ] sesija postoji i ACTIVE
      - [ ] token == current (ili prev u grace prozoru)
      - [ ] now < tokenExpiry + grace
      - [ ] student upisan na predmet (`SubjectEnrollment`)
      - [ ] upsert (idempotentno)
- [ ] `getAttendanceStats(email, subjectId)` — prisustvo / izostanak / total
- [ ] `closeSession(sessionId)`

## FAZA 3 — Backend: Controller + rute

- [ ] `attendance.controller.ts`
- [ ] `attendance.routes.ts`
  - [ ] `POST /attendance/sessions` (profesor: start)
  - [ ] `GET  /attendance/sessions/:id/token` (web poll za rotaciju)
  - [ ] `POST /attendance/sessions/:id/close` (profesor: kraj)
  - [ ] `POST /attendance/scan` (student: skenira)
  - [ ] `GET  /attendance/stats` (student: lični pregled)
- [ ] Zakačiti u `routes/index.ts`
- [ ] Ručno testirati (Postman / k6) prije mobilnog

## FAZA 4 — Mobilni: priprema

- [ ] Instalirati `expo-camera`
- [ ] Camera permission u `app.json` (plugin) + runtime traženje
- [ ] Fallback ekran kad je dozvola odbijena
- [ ] `types/attendance.ts` (QR payload, scan response, stats)

## FAZA 5 — Mobilni: data sloj

- [ ] `services/attendanceService.ts` (`scanAttendance`, `getAttendanceStats`)
- [ ] `hooks/useMarkAttendance.ts` (mutation)
- [ ] `hooks/useAttendanceStats.ts` (query)

## FAZA 6 — Mobilni: UI

- [ ] `ScanAttendanceScreen` (kamera + detekcija QR-a)
- [ ] Ekran/stanje potvrde (zeleni "OK" + podaci + lični pregled)
- [ ] Stanja greške (QR istekao / već skeniran / nisi upisan)
- [ ] Dodati u `RootStackParamList` + `RootNavigator`
- [ ] Ulazna tačka (dugme za skeniranje)

## FAZA 7 — Integracija i test

- [ ] End-to-end test: web aktivira sesiju → telefon skenira → potvrda
- [ ] Provjera anti-fraud (stari QR odbijen nakon isteka)
- [ ] Provjera duplog skeniranja (idempotentnost)
- [ ] Log u `../LOGS/`

---

## Trenutni korak

➡️ **FAZA 1** — Prisma modeli. Čeka se korisnikov odgovor na 3 design pitanja
(relacije / idempotentnost / token polja) pa pisanje modela.

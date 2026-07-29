# Care Access · Participant Journey Demo

Interactive choose-your-own-adventure sales demo for [Care Access](https://www.yourcareaccess.com.au/).

Providers pick a fictional participant and follow a business journey. Sample CA Lite–style API responses appear as evidence panels — **no live NDIA or Care Access endpoints are called**.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Participants

1. **Maya** — existing plan → plans → service bookings → payment POST  
2. **Jordan** — authority/consent failure → fix → payment POST  
3. **Sam** — PACE determine → plans → PACE budget → POST `/payments/pace`  
4. **Aisha** — PACE determine → plans → goals → historical goals  
5. **Riley** — plans → PACE budget → historical budgets → service table → POST `/payments/batch`  
6. **Priya** — plans → quotations GET → quotations PATCH  

## Reports hub

Notification report demos: `SB_REPORT`, `PRICE_GUIDE_REPORT`, `PARTICIPANT_CLAIMS`, `PARTICIPANT_REPORT`, `BULK_CLAIM_REPORT` — readable tables plus sample request payloads.

Journey content: `src/data/participants.ts`.  
API sample payloads: `src/data/mocksBase.ts` + `src/data/mocksExtra.ts`.  
Readable panels: `src/data/readableViews.ts`.  
Reports: `src/data/reports.ts`.

Local copy of the exported docs (gitignored): `docs/ca-lite-raw/`.

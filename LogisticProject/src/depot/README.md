
# Depot Interface — Portal Depozit

Interfață separată pentru lucrătorii de depozit. Nu e accesibilă din navigația clientului.

## Fișiere

| Fișier | Descriere |
|---|---|
| `DepotPortalPage.tsx` | Pagina principală — scanare cod șofer + confirmare încărcare |
| `DepotNavbar.tsx` | Topbar propriu cu badge „Portal Depozit" |

## Rută curentă
`/depot` — configurată în `src/router/AppRouter.tsx`

## Flux business
1. Lucrătorul de depozit accesează `/depot`
2. Scanează codul de bare prezentat de șofer (sau selectează din simulare)
3. Sistemul identifică comanda + marfa de încărcat
4. Lucrătorul confirmă → comanda trece în `transit`

## Integrare în aplicație separată
La separarea completă, înlocuiește:
- `useOrders()` cu `GET /api/orders?barcode=XXX`
- `updateStatus()` cu `PATCH /api/orders/:id` `{ status: 'transit' }`
- `useTheme()` cu ThemeContext-ul propriu al aplicației de depozit

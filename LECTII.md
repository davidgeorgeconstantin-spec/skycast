# Lecții: Proiectul 2, SkyCast (aplicație de vreme)

**5 seri, câte 2–3 ore.** Aici înveți să lucrezi cu **date reale de pe internet** (API-uri), cu mai multe pagini (rutare) și cu **animații profesionale**.

Pornire:

```bash
npm install
npm run dev     # http://localhost:5173
```

> **Nou față de Spendly:** Tailwind CSS (clase direct în JSX), alias-ul `@/` (înseamnă folderul `src/`), structura pe **features** (fiecare funcționalitate are folderul ei).

---

## Lecția 1: fetch, async/await și tipuri pentru JSON

### Concepte
- **API** = o adresă de internet care îți dă date (de obicei JSON). Open-Meteo e gratuit și nu cere cheie.
- **`fetch(url)`** trimite cererea. Răspunsul vine **mai târziu**, de aceea folosim `async` / `await`.
- **`res.ok`**: dacă serverul răspunde cu eroare (404, 500), `fetch` **nu** aruncă singur eroare. Verificăm noi.
- **Tipuri pentru răspuns:** descriem cu `interface` doar câmpurile pe care le folosim (`GeoResponse`, `ForecastResponse`).
- **Transformarea datelor:** API-ul trimite liste paralele (`time[]`, `temperature_2m[]`). Noi le transformăm în obiecte ușor de folosit (`DailyForecast[]`). Componentele nu știu cum arată API-ul.
- **`AbortSignal`**: anulează o cerere veche când utilizatorul tastează mai departe.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Funcția generică `getJson<T>` | `src/lib/api.ts` (sus) |
| Căutarea orașelor | `src/lib/api.ts` → `searchCities` |
| Prognoza + transformarea datelor | `src/lib/api.ts` → `getForecast` |
| Tipurile noastre „curate” | `src/types/weather.ts` |
| Codurile WMO → text + tip vreme | `src/lib/weatherCodes.ts` |

### Încearcă
Deschide în browser: `https://geocoding-api.open-meteo.com/v1/search?name=Iasi&count=3` și compară JSON-ul cu `GeoResponse`.

### Exercițiu 1
Adaugă în cardul „Now” **viteza maximă a rafalelor de vânt** (`wind_gusts_10m`).
**Indicii:** adaugă câmpul în lista `current` din parametri, în `ForecastResponse`, în `CurrentWeather` (`types/weather.ts`) și în maparea din `getForecast`. Apoi afișează-l în `stats` din `CurrentWeatherCard.tsx`. TypeScript îți arată ce ai uitat.

---

## Lecția 2: TanStack Query și debounce

### Concepte
- **TanStack Query** se ocupă de: încărcare, erori, cache, reîncercări. Tu scrii doar funcția care aduce datele.
  ```ts
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['forecast', lat, lon, units], queryFn: ... });
  ```
- **`queryKey`** = „numele” datelor în cache. Dacă se schimbă (alt oraș, altă unitate), se cer date noi.
- **`staleTime`**: cât timp datele sunt considerate proaspete (aici 10 minute).
- **`enabled`**: cererea pornește doar când condiția e adevărată (de ex. minim 2 litere).
- **Debounce**: așteptăm 350 ms după ultima tastă înainte să căutăm. Mai puține cereri, aplicație mai rapidă.
- **Cleanup în `useEffect`**: funcția returnată anulează timer-ul vechi.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Configurarea `QueryClient` | `src/main.tsx` |
| Hook pentru căutare | `src/hooks/useCitySearch.ts` |
| Hook pentru prognoză | `src/hooks/useForecast.ts` |
| Debounce cu cleanup | `src/hooks/useDebounce.ts` |
| Stările loading / error / data | `src/pages/CityPage.tsx` |

### Exercițiu 2
Afișează sub titlul orașului textul **„Updated 2 min ago”** (de când au fost aduse datele).
**Indicii:** `useQuery` întoarce și `dataUpdatedAt` (un număr, milisecunde). Calculează minutele cu `Date.now()`. Bonus: actualizează textul la fiecare 30 de secunde cu un `setInterval` într-un `useEffect` (nu uita cleanup-ul!).

---

## Lecția 3: React Router și Context

### Concepte
- **Rutare** = mai multe „pagini” fără reîncărcare. Folosim `HashRouter` (`#/city/...`), care merge pe GitHub Pages fără setări de server.
- **Parametri în URL:** `/city/:lat/:lon` → `useParams()`. Restul datelor (nume, țară) stau în query string → `useSearchParams()`. Așa linkul poate fi trimis cuiva.
- **`<Link to="...">`** în loc de `<a href>`, ca să nu se reîncarce pagina.
- **Context:** setările (°C/°F, favorite) sunt necesare în multe componente. În loc să le trimitem prin props pe 4 niveluri, le punem într-un **Context** și le citim cu `useSettings()`.
- **Hook care aruncă eroare** dacă e folosit în afara providerului: prinde greșelile devreme.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Rutele | `src/App.tsx` |
| `HashRouter` | `src/main.tsx` |
| Construirea URL-ului unui oraș | `src/lib/routes.ts` |
| Citirea parametrilor | `src/pages/CityPage.tsx` |
| Contextul pentru setări | `src/features/settings/SettingsContext.tsx` |

### Exercițiu 3
Adaugă o pagină **„/about”** cu un scurt text despre aplicație și un link „About” în header.
**Indicii:** creează `src/pages/AboutPage.tsx` (copiază structura de la `NotFoundPage`), adaug-o în `<Routes>` și pune un `<Link to="/about">` în `Header.tsx`.

---

## Lecția 4: animații cu Motion (I) – tranziții și liste

### Concepte
- **`motion.div`** e un `div` care se poate anima: `initial` (cum începe), `animate` (unde ajunge), `exit` (cum dispare).
- **Variants**: animații cu nume, definite o dată (`src/lib/motion.ts`) și refolosite.
- **Stagger**: copiii apar unul după altul (`staggerChildren`).
- **`AnimatePresence`**: permite animația de **ieșire** înainte ca un element să dispară din DOM. Cu `mode="wait"`, pagina veche iese complet înainte să intre cea nouă.
- **`key={location.pathname}`** pe `<Routes>`: React vede o pagină „nouă” la fiecare rută, deci pornește animația.
- **Accesibilitate:** `<MotionConfig reducedMotion="user">` oprește mișcările mari dacă utilizatorul a cerut asta din sistemul de operare.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Variante comune | `src/lib/motion.ts` |
| Tranziția de pagină | `src/components/layout/PageTransition.tsx` + `src/App.tsx` |
| Titlul animat cuvânt cu cuvânt | `src/pages/HomePage.tsx` |
| Lista pe 7 zile, cu stagger și bare animate | `src/features/weather/ForecastList.tsx` |

### Exercițiu 4
Fă ca fiecare rând din prognoza pe 7 zile să se mărească puțin și să devină mai luminos **la hover**.
**Indicii:** pe `motion.li` adaugă `whileHover={{ ... }}` cu `scale` și `backgroundColor`. Atenție la `scale` mare: strică alinierea. 1.02 e suficient.

---

## Lecția 5: animații cu Motion (II) – layout, SVG, valori animate

### Concepte
- **`layoutId`**: două elemente cu același `layoutId` „zboară” unul în locul celuilalt. Așa alunecă pastila albă de la °C/°F și evidențierea din căutare.
- **`layout`**: când se schimbă lista (ștergi un favorit), celelalte carduri se mută lin în noua poziție.
- **SVG animat:** `pathLength` de la 0 la 1 „desenează” linia graficului.
- **`useMotionValue` + `animate`**: numărul temperaturii crește de la 0 la valoarea reală, fără să redeseneze componenta la fiecare cadru.
- **Portal (`createPortal`)**: fundalul e pus direct în `<body>`, pentru că un părinte cu `transform` ar strica `position: fixed`.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Pastila °C/°F (`layoutId`) | `src/components/layout/Header.tsx` |
| Lista de favorite (`layout`, `popLayout`) | `src/features/favorites/FavoritesGrid.tsx`, `FavoriteCard.tsx` |
| Graficul SVG | `src/features/weather/HourlyChart.tsx` |
| Iconițe animate | `src/features/weather/WeatherIcon.tsx` |
| Numărul care crește | `src/components/ui/AnimatedNumber.tsx` |
| Fundalul cu portal | `src/components/layout/WeatherBackground.tsx` |

### Exercițiu 5
Adaugă în graficul pe 24 de ore **puncte mici** (cercuri) la fiecare 3 ore, care apar pe rând, după ce linia s-a desenat.
**Indicii:** în `HourlyChart.tsx`, în același `map` care desenează orele, pentru `i % 3 === 0` adaugă un `<motion.circle>` cu `initial={{ scale: 0 }}` și `animate={{ scale: 1 }}`, cu `transition={{ delay: 1.2 + i * 0.03 }}`.

---

## Verifică-te
1. De ce verificăm `res.ok` după `fetch`?
2. Ce e `queryKey` și ce se întâmplă când se schimbă?
3. Ce problemă rezolvă debounce-ul?
4. De ce `HashRouter` pe GitHub Pages?
5. Când folosești Context în loc de props?
6. Ce face `AnimatePresence`?
7. Ce diferență e între `layout` și `layoutId`?

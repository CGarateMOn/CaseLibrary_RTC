# RTC Case Library

Portal estático (sin build ni framework) que organiza y presenta el material de casos de consultoría del equipo de RTC (Road to Consulting), cuyos archivos reales viven en una carpeta de Google Drive. Este sitio no aloja casos: solo enlaza y prioriza lo que ya existe.

## Cómo previsualizar

Abre `index.html` directamente en el navegador, o sirve la carpeta con un servidor simple para simular GitHub Pages:

```bash
python3 -m http.server
```

y visita `http://localhost:8000`.

## Cómo editar el contenido

Todo el contenido curado vive en `js/data/`, un archivo por sección:

- `js/data/case-of-week.js` — caso de la semana (`caseName`, `casebookTitle`, `selectedBy`, `url`, `weekOf`). Se muestra en la barra de notificación superior, no como sección. `CASE_OF_WEEK_STATIC` puede ser `null` (todavía no hay pick activo) — la barra se oculta sola en ese caso.
- `js/data/casebooks.js` — casebooks favoritos. `tier` (1 o 2) y `notForBeginners` (true/false) son campos **independientes**: tier 1 son nuestros 3 favoritos para todo el mundo (con `rank` 1/2/3 para la jerarquía visual); tier 2 son otros títulos que nos gustan, sin orden entre ellos, y cualquiera de los dos tiers puede tener `notForBeginners: true`. `university` puede ser `null` (casebook independiente, no ligado a ninguna escuela).
- `js/data/university-colors.js` — **el único de estos archivos que NO se regenera automáticamente** (ver "Integración de datos" abajo). Matriz `UNIVERSITY_COLORS` con el color de borde de cada universidad; si el nombre de un casebook no está en esta matriz, cae a un color neutro.
- `js/data/mbb-links.js` — links oficiales de McKinsey/BCG/Bain (`firm` es el nombre completo a mostrar, `firmSlug` — que puede ser `null` si la firma no coincide con ninguna de las 3 — es la clave usada para agrupar y para el color de marca de cada firma en CSS).
- `js/data/individual-cases.js` — casos individuales favoritos.
- `js/data/universities.js` — universidades listadas en `library.html` (dato distinto de `university-colors.js`, ver nota al final de "Integración de datos").

Cada archivo de datos exporta un array/objeto de contenido y una función `getX()` que lo devuelve envuelto en una Promise. `case-of-week.js`, `casebooks.js`, `individual-cases.js` y `mbb-links.js` son **generados automáticamente** por `.github/workflows/sync-data.yml` (ver siguiente sección) — no los edites a mano, tus cambios se sobrescribirán en la próxima sincronización. Hoy siguen con contenido de ejemplo (marcado `PLACEHOLDER` / `SAMPLE DATA`) hasta que el Google Sheet esté conectado.

## Integración de datos (Google Sheets → Apps Script → GitHub Actions)

El workflow (`.github/workflows/sync-data.yml`) y el script que genera los ficheros de datos (`scripts/sync-data.mjs`) ya están construidos y probados. Lo único que falta para que empiecen a correr de verdad es el secreto `RTC_SHEET_ENDPOINT` (ver "Pendiente" al final) — hasta entonces, `js/data/*.js` sigue con contenido de ejemplo.

**Un único Google Sheets, con cuatro pestañas** (Casebooks, Individual Cases, MBB Cases, Case of the Week), un único Apps Script vinculado, y una única URL de Web App (`doGet`) que devuelve las cuatro secciones de golpe en un solo JSON. Nada de "4 hojas / 4 endpoints" — esa idea inicial quedó descartada.

### El endpoint

```
GET <RTC_SHEET_ENDPOINT>   (Apps Script Web App — /exec)
```

La URL real vive únicamente en el secreto de repo `RTC_SHEET_ENDPOINT` (Settings → Secrets and variables → Actions) — no está en este README ni en el workflow, a propósito, aunque el acceso al endpoint en sí no requiere autenticación. Sin autenticación, devuelve `application/json`, redirige (302) de `script.google.com` a `script.googleusercontent.com` — `fetch`/Node lo sigue solo, con `curl` hace falta `-L`. Parámetros opcionales `?section=casebooks|individual|mbb|cotw` y `?pretty=1`; el sync siempre llama **sin parámetros**, para traer las cuatro secciones juntas.

### Forma de la respuesta

```json
{
  "generatedAt": "2026-08-22T10:00:00.000Z",
  "sections": {
    "casebooks": { "count": 2, "items": [ /* ver modelo de datos abajo */ ] },
    "individual": { "count": 1, "items": [ /* ... */ ] },
    "mbb": { "count": 1, "items": [ /* ... */ ] },
    "cotw": { "count": 6, "current": null, "upcoming": [ /* ... */ ], "history": [] }
  },
  "warnings": ["[mbb] Fila 4: Firm \"Deloitte\" no es una de las 3 opciones del desplegable."]
}
```

Detalles del contrato:
- `authors` siempre es un **array** (vacío si no hay), nunca una cadena.
- `university` puede ser `null` (casebook independiente, no ligado a ninguna escuela) — `UNIVERSITY_COLORS` lo tolera y cae a un color neutro.
- `firmSlug` vale `mckinsey`/`bcg`/`bain`, o `null` si la firma de la hoja no coincide con ninguna (esa fila simplemente no se agrupa/muestra; el aviso queda en `warnings`).
- `rank` es `1|2|3` en Tier 1 y `null` en Tier 2. `notForBeginners` es booleano, independiente del tier.
- `weekOf` es `yyyy-MM-dd` en horario de Madrid.
- Los `id` son estables para siempre — son la clave de "Mark as done" en `localStorage`. Nunca se recalculan ni se transforman aguas abajo.
- `casebooks` viene ordenado por tier y rank; `mbb` por firma (McKinsey → BCG → Bain) y título — el sync respeta ese orden tal cual.
- `cotw.current` puede ser legítimamente `null` (aún no ha empezado ningún pick, o estamos entre semanas) — no es un error; la UI oculta la barra de notificación en ese caso (ver `renderCaseOfWeek` en `js/render-home.js`). Cuando hay pick activo, es la fila con `weekOf` más reciente que ya haya pasado.
- Si algo va muy mal, la respuesta es `{ "error": "...", "generatedAt": "..." }` sin `sections`.

### `scripts/sync-data.mjs` y el workflow

`.github/workflows/sync-data.yml` corre cada hora (`cron`) y también a mano (`workflow_dispatch`), y ejecuta `node scripts/sync-data.mjs`, que:

1. Lee el endpoint desde el secreto de repo `RTC_SHEET_ENDPOINT` (nunca hardcodeado).
2. Hace `fetch` con reintentos (3 intentos, 20 s de timeout, 5 s entre intentos) — Node sigue el 302 solo.
3. **Aborta sin escribir nada** si: la respuesta no es JSON válido, trae `error`, falta `sections`, alguna de las 4 secciones es `null`, o `casebooks`/`individual`/`mbb` (no `cotw`, que puede estar legítimamente vacía) vienen con `count: 0`. Mejor servir datos viejos que publicar una web vacía — el job termina con código de salida distinto de cero, así que la Action queda en rojo y se nota.
4. Si todo es válido, **regenera directamente** `js/data/case-of-week.js`, `js/data/casebooks.js`, `js/data/individual-cases.js` y `js/data/mbb-links.js` — mismo formato de export y mismos nombres de función que ya consumía el resto del sitio (`const CASEBOOKS = [...]; function getCasebooks() { return Promise.resolve(CASEBOOKS); }`, etc.), solo que con los datos reales en vez de los de ejemplo.
5. Imprime los `warnings` de la hoja en el log del job.

El workflow hace `git add` de esos 4 ficheros y solo commitea si el contenido cambió de verdad (por eso `generatedAt` nunca se escribe dentro de los ficheros — si lo hiciera, habría un commit cada hora aunque no hubiera cambios reales).

**Heartbeat contra el auto-apagado de GitHub**: GitHub desactiva solo los workflows programados (`schedule`) si el repo pasa 60 días sin ninguna actividad de git. Como este workflow, a propósito, solo commitea cuando la hoja cambia de verdad, si el Sheet estuviera 30+ días sin cambios reales, el propio job fuerza un commit mínimo (un timestamp en `.github/.sync-heartbeat`) para mantener el repo "vivo" muy por debajo del límite de 60 días — sin ensuciar el historial de `js/data/*.js` con commits vacíos. Si alguna vez ves el badge de "This scheduled workflow has been disabled" en la pestaña Actions, se reactiva a mano ahí mismo.

**No hay fetch desde el navegador en ningún momento.** El sitio sigue siendo 100% estático: los datos se congelan en cada sync y se sirven desde GitHub Pages como cualquier otro archivo del repo — no hay sondeo ni actualización en vivo en el cliente.

### Colores de universidad — matriz en código, nunca tocada por el sync

El color de cada universidad no viaja en el JSON del endpoint — vive en `js/data/university-colors.js`, el único archivo de `js/data/` que el workflow **no** regenera nunca:

```js
const UNIVERSITY_COLORS = {
  "Harvard Business School": "#A51C30",
  "Columbia University": "#75AADB",
  "London School of Economics": "#6C2C91",
  "Stanford Graduate School of Business": "#8C1515",
  "Wharton (University of Pennsylvania)": "#011F5B"
};
```

Para añadir una universidad nueva: una línea en esta matriz (con su commit) + usar ese mismo nombre exacto en la columna `University` de la pestaña Casebooks. Si el nombre no coincide con ninguna clave (o es `null`), la tarjeta cae a un borde neutro — no rompe nada. Los colores de McKinsey/BCG/Bain siguen igual, fijos en `css/layout.css` (son solo 3, a diferencia de las universidades, que el equipo sigue ampliando).

`js/data/universities.js` (el directorio de `library.html`, con las carpetas de Google Drive por universidad) es un dato distinto de esta matriz de colores — sigue estático, no forma parte de este sync.

## Estructura de la home

De arriba a abajo: banner → barra de notificación "Case of the Week" (ancho completo, compacta) → panel "Favorite Casebooks" (tier 1 con medallero 1º/2º/3º + tier 2 sin orden) → "Favorite Individual Cases" (matriz responsive, sin scroll horizontal) → "MBB Cases" (agrupado por firma, con color de marca por firma) → CTA final a la biblioteca completa.

**Marcar como hecho**: botón "Mark as done" (`.viewed-toggle`) en cada tarjeta, con una pequeña animación de pulso al marcar. El estado se guarda en `localStorage` (`js/viewed-tracker.js`, clave `rtc_viewed_items_v1`). En "Favorite Individual Cases", marcar una tarjeta como hecha la reordena al final de la matriz (ver `renderIndividualCases` en `js/render-home.js`). Cada sección (y cada firma dentro de MBB) muestra un contador de progreso en píldora ("3/6 done" + barra de relleno) calculado en el momento del render y actualizado en cada toggle.

Ideas aparcadas para más adelante (logos de universidad, versión móvil específica de la matriz de casos individuales, colores de marca reales de McKinsey/BCG/Bain) están documentadas en `NOTES.md`.

## Marca visual

Todos los colores, tipografías y el logo están centralizados en `css/brand.css` (ya con la guía de marca real de RTC aplicada: paleta `--paper/--card/--ink/--indigo/--amber/--muted/--line`, tipografías Bricolage Grotesque / Inter Tight / JetBrains Mono, radio `--r`). Ningún otro CSS define colores o tipografías fuera de ahí.

Las tipografías se cargan vía Google Fonts (`<link>` en el `<head>` de `index.html` y `library.html`) — si se añade una página nueva, hay que copiar ese mismo bloque de `<link>` (dos `preconnect` + el `stylesheet`).

El logo (`assets/logo-placeholder.svg`) se usa solo como favicon. En el header, la marca sigue el mismo patrón que RTC Ofertas: `<b>Road to Consulting</b>` (nombre completo de la marca, en grande) + `<span>` mono con el nombre de esta propiedad concreta ("Case Library", igual que Ofertas usa "Ofertas"). El footer es una copia literal del de Ofertas (`© Road To Consulting, a Talentum brand. All rights reserved. Madrid, Comunidad de Madrid. España`) — si cambia allí, debe cambiar aquí igual. Header y footer son bandas sólidas en `--indigo` con texto blanco, igual que en Ofertas.

El sistema base (reset, `.wrap` como contenedor con único breakpoint a 1024px, `:focus-visible` en ámbar, sombras `--shadow-panel`/`--shadow-card-hover`) está copiado 1:1 de `css` de RTC Ofertas para que ambas propiedades se sientan como la misma marca. Si se toca cualquiera de esos valores aquí, conviene replicarlo allí (o viceversa) para no desincronizar los dos sitios.

## Convención de scripts

Los `<script>` se cargan como scripts clásicos (sin `type="module"`, sin `import`/`export`). Esto es intencional: así el sitio funciona abriendo los HTML directo con `file://`, no solo por servidor. Los archivos de datos definen `const` globales (p. ej. `CASEBOOKS`) consumidos por los módulos de render.

## Pendiente (fuera de alcance de este build)

- Activar la sincronización: añadir el secreto `RTC_SHEET_ENDPOINT` en Settings → Secrets and variables → Actions del repo, con la URL del Apps Script (ver "Integración de datos" arriba). El workflow y el script ya están listos, `.github/workflows/sync-data.yml` solo necesita ese secreto para empezar a correr de verdad.
- Fetch en vivo del contenido de Google Drive vía Google Drive API.
- Logo real de RTC (hoy sigue siendo un placeholder de forma, ya con los colores de marca).

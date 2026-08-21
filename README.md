# RTC Case Library

Portal estático (sin build ni framework) que organiza y presenta el material de casos de consultoría del equipo de RTC (Road to Consulting), cuyos archivos reales viven en una carpeta de OneDrive. Este sitio no aloja casos: solo enlaza y prioriza lo que ya existe.

## Cómo previsualizar

Abre `index.html` directamente en el navegador, o sirve la carpeta con un servidor simple para simular GitHub Pages:

```bash
python3 -m http.server
```

y visita `http://localhost:8000`.

## Cómo editar el contenido

Todo el contenido curado vive en `js/data/`, un archivo por sección:

- `js/data/case-of-week.js` — caso de la semana (`caseName`, `casebookTitle`, `selectedBy`, `url`, `weekOf`). Se muestra en la barra de notificación superior, no como sección.
- `js/data/casebooks.js` — casebooks favoritos. `tier` (1 o 2) y `notForBeginners` (true/false) son campos **independientes**: tier 1 son nuestros 3 favoritos para todo el mundo (con `rank` 1/2/3 para la jerarquía visual); tier 2 son otros títulos que nos gustan, sin orden entre ellos, y cualquiera de los dos tiers puede tener `notForBeginners: true`.
- `js/data/mbb-links.js` — links oficiales de McKinsey/BCG/Bain (campo `firm`, usado para agrupar y para el color de marca de cada firma).
- `js/data/individual-cases.js` — casos individuales favoritos.
- `js/data/universities.js` — universidades listadas en `library.html`.

Cada archivo exporta un array de objetos (documentado con comentarios en el propio archivo) y una función `getX()` que hoy devuelve ese array envuelto en una Promise. Ese patrón async es intencional: cuando conectemos el caso de la semana a un Google Sheet, o las universidades a OneDrive vía API, solo hay que cambiar el cuerpo de la función `getX()` correspondiente — el resto del sitio no cambia.

Todos los datos actuales son de ejemplo (marcados con `PLACEHOLDER` / `SAMPLE DATA`) y deben reemplazarse por contenido real antes de publicar.

## Estructura de la home

De arriba a abajo: banner → barra de notificación "Case of the Week" (ancho completo, compacta) → panel "Favorite Casebooks" (tier 1 con medallero 1º/2º/3º + tier 2 sin orden) → "Favorite Individual Cases" (matriz responsive, sin scroll horizontal) → "MBB Cases" (agrupado por firma, con color de marca por firma) → CTA final a la biblioteca completa.

**Marcar como hecho**: en vez del botón de antes, ahora es una estrella (`.fav`, mismo patrón que el favorito de RTC Ofertas) en cada tarjeta. El estado se guarda en `localStorage` (`js/viewed-tracker.js`, misma clave `rtc_viewed_items_v1` de siempre). En "Favorite Individual Cases", marcar una tarjeta como hecha la reordena al final de la matriz (ver `renderIndividualCases` en `js/render-home.js`). Cada sección (y cada firma dentro de MBB) muestra un contador de progreso ("3/6 done") calculado en el momento del render y actualizado en cada toggle.

Ideas aparcadas para más adelante (logos de universidad, versión móvil específica de la matriz de casos individuales, colores de marca reales de McKinsey/BCG/Bain) están documentadas en `NOTES.md`.

## Marca visual

Todos los colores, tipografías y el logo están centralizados en `css/brand.css` (ya con la guía de marca real de RTC aplicada: paleta `--paper/--card/--ink/--indigo/--amber/--muted/--line`, tipografías Bricolage Grotesque / Inter Tight / JetBrains Mono, radio `--r`). Ningún otro CSS define colores o tipografías fuera de ahí.

Las tipografías se cargan vía Google Fonts (`<link>` en el `<head>` de `index.html` y `library.html`) — si se añade una página nueva, hay que copiar ese mismo bloque de `<link>` (dos `preconnect` + el `stylesheet`).

El logo (`assets/logo-placeholder.svg`) se usa solo como favicon. En el header, la marca sigue el mismo patrón que RTC Ofertas: `<b>Road to Consulting</b>` (nombre completo de la marca, en grande) + `<span>` mono con el nombre de esta propiedad concreta ("Case Library", igual que Ofertas usa "Ofertas"). El footer es una copia literal del de Ofertas (`© Road To Consulting, a Talentum brand. All rights reserved. Madrid, Comunidad de Madrid. España`) — si cambia allí, debe cambiar aquí igual. Header y footer son bandas sólidas en `--indigo` con texto blanco, igual que en Ofertas.

El sistema base (reset, `.wrap` como contenedor con único breakpoint a 1024px, `:focus-visible` en ámbar, sombras `--shadow-panel`/`--shadow-card-hover`) está copiado 1:1 de `css` de RTC Ofertas para que ambas propiedades se sientan como la misma marca. Si se toca cualquiera de esos valores aquí, conviene replicarlo allí (o viceversa) para no desincronizar los dos sitios.

## Convención de scripts

Los `<script>` se cargan como scripts clásicos (sin `type="module"`, sin `import`/`export`). Esto es intencional: así el sitio funciona abriendo los HTML directo con `file://`, no solo por servidor. Los archivos de datos definen `const` globales (p. ej. `CASEBOOKS`) consumidos por los módulos de render.

## Pendiente (fuera de alcance de este build)

- Fetch en vivo del caso de la semana desde Google Sheets/Apps Script.
- Fetch en vivo del contenido de OneDrive vía Microsoft Graph API.
- Logo real de RTC (hoy sigue siendo un placeholder de forma, ya con los colores de marca).

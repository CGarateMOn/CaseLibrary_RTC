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

- `js/data/case-of-week.js` — caso de la semana.
- `js/data/casebooks.js` — casebooks favoritos (campo `tier`: 1 o 2; `rank` solo aplica a tier 1).
- `js/data/mbb-links.js` — links oficiales de McKinsey/BCG/Bain.
- `js/data/individual-cases.js` — casos individuales favoritos.
- `js/data/universities.js` — universidades listadas en `library.html`.

Cada archivo exporta un array de objetos (documentado con comentarios en el propio archivo) y una función `getX()` que hoy devuelve ese array envuelto en una Promise. Ese patrón async es intencional: cuando conectemos el caso de la semana a un Google Sheet, o las universidades a OneDrive vía API, solo hay que cambiar el cuerpo de la función `getX()` correspondiente — el resto del sitio no cambia.

Todos los datos actuales son de ejemplo (marcados con `PLACEHOLDER` / `SAMPLE DATA`) y deben reemplazarse por contenido real antes de publicar.

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

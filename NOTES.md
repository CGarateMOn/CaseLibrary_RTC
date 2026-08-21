# Notas y backlog de diseño

Ideas que han salido durante el desarrollo pero que no se implementan todavía — quedan aquí para no perderlas.

## Logos de universidad en los casebooks

Para universidades reconocibles (Harvard, Columbia, Stanford, Wharton, LSE...), sustituir el texto plano de "University" por el logo/escudo de la universidad junto al nombre, en las tarjetas de `Favorite Casebooks`. Pendiente de:
- Conseguir los logos (formato SVG, mismo tamaño/proporción).
- Decidir si se muestra siempre o solo cuando tenemos el logo real (fallback a texto si no hay logo para esa universidad).

## Versión móvil de "Favorite Individual Cases"

En escritorio, la sección usa una matriz (grid responsive con tantas columnas como quepan) con scroll vertical de la página, y las tarjetas marcadas como "done" se reordenan al final de la matriz. En móvil, hoy esto colapsa a una sola columna vertical (fallback razonable del mismo grid), pero queda pendiente diseñar una interacción específica para móvil si el grid de una columna no es suficiente (por ejemplo: swipe para marcar como hecho, colapsar completados, etc.). A discutir.

## Colores de marca de McKinsey / BCG / Bain

Los colores usados hoy para diferenciar cada firma en `MBB Cases` (`--firm-color` en `css/layout.css`, dentro de `.mbb-firm-group[data-firm="..."]`) son una aproximación razonable (azul marino, verde, rojo) basada en la percepción pública de cada marca — no son los valores de marca oficiales de McKinsey/BCG/Bain. Si en algún momento tenemos acceso a sus guías de marca reales, actualizar esos tres valores.

## Colores de universidad en los casebooks

El borde izquierdo de cada tarjeta de `Favorite Casebooks` (tier 1 y tier 2) usa el campo `universityColor` en `js/data/casebooks.js` — igual que con MBB, son aproximaciones basadas en la percepción pública de cada universidad (Harvard granate, Stanford cardinal, Columbia azul claro, Wharton/Penn azul marino, LSE morado), no valores de marca oficiales verificados. Actualizar si conseguimos las guías de marca reales.

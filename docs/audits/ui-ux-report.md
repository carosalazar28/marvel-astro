# Informe de auditoría UI/UX — #32

**Fuente:** UI/UX Pixel-Perfect Auditor

**Versión inspeccionada:** `main` en `a0c8cf3`

**Issue de origen:** [#32](https://github.com/carosalazar28/marvel-astro/issues/32)

**Fecha:** 2026-09-09

**Criterios aplicados:** [AUDIT_GUIDELINES.md](./AUDIT_GUIDELINES.md)

## Referencia y cobertura

La referencia [Countdown Movie Tracker en Figma Make](https://www.figma.com/make/zkxWr8MK9rPNOJvFRtYdsN/Countdown-Movie-Tracker?t=XKi3FFRFKYjhFRzq-0) fue accesible tanto en su contenedor Figma como mediante su preview publicado. El preview fue comparado con `http://127.0.0.1:4321/` en el mismo commit.

| Área | Viewport inspeccionado | Evidencia comparada | Resultado |
| --- | --- | --- | --- |
| Móvil | 390 × 844 px | Preview de Figma y aplicación local | Comparación completa de hero, pestañas, resumen, tarjetas y calendario. |
| Escritorio | 1440 × 900 px para la aplicación; preview de Figma en formato de escritorio | Preview de Figma y aplicación local | Comparación completa de jerarquía superior, ruta y columna de calendario. |
| Estados y foco | Móvil | Pestañas y controles visibles | La pestaña de calendario cambia de vista y conserva un control de 44 px; no es un hallazgo. |

La aplicación local devolvió previamente `ERR_CONNECTION_REFUSED` en `localhost`; la instancia indicada por el equipo en `127.0.0.1` estuvo disponible durante la auditoría. Esa indisponibilidad no se mantiene como hallazgo de producto.

## Hallazgos

### UX-002 — El hero desborda horizontalmente en el frame móvil

- **Evidencia:** en `390 × 844 px`, la aplicación local expone un desplazamiento horizontal: `documentElement.clientWidth = 375` y `scrollWidth = 455`. El bloque del contador mide 439 px y llega al borde derecho 455 px. La captura muestra el título de *Avengers: Doomsday* y el contenido del hero recortados, junto con la barra horizontal. En el preview móvil de Figma, `clientWidth` y `scrollWidth` son ambos 390 px y no hay desplazamiento horizontal.
- **Viewport/frame:** Figma Make, preview móvil a 390 × 844 px; aplicación local a 390 × 844 px.
- **Estado actual:** el contenido esencial del estreno se extiende fuera del ancho visible en móvil.
- **Resultado esperado:** el hero y su cuenta regresiva permanecen completamente visibles, sin desplazamiento horizontal, dentro del ancho del viewport de referencia.
- **Severidad propuesta:** P1. Es una diferencia visual evidente que degrada la consulta del estreno en el formato prioritario.
- **Criterio verificable de corrección:** a 390 px y 320 px, `scrollWidth` no supera `clientWidth` y los cuatro valores de la cuenta, su título y sus etiquetas se ven completos sin desplazamiento horizontal.

### UX-003 — El hero y la cuenta regresiva no reproducen la jerarquía cinematográfica de Figma

- **Evidencia:** el frame Figma coloca la imagen de *Avengers: Doomsday* a todo lo ancho del hero, el rótulo **CUENTA REGRESIVA AL ESTRENO**, título con tipografía Fraunces serif de 36 px, subtítulo y cuatro celdas temporales individuales. La aplicación local no carga imágenes (`document.images.length = 0`), presenta primero una introducción independiente de **Plan de Cine MCU**, usa Space Grotesk para el título principal y agrupa el contador en una tarjeta violeta sin imagen ni celdas equivalentes.
- **Viewport/frame:** preview móvil Figma a 390 × 844 px y preview de escritorio; aplicación local en móvil y escritorio.
- **Estado actual:** la meta de estreno se percibe como una tarjeta secundaria tras una introducción amplia, no como el hero visual dominante del frame de referencia.
- **Resultado esperado:** la meta de estreno conserva la jerarquía visual del frame: fondo cinematográfico, título principal, información secundaria compacta y cuatro unidades temporales claramente delimitadas.
- **Severidad propuesta:** P1. Afecta la primera lectura de la pantalla y la intención de cuenta regresiva del producto.
- **Criterio verificable de corrección:** en los frames móvil y escritorio, la captura muestra un hero con recurso visual de estreno, las cuatro unidades temporales delimitadas y una jerarquía tipográfica equivalente a la referencia; ningún elemento editorial previo desplaza esa meta de la primera prioridad visual.

### UX-004 — Las tarjetas de la ruta no tienen la densidad visual ni los elementos de referencia

- **Evidencia:** cada tarjeta de Figma incluye miniatura, título, año/duración, badge de estado, razón truncada, fecha y, cuando aplica, acción compacta. En la aplicación local las ocho tarjetas no contienen imágenes y priorizan las etiquetas **Película/Serie**, **Estado**, **Programada para** y **Por qué verla** en bloques verticales; el botón de transición ocupa una fila final separada. El preview Figma usa tarjetas compactas, borde `#292D48` y radio de 16 px.
- **Viewport/frame:** lista **PELÍCULAS** del preview móvil Figma y columna **Películas previas** del preview de escritorio; ruta local en ambos formatos.
- **Estado actual:** la ruta ocupa más altura y no ofrece las señales visuales de reconocimiento rápido presentes en el diseño de referencia.
- **Resultado esperado:** cada contenido conserva el patrón de tarjeta del frame: imagen, metadatos compactos, estado visible, motivo, fecha y acción alineados sin ocultar información esencial.
- **Severidad propuesta:** P1. La lista es el flujo central para decidir qué ver y su presentación actual diverge de forma evidente del diseño aprobado.
- **Criterio verificable de corrección:** las capturas móvil y escritorio muestran, para al menos un ítem en cada estado, miniatura, metadatos, badge, fecha, motivo y acción con una densidad y alineación equivalentes al frame Figma; los textos largos no rompen la tarjeta.

### UX-005 — La composición de escritorio no coincide con el frame de dos columnas de Figma

- **Evidencia:** el preview de escritorio Figma presenta un hero de ancho completo y, debajo, un contenedor centrado con dos columnas: **Películas previas** a la izquierda y **Calendario** a la derecha; el resumen forma parte de la columna de películas. La aplicación local sí hace visibles ruta y calendario en dos columnas a 1440 px, pero coloca un resumen de preparación de ancho casi completo antes de ellas, deja filtros separados en la columna izquierda y no reproduce los encabezados ni la proporción visual del frame. Tampoco carga los recursos gráficos de las tarjetas (`document.images.length = 0`).
- **Viewport/frame:** preview Figma de escritorio y aplicación local a 1440 × 900 px.
- **Estado actual:** existen dos columnas funcionales, pero la jerarquía, proporciones y agrupación visual difieren del diseño de referencia.
- **Resultado esperado:** en escritorio, el hero, la ruta con su resumen y el calendario forman las dos columnas y los bloques visibles del frame Figma, manteniendo el calendario como panel lateral contextual.
- **Severidad propuesta:** P2. No bloquea el flujo, pero aleja de forma notable la interfaz desktop del diseño acordado.
- **Criterio verificable de corrección:** a 1440 px, la captura muestra el hero seguido de las dos columnas con los encabezados, el resumen y el calendario agrupados y proporcionados como en el frame de Figma, sin contenido gráfico ausente.

## Verificaciones sin discrepancia

- Las pestañas móviles **Películas** y **Calendario** existen, son controles de 44 px de alto y permiten cambiar la vista. Esto coincide con la navegación de dos vistas del preview y no requiere remediación por sí mismo.
- El fondo base de la aplicación local es `rgb(13, 16, 32)`, equivalente a `#0D1020` de la paleta de referencia.

## Siguiente uso por el responsable técnico

El informe de producto puede confirmar el impacto de los hallazgos en los casos de uso. El responsable técnico debe eliminar duplicados, clasificar cada entrada según [AUDIT_GUIDELINES.md](./AUDIT_GUIDELINES.md) y crear unidades de remediación atómicas; este informe no prescribe una implementación.

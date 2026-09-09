# Backlog técnico consolidado — auditoría #32

- **Issue de origen:** [#32](https://github.com/carosalazar28/marvel-astro/issues/32)
- **Versión auditada:** `main` en `a0c8cf3`
- **Informes fuente:** [UI/UX](./ui-ux-report.md) y [recorrido de producto](./product-report.md)
- **Criterios aplicados:** [AUDIT_GUIDELINES.md](./AUDIT_GUIDELINES.md)
- **Fecha de consolidación:** 2026-09-09

## Dictamen

No hay hallazgos P0 ni defectos funcionales confirmados en UC-01 a UC-06. El recorrido de producto verificó la ruta, transiciones, filtros, orden, calendario y cuenta regresiva disponibles. La persistencia tras recarga y varios casos límite no se pudieron volver a ejecutar porque el servidor local dejó de responder; esa limitación del entorno no prueba un defecto del producto.

Los cuatro hallazgos UI/UX no son duplicados: cubren, respectivamente, contención móvil, jerarquía del estreno, patrón de tarjetas y composición de escritorio. Todos proceden del mismo commit y de la comparación con los frames de Figma indicados en el informe UI/UX. Las unidades sugeridas deben abrirse primero como issues independientes vinculados a #32; no representan una prescripción de arquitectura.

## Backlog priorizado

### TA-001 — Corregir el desbordamiento horizontal del hero en móvil

| Campo | Detalle |
| --- | --- |
| Fuentes | [UX-002](./ui-ux-report.md#ux-002--el-hero-desborda-horizontalmente-en-el-frame-móvil); [producto: UC-04 sin incidencia funcional](./product-report.md#uc-04--consultar-próximos-estrenos) |
| Clasificación | **Defecto** |
| Prioridad | **P1** |
| Estado | **En remediación:** issue [#36](https://github.com/carosalazar28/marvel-astro/issues/36). |
| Impacto | En 390 px el contenido de la meta de estreno, primer punto de lectura del producto, exige desplazamiento horizontal y puede quedar recortado. |
| Riesgo técnico confirmado | `.countdown` declara `width: 100%` y padding horizontal. El `box-sizing: border-box` está definido en el estilo scoped de `Layout.astro`; los nodos renderizados por la isla React no reciben el atributo de scope, por lo que el ancho de contenido y el padding se suman. La medición de UI/UX (`clientWidth` 375 px frente a `scrollWidth` 455 px) confirma el efecto observable. |
| Criterio de cierre | A 390 px y 320 px, el documento no tiene desplazamiento horizontal (`scrollWidth <= clientWidth`) y título, fecha, cuatro valores y etiquetas del contador están completos. Se conserva el flujo UC-04 y los controles móviles mantienen sus áreas mínimas. |
| Unidad de issue sugerida | `fix(responsive): contener hero de cuenta regresiva en móvil`. Debe incluir una prueba/regresión verificable de la regla de layout afectada y evidencia visual de los dos viewports. |

### TA-002 — Alinear la jerarquía visual del hero con el frame de estreno aprobado

| Campo | Detalle |
| --- | --- |
| Fuentes | [UX-003](./ui-ux-report.md#ux-003--el-hero-y-la-cuenta-regresiva-no-reproducen-la-jerarquía-cinematográfica-de-figma); [producto: UC-04 sin incidencia funcional](./product-report.md#uc-04--consultar-próximos-estrenos) |
| Clasificación | **Defecto** |
| Prioridad | **P1** |
| Estado | **En remediación:** issue [#38](https://github.com/carosalazar28/marvel-astro/issues/38). |
| Impacto | La pantalla no prioriza visualmente el estreno y su cuenta regresiva como el frame de referencia, lo que debilita la propuesta de valor de identificar la meta antes de planear la ruta. |
| Riesgo técnico confirmado | La página renderiza una introducción editorial separada antes de la sección de estreno; `CountdownTimer` solo recibe título y fecha. El contrato de estreno documentado no incluye un recurso visual y el informe UI/UX confirmó que no se cargan imágenes. `DESIGN.md` documenta la jerarquía actual, por lo que la diferencia con Figma también deja una decisión visual sin alinear entre fuente de diseño y documentación versionada. |
| Criterio de cierre | En los frames Figma móvil y escritorio, el estreno es el bloque dominante sin una introducción previa que lo desplace; muestra recurso visual local permitido, título, información secundaria compacta y cuatro unidades temporales delimitadas. `DESIGN.md` y `FRONTEND.md` describen el estado resultante sin introducir API externa. UC-04 sigue cubierto. |
| Unidad de issue sugerida | `feat(design): alinear hero del estreno con Figma`. El alcance debe limitarse al hero y a los datos/recursos estrictamente necesarios para él; las tarjetas de la ruta quedan fuera. |

### TA-003 — Incorporar el patrón visual de tarjetas de preparación del frame de referencia

| Campo | Detalle |
| --- | --- |
| Fuentes | [UX-004](./ui-ux-report.md#ux-004--las-tarjetas-de-la-ruta-no-tienen-la-densidad-visual-ni-los-elementos-de-referencia); [producto: UC-01 y UC-02 sin incidencia funcional](./product-report.md#uc-01--consultar-el-plan-semanal) |
| Clasificación | **Defecto** |
| Prioridad | **P1** |
| Estado | **En remediación:** issue [#39](https://github.com/carosalazar28/marvel-astro/issues/39). |
| Impacto | La ruta central ocupa más espacio y no ofrece el reconocimiento rápido por miniatura, metadatos compactos y estado que muestra el diseño de referencia. |
| Riesgo técnico confirmado | `PreparationRoute` recibe el contrato editorial validado actual, que no incluye recurso visual ni duración; el repositorio tampoco contiene recursos gráficos de las tarjetas. La implementación actual organiza tipo, estado, fecha, razón y acción verticalmente, por lo que no puede reproducir el patrón de Figma sin ampliar de forma explícita los datos locales y la presentación. |
| Criterio de cierre | En móvil y escritorio, al menos una tarjeta por estado aplicable muestra recurso visual local, metadatos, badge textual de estado, fecha, razón y acción sin cortes con títulos o razones largas. Se preservan los controles de teclado, los estados `Sin ver → Viendo → Vista` y la ausencia de fuentes externas. |
| Unidad de issue sugerida | `feat(route): alinear tarjetas de preparación con Figma`. Debe declarar el contrato de datos visual local y validar sus entradas; no debe asumir servicios de imágenes, backend ni API. |

### TA-004 — Reorganizar la composición desktop en el patrón de dos columnas de Figma

| Campo | Detalle |
| --- | --- |
| Fuentes | [UX-005](./ui-ux-report.md#ux-005--la-composición-de-escritorio-no-coincide-con-el-frame-de-dos-columnas-de-figma); [producto: UC-01 y UC-06 sin incidencia funcional](./product-report.md#uc-01--consultar-el-plan-semanal) |
| Clasificación | **Defecto** |
| Prioridad | **P2** |
| Estado | **En remediación:** issue [#40](https://github.com/carosalazar28/marvel-astro/issues/40). |
| Impacto | Ruta, resumen, filtros y calendario siguen siendo utilizables, pero su agrupación y proporción no permiten la lectura de dos columnas prevista para escritorio. |
| Riesgo técnico confirmado | El tracker ya usa una cuadrícula desde 768 px, pero el resumen se renderiza antes del contenedor de ruta/calendario y los filtros pertenecen a la columna de ruta. La estructura existente explica la diferencia de agrupación observada; no hay evidencia de un problema de datos, persistencia o rendimiento. |
| Criterio de cierre | A 1440 px, después del hero, la ruta con su resumen y el calendario aparecen agrupados en dos columnas con encabezados y proporciones equivalentes al frame Figma. Filtros, estado local, selección de día y navegación mensual mantienen los resultados de UC-01, UC-03 y UC-06. |
| Unidad de issue sugerida | `feat(layout): alinear composición desktop del tracker con Figma`. Debe limitarse a composición y estilos; los recursos y la estructura interna de las tarjetas se entregan por TA-003. |

## Hallazgos deliberados, descartados o pendientes de nueva evidencia

| Referencia | Resolución | Justificación |
| --- | --- | --- |
| Pestañas móviles `Películas` y `Calendario` | **Diferencia descartada** | UI/UX verificó controles de 44 px y cambio de vista; coincide con `DESIGN.md`, `FRONTEND.md` y UC-06. |
| Fondo base `#0D1020` | **Diferencia descartada** | UI/UX verificó equivalencia con la paleta de referencia. |
| Persistencia tras recarga, datos corruptos, ruta vacía y otros límites no recorridos en navegador | **Pendiente de evidencia** | El informe de producto declara que el servidor local se interrumpió. Las pruebas existentes cubren parte de estas decisiones, pero no se debe transformar esta limitación de sesión en defecto sin una reproducción sobre una instancia disponible. |
| Ausencia temporal de `localhost:4321` | **Descartado como defecto de producto** | No se dispone de evidencia de que provenga de la aplicación; la sesión había funcionado antes y el informe UI/UX pudo usar otra instancia local. |

## Orden recomendado de remediación

1. TA-001, por el desbordamiento reproducible en el viewport móvil prioritario.
2. TA-002, porque reestablece la prioridad visual de la meta de estreno y alinea la documentación de diseño.
3. TA-003, de forma independiente para no mezclar contrato de recursos locales con la composición general.
4. TA-004, tras disponer del patrón de tarjetas o usando marcadores visuales neutros mientras TA-003 no se haya integrado.

Cada issue y PR debe volver a enlazar este identificador, #32 y la evidencia Figma correspondiente. La aprobación y fusión continúan siendo humanas.

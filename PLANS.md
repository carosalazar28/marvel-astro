# Plan de entrega

## Estado actual

- Implementado: layout Astro, cuenta regresiva del estreno objetivo y ruta de preparación versionada, validada y ordenada.
- Implementado: tracker de ruta con transición `Sin ver → Viendo → Vista`, persistencia segura por `id` estable, reinicio local, resumen de preparación y filtros u orden sin mutar el catálogo.
- Implementado: calendario mensual navegable con detalle por día y próximas visualizaciones derivadas de la misma ruta y progreso local.
- Implementado: composición responsive del tracker, con pestañas adhesivas en móvil y dos columnas en escritorio.

## Hito 0 — Calidad habilitante

Completado: Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event`, `jsdom`, scripts npm de prueba/cobertura y validador de descripciones de PR. Todo código ejecutable futuro mantiene 100% de cobertura de líneas, funciones y ramas.

## Hito 1 — Datos y calendario

Completado: la ruta JSON unificada se muestra como lista y calendario mensual, con películas y series identificadas por `id` estable.

## Hito 2 — Progreso personal

Completado para la ruta de preparación: estados por `id`, tolerancia a datos locales inválidos, resumen, filtros por estado o tipo y orden. Futuros campos editoriales como fase requerirán ampliar el contrato JSON antes de filtrar por ellos.

## Hito 3 — Pulido de experiencia

Completar la validación visual manual de responsive, teclado, foco, contraste y movimiento reducido sobre navegadores objetivo.

Cada hito se divide en PRs de máximo 1.000 líneas. Si su dependencia impide hacerlos independientes, se usan PRs stackeados y se declara su orden de merge.

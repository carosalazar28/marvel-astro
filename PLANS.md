# Plan de entrega

## Estado actual

- Implementado: layout Astro, cuenta regresiva del estreno objetivo y ruta de preparación versionada, validada y ordenada.
- Pendiente: transición de estado y persistencia por `id` estable, porcentaje de preparación, calendario mensual, filtros y orden.

## Hito 0 — Calidad habilitante

Completado: Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event`, `jsdom`, scripts npm de prueba/cobertura y validador de descripciones de PR. Todo código ejecutable futuro mantiene 100% de cobertura de líneas, funciones y ramas.

## Hito 1 — Datos y calendario

Completar el esquema JSON unificado con `id` estable, películas y series. La ruta inicial de preparación ya se muestra desde JSON; queda el calendario mensual y sus filtros.

## Hito 2 — Progreso personal

Persistir ítems vistos por `id`, tolerar datos locales inválidos, calcular estadísticas y permitir filtros por estado, tipo y fase, más orden.

## Hito 3 — Pulido de experiencia

Validar responsive, teclado, foco, contraste y movimiento reducido; completar las pruebas de los casos de uso documentados.

Cada hito se divide en PRs de máximo 1.000 líneas. Si su dependencia impide hacerlos independientes, se usan PRs stackeados y se declara su orden de merge.

# Plan de entrega

## Estado actual

- Implementado: layout Astro, cuenta regresiva del estreno objetivo y ruta de preparación versionada, validada y ordenada.
- Implementado: dominio reutilizable para transicionar `Sin ver → Viendo → Vista`, persistencia segura por `id` estable y reinicio local; todavía no se conecta a la lista de películas.
- Pendiente: conectar los estados de progreso a la ruta, porcentaje de preparación, calendario mensual, filtros y orden.

## Hito 0 — Calidad habilitante

Completado: Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event`, `jsdom`, scripts npm de prueba/cobertura y validador de descripciones de PR. Todo código ejecutable futuro mantiene 100% de cobertura de líneas, funciones y ramas.

## Hito 1 — Datos y calendario

Completar el esquema JSON unificado con `id` estable, películas y series. La ruta inicial de preparación ya se muestra desde JSON; queda el calendario mensual y sus filtros.

## Hito 2 — Progreso personal

Persistir estados por `id`, tolerar datos locales inválidos, calcular estadísticas y permitir filtros por estado, tipo y fase, más orden. La frontera de transición y persistencia está lista; resta conectarla al catálogo y a la interfaz.

## Hito 3 — Pulido de experiencia

Validar responsive, teclado, foco, contraste y movimiento reducido; completar las pruebas de los casos de uso documentados.

Cada hito se divide en PRs de máximo 1.000 líneas. Si su dependencia impide hacerlos independientes, se usan PRs stackeados y se declara su orden de merge.

# Plan de entrega

## Estado actual

- Implementado: layout Astro, carrusel de cuentas regresivas y hook de cuenta regresiva.
- Parcial: componente de películas con marcado local, estadísticas, filtro y orden; aún no se muestra en la página.
- Pendiente: modelo de datos unificado, soporte de series, filtros por tipo/fase, persistencia por `id` estable, manejo de datos locales corruptos, pruebas y cobertura.

## Hito 0 — Calidad habilitante

Instalar y configurar Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event` y `jsdom`. Añadir scripts de prueba y cobertura que permitan verificar 100% de líneas, funciones y ramas del código modificado. La verificación de cobertura diferencial debe ejecutarse antes de agregar funcionalidades de v1.

## Hito 1 — Datos y calendario

Definir el esquema JSON unificado con `id` estable, películas y series. Conectar el calendario a la página y mostrar la secuencia semanal.

## Hito 2 — Progreso personal

Persistir ítems vistos por `id`, tolerar datos locales inválidos, calcular estadísticas y permitir filtros por estado, tipo y fase, más orden.

## Hito 3 — Pulido de experiencia

Validar responsive, teclado, foco, contraste y movimiento reducido; completar las pruebas de los casos de uso documentados.

Cada hito se divide en PRs de máximo 1.000 líneas. Si su dependencia impide hacerlos independientes, se usan PRs stackeados y se declara su orden de merge.

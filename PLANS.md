# Plan de entrega

## Estado actual

- Implementado: layout Astro, carrusel de cuentas regresivas y hook de cuenta regresiva.
- Parcial: componente de películas con marcado local, estadísticas, filtro y orden; aún no se muestra en la página.
- Implementado: dominio reutilizable para transicionar `Sin ver → Viendo → Vista`, persistencia segura por `id` estable y reinicio local; todavía no se conecta a la lista de películas.
- Pendiente: modelo de datos unificado, soporte de series, filtros por tipo/fase y conexión de progreso con la interfaz del plan.

## Hito 0 — Calidad habilitante

Configurar Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event`, `jsdom` y scripts npm de prueba/cobertura. El validador de descripciones de PR es la primera unidad cubierta al 100%; la misma exigencia aplica a todo código ejecutable futuro. La verificación de cobertura diferencial debe ejecutarse antes de agregar funcionalidades de v1.

## Hito 1 — Datos y calendario

Definir el esquema JSON unificado con `id` estable, películas y series. Conectar el calendario a la página y mostrar la secuencia semanal.

## Hito 2 — Progreso personal

Persistir estados por `id`, tolerar datos locales inválidos, calcular estadísticas y permitir filtros por estado, tipo y fase, más orden. La frontera de transición y persistencia está lista; resta conectarla al catálogo y a la interfaz.

## Hito 3 — Pulido de experiencia

Validar responsive, teclado, foco, contraste y movimiento reducido; completar las pruebas de los casos de uso documentados.

Cada hito se divide en PRs de máximo 1.000 líneas. Si su dependencia impide hacerlos independientes, se usan PRs stackeados y se declara su orden de merge.

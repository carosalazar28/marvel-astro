---
name: testing-and-coverage
description: Define pruebas unitarias y cobertura total del código modificado en el Plan de Cine MCU, incluyendo bordes y fallos.
---

# Pruebas y cobertura

Usa esta skill al crear o cambiar código ejecutable.

## Regla de cobertura

El código modificado debe alcanzar 100% de líneas, funciones y ramas. La cobertura se mide sobre el diff ejecutable, no sobre archivos de documentación ni sobre código no modificado. No se permite excluir una rama para ocultar comportamiento sin una justificación aprobada y documentada.

Hasta que se configure la suite del Hito 0, no se debe añadir código de producto nuevo sin incluir esa configuración en el mismo PR o en su PR base stackeado. La suite usará Vitest, `@vitest/coverage-v8`, Testing Library, `@testing-library/user-event` y `jsdom`.

## Diseño de pruebas

Para cada unidad modificada, prueba el flujo principal y todas las decisiones observables que introduzca. Según aplique, cubre:

- entradas límite, ausentes, inválidas y desconocidas;
- colecciones vacías, un solo elemento, duplicados y ordenamientos;
- fechas futuras, pasadas e inválidas;
- transiciones de estado, ida y vuelta de una acción y reinicialización;
- `localStorage` ausente, datos corruptos, errores de acceso e identificadores obsoletos;
- interacción de teclado y nombres accesibles en controles nuevos o modificados.

Una prueba que solo renderiza un componente o verifica el happy path no satisface esta skill. Prueba resultados que una persona usuaria o la lógica de dominio pueda observar.

## Evidencia

Ejecuta el build y la suite de pruebas/cobertura. Registra en el PR los comandos, el resultado y la evidencia de 100% para el código modificado. Si una rama no es alcanzable, rediseña el código o la prueba; no omitas el caso.

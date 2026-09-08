---
name: documentation-and-learning
description: Mantiene la documentación y convierte fallos confirmados del Plan de Cine MCU en mejoras reutilizables del harness.
---

# Documentación y aprendizaje

Usa esta skill en todo cambio y especialmente después de un fallo confirmado.

## Documentación del cambio

Actualiza en el mismo PR los documentos que cambien de verdad:

- `ARCHITECTURE.md` para límites técnicos, datos, dependencias o persistencia.
- `DESIGN.md` para sistema visual, responsive o accesibilidad.
- `FRONTEND.md` para interfaces, componentes, estado o comportamiento.
- `PRODUCT_SENSE.md` para audiencia, valor, límites o señal de éxito.
- `PLANS.md` para estado, hitos o deuda.
- `docs/use-cases/` para flujos observables, precondiciones y casos límite.

No cambies documentación solo para marcar una casilla: debe describir el estado resultante de manera precisa.

## Fallos confirmados

Un bug reproducible, prueba fallida, regresión, incidente o hallazgo de revisión es un fallo confirmado. Antes de cerrar el cambio:

1. Registra causa raíz, impacto y corrección en el PR o en el documento de caso de uso afectado.
2. Identifica la mejora más pequeña y reutilizable que habría prevenido o detectado el fallo.
3. Actualiza la skill, el harness o la documentación correspondiente en el mismo cambio cuando la mejora sea generalizable.
4. Añade o refuerza una prueba cuando el fallo es verificable automáticamente.

No conviertas una anécdota en regla universal. Generaliza solo causas que puedan repetirse en trabajo futuro; para las demás, documenta el caso local y su prueba.

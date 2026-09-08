---
name: technical-review
description: Revisa arquitectura, calidad, accesibilidad y mantenibilidad del Plan de Cine MCU antes de abrir un pull request.
---

# Revisión técnica

Usa esta skill antes de abrir cualquier pull request con código, configuración, dependencias o estilos.

## Lista de revisión

- ¿Astro sigue siendo el shell y React está limitado a interacciones que necesitan estado de navegador?
- ¿Los datos versionados se mantienen inmutables y tipados; no se duplican fuentes de verdad?
- ¿Las claves de progreso son `id` estables y el acceso a `localStorage` es seguro ante SSR, ausencia, corrupción y error?
- ¿El cambio evita trabajo innecesario en render, temporizadores huérfanos, logs de depuración y mutaciones de props?
- ¿Los nuevos controles son semánticos, tienen nombre accesible, foco visible y uso por teclado? ¿Las animaciones respetan movimiento reducido cuando aplica?
- ¿El diseño funciona en móvil y escritorio sin depender solo del color para comunicar estado?
- ¿Se añadieron pruebas suficientes para 100% de líneas, funciones y ramas modificadas, incluidos bordes y errores?
- ¿Se actualizaron dependencias, scripts y documentación solo cuando son necesarios y con justificación?

Registra hallazgos y resolución en el PR. No abras el PR con un defecto crítico de seguridad, pérdida de datos, accesibilidad de un control modificado o incumplimiento de cobertura.

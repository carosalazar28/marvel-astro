# Auditorías de experiencia

Esta carpeta conserva la evidencia versionada de auditorías de interfaz, producto y técnica. Para el issue [#32](https://github.com/carosalazar28/marvel-astro/issues/32), los informes se producen en este orden:

1. `ui-ux-report.md`: comparación con los frames de Figma en escritorio y móvil.
2. `product-report.md`: ejecución reproducible de los casos de uso.
3. `technical-audit.md`: consolidación, clasificación y backlog priorizado.

Los dos primeros informes pueden elaborarse en paralelo sobre el mismo commit de `main`. El informe técnico no comienza hasta que ambos documenten su versión evaluada. `AUDIT_GUIDELINES.md` establece el formato y la evidencia mínima; los informes deben enlazarse entre sí y al issue de origen.

Los informes describen hechos observados, no corrigen la aplicación. Cada hallazgo priorizado se convierte primero en un issue atómico enlazado a #32. Su corrección se entrega después mediante un PR contra `main`, conforme a `AGENTS.md` y las skills del repositorio.

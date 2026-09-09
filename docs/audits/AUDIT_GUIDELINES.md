# Guidelines de auditoría

Estas reglas normalizan la evidencia de auditorías; no sustituyen `AGENTS.md` ni las skills del repositorio.

## Formato de un hallazgo

Cada hallazgo incluye un identificador estable, fuente (`UI/UX`, `producto` o `técnica`), versión o commit inspeccionado, viewport cuando aplique, evidencia enlazable, comportamiento actual, resultado esperado, impacto, clasificación y criterio verificable de cierre. No se registra una recomendación sin describir primero el comportamiento observable.

## Prioridad y clasificación

| Prioridad | Criterio |
| --- | --- |
| P0 | Impide completar la preparación, pierde progreso o bloquea una interacción esencial. |
| P1 | Rompe un caso de uso principal, accesibilidad básica o una diferencia visual evidente en el frame de referencia. |
| P2 | Degrada comprensión, consistencia o eficiencia sin impedir el flujo principal. |
| P3 | Mejora de mantenimiento o pulido sin impacto observable inmediato. |

El responsable técnico clasifica cada entrada como **defecto**, **diferencia deliberada** o **deuda técnica**. Las diferencias deliberadas deben citar la decisión de producto o documento que las justifica. Los duplicados se consolidan conservando todos sus enlaces de evidencia.

## Evidencia mínima

- UI/UX: URL del frame de Figma, viewport, captura o descripción visual precisa y la diferencia actual frente a la esperada.
- Producto: precondición, pasos reproducibles, resultado esperado y actual, impacto y prioridad propuesta.
- Técnica: referencias a los informes de UI/UX y producto, causa o riesgo técnico cuando sea verificable, clasificación final y unidad de remediación sugerida.

## Validación de una corrección

Antes de considerar resuelto un hallazgo, el PR demuestra el frame de Figma afectado en escritorio y/o móvil, ejecuta el flujo de producto relacionado y satisface el build y las pruebas requeridas por el harness. El criterio de cierre debe poder verificarse sin interpretar intenciones.

## Entrega y aprendizaje

Una remediación crea o actualiza primero un issue atómico vinculado a #32. Cada PR respeta el máximo de 1.000 líneas, apunta a `main`, enlaza y cierra su issue, y actualiza los informes o documentos que dejen de describir el estado real. Un fallo confirmado registra causa raíz y añade una mejora reutilizable al harness solo cuando sea generalizable.

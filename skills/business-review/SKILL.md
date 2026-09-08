---
name: business-review
description: Revisa cambios del Plan de Cine MCU contra el propósito, casos de uso y límites de producto antes de abrir un pull request.
---

# Revisión de negocio

Usa esta skill antes de abrir cualquier pull request que afecte comportamiento, datos, interfaz o documentación de producto.

## Lista de revisión

- ¿El cambio facilita identificar el contenido semanal, marcarlo como visto o conocer el avance sin fricción?
- ¿Respeta que el producto es personal, local y sin cuentas, backend, sincronización ni APIs externas?
- ¿Conserva el calendario unificado, donde una película o serie completa ocupa una semana?
- ¿Mantiene el JSON versionado como fuente de catálogo y las fechas manuales como decisión consciente?
- ¿El estado de visto se vincula solo a un `id` estable?
- ¿El comportamiento coincide con los documentos de `docs/use-cases/` y con `PRODUCT_SENSE.md`?
- ¿La interfaz explica estados vacíos o fallos recuperables sin bloquear a la persona usuaria?

Documenta en la plantilla del PR los hallazgos y cómo se resolvieron. Si la propuesta modifica un límite de v1, detén la apertura del PR hasta actualizar y alinear `PRODUCT_SENSE.md`, arquitectura, frontend, plan y casos de uso afectados.

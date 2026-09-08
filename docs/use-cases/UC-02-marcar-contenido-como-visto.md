# UC-02: Marcar contenido como visto

**Actor:** persona usuaria local.

**Precondición:** existe un ítem visible con `id` estable.

**Flujo principal:** marca un ítem como visto; la interfaz actualiza el estado de la tarjeta y las estadísticas; el `id` se guarda localmente. Puede desmarcarlo y el progreso se revierte.

**Resultado:** el progreso permanece disponible al recargar en el mismo navegador.

**Casos límite:** sin ítems; almacenamiento vacío, inaccesible o con JSON corrupto; un `id` guardado que ya no pertenece al catálogo. La interfaz conserva su funcionamiento y omite datos no válidos.

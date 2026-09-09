# UC-02: Marcar contenido como visto

**Actor:** persona usuaria local.

**Precondición:** existe un ítem visible con `id` estable.

**Flujo principal:** marca un ítem como visto; la interfaz actualiza el estado de la tarjeta y las estadísticas; el `id` se guarda localmente. Puede desmarcarlo y el progreso se revierte.

**Resultado:** el progreso permanece disponible al recargar en el mismo navegador.

**Resumen de preparación:** a partir de los ítems de la ruta, la interfaz muestra el porcentaje y las cantidades completadas y pendientes. Solo declara que la persona está lista para el estreno cuando existe al menos un ítem y todos están vistos.

**Casos límite:** sin ítems; almacenamiento vacío, inaccesible o con JSON corrupto; un `id` guardado que ya no pertenece al catálogo; estados desconocidos e identificadores repetidos. La interfaz conserva su funcionamiento, omite identificadores vacíos y cuenta una sola vez cada `id` estable.

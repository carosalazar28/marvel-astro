# UC-02: Marcar contenido como visto

**Actor:** persona usuaria local.

**Precondición:** existe un ítem visible con `id` estable.

**Flujo principal:** avanza un ítem de `Sin ver` a `Viendo` y luego a `Vista`; la interfaz actualiza el estado de la tarjeta y el `id` con su estado se guarda localmente. Una nueva acción sobre `Vista` lo conserva completado para evitar retrocesos accidentales.

**Resultado:** el progreso permanece disponible al recargar en el mismo navegador. Cuando la interfaz de plan ofrezca reinicio, elimina todos los estados locales y vuelve a `Sin ver`.

**Casos límite:** identificador vacío o inválido; sin ítems; almacenamiento vacío, inaccesible o con JSON corrupto; un `id` guardado que ya no pertenece al catálogo. La interfaz conserva su funcionamiento, omite datos no válidos y parte de progreso vacío si no puede recuperar el almacenamiento.

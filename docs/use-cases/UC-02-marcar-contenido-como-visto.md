# UC-02: Marcar contenido como visto

**Actor:** persona usuaria local.

**Precondición:** existe un ítem visible con `id` estable.

**Flujo principal:** avanza un ítem de `Sin ver` a `Viendo` y luego a `Vista`; la interfaz actualiza el estado de la tarjeta y el `id` con su estado se guarda localmente. Una nueva acción sobre `Vista` lo conserva completado para evitar retrocesos accidentales.

**Resultado:** el progreso permanece disponible al recargar en el mismo navegador. El tracker ofrece dos reinicios: **Reiniciar progreso local** elimina todos los estados locales y vuelve al estado editorial definido en el JSON —incluidas las películas marcadas inicialmente como `Vista`—; **Reiniciar calendario completo** guarda localmente todos los ítems como `Sin ver`, incluso los que el JSON marca inicialmente como `Vista`. Ninguno edita, elimina u oculta la ruta editorial.

**Resumen de preparación:** a partir de los ítems de la ruta, la interfaz muestra el porcentaje y las cantidades completadas y pendientes. Solo declara que la persona está lista para el estreno cuando existe al menos un ítem y todos están vistos.

**Casos límite:** identificador vacío o inválido; sin ítems; almacenamiento vacío, inaccesible o con JSON corrupto; un `id` guardado que ya no pertenece al catálogo; estados desconocidos e identificadores repetidos. La interfaz conserva su funcionamiento, omite datos no válidos, cuenta una sola vez cada `id` estable y parte de progreso vacío si no puede recuperar el almacenamiento.

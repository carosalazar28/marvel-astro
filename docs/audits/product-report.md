# Informe de recorrido de producto — auditoría #32

- **Issue de origen:** [#32](https://github.com/carosalazar28/marvel-astro/issues/32)
- **Versión inspeccionada:** `main` en el commit `a0c8cf3`.
- **Entorno:** `http://localhost:4321/`, sesión de Brave en escritorio, 9 de septiembre de 2026.
- **Documentos contrastados:** `PRODUCT_SENSE.md`, `FRONTEND.md`, `DESIGN.md` y UC-01 a UC-06.
- **Informe relacionado:** pendiente el informe paralelo de UI/UX en `docs/audits/ui-ux-report.md`.

## Resumen

No se confirmó un defecto funcional de producto durante los recorridos que pudieron completarse. La ruta, los filtros, el orden, el cambio de estado, el resumen, el calendario y la cuenta regresiva mostraron el comportamiento esperado con el catálogo disponible. La recarga necesaria para comprobar persistencia durante la misma sesión no fue evaluable porque el servidor local dejó de aceptar conexiones; se registra como limitación del entorno, no como hallazgo del producto.

## Hallazgos reproducibles

No hay hallazgos funcionales confirmados para priorización técnica en esta ejecución.

## Casos de uso sin incidencia confirmada

### UC-01 — Consultar el plan semanal

- **Precondición:** la página cargó con ocho contenidos válidos y progreso local previo visible.
- **Pasos ejecutados:** abrir la ruta principal; revisar la lista cronológica, tipo, fecha, estado y razón de relevancia de cada tarjeta.
- **Resultado esperado:** identificar el contenido, tipo, fecha, estado local y motivo para verlo.
- **Resultado actual:** se mostraron ocho contenidos; cada tarjeta expuso tipo, estado textual, fecha programada, motivo y control de cambio. El resumen indicó 1 completada y 7 pendientes de forma coherente con una tarjeta en estado `Vista`.
- **Impacto:** sin incidencia.

### UC-02 — Marcar contenido como visto

- **Precondición:** `Iron Man` estaba en `Sin ver`; `Capitán América: El primer vengador` ya estaba en `Vista` por progreso local existente.
- **Pasos ejecutados:** activar con teclado el control de `Iron Man` y revisar la tarjeta, el calendario y el control del ítem ya visto.
- **Resultado esperado:** el ítem avanza a `Viendo`; un ítem `Vista` no retrocede y su acción queda deshabilitada.
- **Resultado actual:** `Iron Man` pasó a `Viendo`; el calendario del 28 de octubre reflejó `Iron Man · Viendo`. La tarjeta ya vista mantuvo `Vista` y su botón apareció deshabilitado.
- **Impacto:** sin incidencia en las transiciones observadas.

### UC-03 — Filtrar y ordenar el calendario

- **Precondición:** la ruta contenía ocho ítems, una serie y contenido con estados `Sin ver`, `Viendo` y `Vista`.
- **Pasos ejecutados:** filtrar por `Series`; filtrar por `Viendo`; restaurar `Todo el contenido`; ordenar por `Título`.
- **Resultado esperado:** lista y recuento cambian según la selección; un resultado vacío se comunica en texto; el orden por título no altera estados ni contenido.
- **Resultado actual:** `Series` mostró 1 de 8; `Viendo` mostró 0 de 8 y el mensaje «No hay contenido que coincida con los filtros seleccionados.»; al restaurar el filtro aparecieron 8 de 8; el orden por título mostró la lista alfabética y preservó los estados.
- **Impacto:** sin incidencia.

### UC-04 — Consultar próximos estrenos

- **Precondición:** existe el estreno `Avengers: Doomsday` con fecha futura válida.
- **Pasos ejecutados:** abrir la portada y observar el estreno y la cuenta regresiva durante más de un ciclo de actualización.
- **Resultado esperado:** identificar estreno, fecha y tiempo restante sin valores negativos.
- **Resultado actual:** se mostró `Avengers: Doomsday`, fecha `18 de diciembre de 2026` y el contador decrementó los segundos en pantalla.
- **Impacto:** sin incidencia para la fecha futura disponible.

### UC-05 — Recuperar progreso local

- **Precondición:** la sesión tenía al menos un estado previamente almacenado.
- **Pasos ejecutados:** abrir la aplicación y contrastar el estado de la ruta con el resumen y el calendario; cambiar `Iron Man` a `Viendo`.
- **Resultado esperado:** los estados locales válidos se recuperan y se reflejan de manera coherente sin exponer detalles de almacenamiento.
- **Resultado actual:** al cargar se presentó un ítem en `Vista`, con resumen de 1 completada; tras el cambio, `Iron Man` se reflejó como `Viendo` tanto en la tarjeta como en el calendario.
- **Impacto:** sin incidencia en la recuperación inicial ni en la consistencia entre vistas. La persistencia tras recarga queda sin verificar por la limitación indicada abajo.

### UC-06 — Organizar la preparación en el calendario mensual

- **Precondición:** el catálogo tenía una visualización programada para el 28 de octubre de 2026.
- **Pasos ejecutados:** avanzar de septiembre a octubre mediante el botón `Mes siguiente`; seleccionar con teclado el 28 de octubre; revisar el detalle y próximas visualizaciones.
- **Resultado esperado:** navegar el mes, seleccionar un día y consultar contenido, estado y próximo paso sin modificar el catálogo.
- **Resultado actual:** el mes cambió a octubre; el día 28 expuso el nombre accesible «1 contenido: Iron Man, Viendo»; el detalle presentó `Iron Man · Viendo` y el panel mantuvo el próximo paso.
- **Impacto:** sin incidencia en el mes y día evaluados.

## Cobertura de teclado observada

- `Mes siguiente` respondió a `Enter`.
- El día 28 de octubre respondió a `Espacio` y actualizó el detalle.
- El control de estado de `Iron Man` respondió a `Enter`.

No se detectó una incidencia en esos controles. No se completó un recorrido por tabulación de todos los controles antes de perder la conexión local.

## Limitaciones y casos no evaluables

- Al intentar recargar la página para confirmar persistencia en una carga nueva, `localhost:4321` devolvió `ERR_CONNECTION_REFUSED`. El servidor había respondido correctamente durante los recorridos anteriores. Es una limitación de la sesión local y no hay evidencia suficiente para clasificarla como defecto de la aplicación.
- Por esa interrupción no se evaluaron en la interfaz los datos corruptos, catálogo vacío, identificadores inválidos, fechas de estreno pasadas o inválidas, múltiples elementos en un día, mes sin contenido, navegación entre años ni reinicio local.
- No se evaluó la navegación móvil ni los cambios de vista `Películas`/`Calendario`, porque la sesión disponible era de escritorio y el servidor dejó de estar disponible antes de poder abrir un viewport móvil.
- El informe no prescribe soluciones; el responsable técnico debe completar la evidencia faltante o decidir si abre una sesión reproducible para esos límites.

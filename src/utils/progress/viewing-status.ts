/** Estados posibles del avance de un contenido dentro del plan de preparación. */
export type ViewingStatus = 'unseen' | 'watching' | 'watched';

/** Progreso indexado exclusivamente por el identificador estable del catálogo. */
export type ViewingStatuses = Readonly<Record<string, ViewingStatus>>;

const INITIAL_VIEWING_STATUS: ViewingStatus = 'unseen';
const STATUS_TRANSITIONS: Readonly<Record<ViewingStatus, ViewingStatus>> = {
  unseen: 'watching',
  watching: 'watched',
  watched: 'watched',
};

/** Crea el estado seguro que se usa cuando todavía no existe progreso recuperable. */
export function createEmptyViewingStatuses(): ViewingStatuses {
  return {};
}

/** Evita usar claves vacías o valores no textuales para el progreso local. */
export function isStableContentId(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Comprueba que un valor recuperado representa uno de los estados del dominio. */
export function isViewingStatus(value: unknown): value is ViewingStatus {
  return value === 'unseen' || value === 'watching' || value === 'watched';
}

/** Devuelve el estado inicial para ids inválidos o todavía no registrados. */
export function getViewingStatus(statuses: ViewingStatuses, contentId: unknown): ViewingStatus {
  if (!isStableContentId(contentId)) {
    return INITIAL_VIEWING_STATUS;
  }

  return statuses[contentId] ?? INITIAL_VIEWING_STATUS;
}

/**
 * Avanza una sola vez el progreso de un ítem. `watched` es terminal para que
 * un toque repetido no revierta una película ya completada por accidente.
 */
export function advanceViewingStatus(
  statuses: ViewingStatuses,
  contentId: unknown,
): ViewingStatuses {
  if (!isStableContentId(contentId)) {
    return statuses;
  }

  const currentStatus = getViewingStatus(statuses, contentId);

  return {
    ...statuses,
    [contentId]: STATUS_TRANSITIONS[currentStatus],
  };
}

/** Reinicia el plan completo sin mutar el objeto de progreso anterior. */
export function resetViewingStatuses(_: ViewingStatuses): ViewingStatuses {
  return createEmptyViewingStatuses();
}

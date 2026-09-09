import {
  createEmptyViewingStatuses,
  isStableContentId,
  isViewingStatus,
  type ViewingStatus,
  type ViewingStatuses,
} from '../utils/progress/viewing-status';

/** Clave versionada para poder migrar el formato sin interpretar datos antiguos. */
export const VIEWING_STATUS_STORAGE_KEY = 'mcu-viewing-statuses-v1';

/** Contrato mínimo para aislar el navegador y permitir probar errores de almacenamiento. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Recupera únicamente estados que pertenecen al catálogo actual. Los datos
 * corruptos o inaccesibles se convierten en progreso vacío para no bloquear la interfaz.
 */
export function readViewingStatuses(
  storage: StorageLike | null | undefined,
  knownContentIds: readonly string[],
): ViewingStatuses {
  if (!storage) {
    return createEmptyViewingStatuses();
  }

  try {
    const rawValue = storage.getItem(VIEWING_STATUS_STORAGE_KEY);

    if (!rawValue) {
      return createEmptyViewingStatuses();
    }

    return sanitizeViewingStatuses(JSON.parse(rawValue), knownContentIds);
  } catch {
    return createEmptyViewingStatuses();
  }
}

/** Persiste el estado y devuelve si el navegador aceptó la escritura. */
export function writeViewingStatuses(
  storage: StorageLike | null | undefined,
  statuses: ViewingStatuses,
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(VIEWING_STATUS_STORAGE_KEY, JSON.stringify(statuses));
    return true;
  } catch {
    return false;
  }
}

/** Elimina el progreso persistido al reiniciar el plan. */
export function clearViewingStatuses(storage: StorageLike | null | undefined): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(VIEWING_STATUS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

function sanitizeViewingStatuses(value: unknown, knownContentIds: readonly string[]): ViewingStatuses {
  if (!isRecord(value)) {
    return createEmptyViewingStatuses();
  }

  const knownIds = new Set(knownContentIds.filter(isStableContentId));
  const statuses: Record<string, ViewingStatus> = {};

  for (const [contentId, status] of Object.entries(value)) {
    if (knownIds.has(contentId) && isViewingStatus(status)) {
      statuses[contentId] = status;
    }
  }

  return statuses;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

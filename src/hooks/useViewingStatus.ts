import { useCallback, useEffect, useState } from 'react';
import {
  advanceViewingStatus,
  createEmptyViewingStatuses,
  getViewingStatus,
  resetViewingStatuses,
  type ViewingStatus,
  type ViewingStatuses,
} from '../utils/progress/viewing-status';
import {
  clearViewingStatuses,
  readViewingStatuses,
  writeViewingStatuses,
  type StorageLike,
} from '../services/viewing-status-storage';

export interface ViewingStatusController {
  readonly statuses: ViewingStatuses;
  readonly isHydrated: boolean;
  getStatus(contentId: unknown): ViewingStatus;
  advance(contentId: unknown): void;
  reset(): void;
}

interface UseViewingStatusOptions {
  readonly storage?: StorageLike | null;
}

/**
 * Encapsula el progreso del navegador. La lectura ocurre tras montar para que
 * el HTML de Astro no dependa de `localStorage` durante el render del servidor.
 */
export function useViewingStatus(
  knownContentIds: readonly string[],
  options: UseViewingStatusOptions = {},
): ViewingStatusController {
  const [statuses, setStatuses] = useState<ViewingStatuses>(createEmptyViewingStatuses);
  const [isHydrated, setIsHydrated] = useState(false);
  const storage = options.storage ?? getBrowserStorage();
  const catalogKey = knownContentIds.join('\u0000');

  useEffect(() => {
    setStatuses(readViewingStatuses(storage, knownContentIds));
    setIsHydrated(true);
  }, [catalogKey, storage]);

  const advance = useCallback(
    (contentId: unknown) => {
      setStatuses((currentStatuses) => {
        const nextStatuses = advanceViewingStatus(currentStatuses, contentId);

        if (nextStatuses !== currentStatuses) {
          writeViewingStatuses(storage, nextStatuses);
        }

        return nextStatuses;
      });
    },
    [storage],
  );

  const reset = useCallback(() => {
    setStatuses((currentStatuses) => resetViewingStatuses(currentStatuses));
    clearViewingStatuses(storage);
  }, [storage]);

  const getStatus = useCallback(
    (contentId: unknown) => getViewingStatus(statuses, contentId),
    [statuses],
  );

  return { statuses, isHydrated, getStatus, advance, reset };
}

function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

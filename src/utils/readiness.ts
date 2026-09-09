/** A minimal item contract that lets any route provide preparation progress. */
export interface ReadinessItem {
  id: string;
  status: unknown;
}

export interface ReadinessSummaryData {
  total: number;
  completed: number;
  pending: number;
  percentage: number;
  isReady: boolean;
}

const WATCHED_STATUS = 'watched';

/**
 * Derives the preparation state without mutating the source route or tying it
 * to a persistence mechanism. The first instance of an id wins because a
 * calendar item represents one required viewing regardless of duplicate data.
 */
export function getReadinessSummary(items: readonly ReadinessItem[]): ReadinessSummaryData {
  const itemById = new Map<string, ReadinessItem>();

  items.forEach((item) => {
    if (item.id.trim().length > 0 && !itemById.has(item.id)) {
      itemById.set(item.id, item);
    }
  });

  const total = itemById.size;
  const completed = [...itemById.values()].filter((item) => item.status === WATCHED_STATUS).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    percentage,
    isReady: total > 0 && pending === 0,
  };
}

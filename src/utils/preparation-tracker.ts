import type { ContentType, PreparationRouteItem } from './preparation-route';
import { getViewingStatus, type ViewingStatuses, type ViewingStatus } from './progress/viewing-status';

export type PreparationFilter = 'all' | ContentType | ViewingStatus;
export type PreparationSort = 'scheduled-date' | 'title';

const preparationFilters: readonly PreparationFilter[] = [
  'all', 'unseen', 'watching', 'watched', 'movie', 'series',
];

/** Narrows a select value so a manipulated DOM value falls back to the full route. */
export function parsePreparationFilter(value: unknown): PreparationFilter {
  return typeof value === 'string' && isPreparationFilter(value)
    ? value
    : 'all';
}

/** Narrows a select value so an unknown sort keeps the chronological route. */
export function parsePreparationSort(value: unknown): PreparationSort {
  return value === 'title' ? 'title' : 'scheduled-date';
}

function isPreparationFilter(value: string): value is PreparationFilter {
  return preparationFilters.some((filter) => filter === value);
}

/**
 * Deriva una lista visible sin alterar la ruta editorial. El estado solo sirve
 * para filtrar: la fecha programada sigue siendo la fuente del orden semanal.
 */
export function getVisiblePreparationItems(
  items: readonly PreparationRouteItem[],
  statuses: ViewingStatuses,
  filter: PreparationFilter,
  sort: PreparationSort,
): PreparationRouteItem[] {
  const filteredItems = items.filter((item) => matchesFilter(item, statuses, filter));

  return [...filteredItems].sort((left, right) => {
    if (sort === 'title') {
      return left.title.localeCompare(right.title, 'es');
    }

    return left.scheduledDate.localeCompare(right.scheduledDate);
  });
}

function matchesFilter(
  item: PreparationRouteItem,
  statuses: ViewingStatuses,
  filter: PreparationFilter,
): boolean {
  if (filter === 'all') {
    return true;
  }

  if (filter === 'movie' || filter === 'series') {
    return item.type === filter;
  }

  return getViewingStatus(statuses, item.id) === filter;
}

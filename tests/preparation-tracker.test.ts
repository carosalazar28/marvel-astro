import { describe, expect, it } from 'vitest';
import type { PreparationRouteItem } from '../src/utils/preparation-route';
import {
  getVisiblePreparationItems,
  parsePreparationFilter,
  parsePreparationSort,
} from '../src/utils/preparation-tracker';

const items: PreparationRouteItem[] = [
  { id: 'zeta', title: 'Zeta', type: 'movie', scheduledDate: '2026-11-04', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'alpha', title: 'Alpha', type: 'series', scheduledDate: '2026-10-28', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'beta', title: 'Beta', type: 'movie', scheduledDate: '2026-11-11', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
];

describe('getVisiblePreparationItems', () => {
  it('convierte valores de control inválidos en alternativas seguras', () => {
    expect(parsePreparationFilter('movie')).toBe('movie');
    expect(parsePreparationFilter('phase')).toBe('all');
    expect(parsePreparationFilter(null)).toBe('all');
    expect(parsePreparationSort('title')).toBe('title');
    expect(parsePreparationSort('phase')).toBe('scheduled-date');
  });

  it('mantiene todos los ítems y los ordena por fecha sin mutar la ruta', () => {
    const visible = getVisiblePreparationItems(items, {}, 'all', 'scheduled-date');

    expect(visible.map((item) => item.id)).toEqual(['alpha', 'zeta', 'beta']);
    expect(items.map((item) => item.id)).toEqual(['zeta', 'alpha', 'beta']);
  });

  it('filtra por tipo y por cada estado local', () => {
    const statuses = { zeta: 'watching', alpha: 'watched' } as const;

    expect(getVisiblePreparationItems(items, statuses, 'movie', 'scheduled-date').map((item) => item.id)).toEqual(['zeta', 'beta']);
    expect(getVisiblePreparationItems(items, statuses, 'series', 'scheduled-date').map((item) => item.id)).toEqual(['alpha']);
    expect(getVisiblePreparationItems(items, statuses, 'unseen', 'scheduled-date').map((item) => item.id)).toEqual(['beta']);
    expect(getVisiblePreparationItems(items, statuses, 'watching', 'scheduled-date').map((item) => item.id)).toEqual(['zeta']);
    expect(getVisiblePreparationItems(items, statuses, 'watched', 'scheduled-date').map((item) => item.id)).toEqual(['alpha']);
  });

  it('ordena alfabéticamente cuando se solicita título', () => {
    expect(getVisiblePreparationItems(items, {}, 'all', 'title').map((item) => item.id)).toEqual(['alpha', 'beta', 'zeta']);
  });
});

import { describe, expect, it } from 'vitest';
import type { PreparationRouteItem } from '../src/utils/preparation-route';
import { addCalendarMonths, createCalendarDays, getUpcomingPreparationItems } from '../src/utils/monthly-calendar';

const items: PreparationRouteItem[] = [
  { id: 'a', title: 'Alpha', type: 'movie', scheduledDate: '2026-10-03', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'b', title: 'Beta', type: 'series', scheduledDate: '2026-10-03', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'c', title: 'Gamma', type: 'movie', scheduledDate: '2026-11-01', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
];

describe('monthly calendar utilities', () => {
  it('crea una cuadrícula completa de lunes a domingo e identifica los días del mes', () => {
    const days = createCalendarDays(new Date('2026-10-15T00:00:00.000Z'));

    expect(days).toHaveLength(35);
    expect(days[0]).toMatchObject({ date: '2026-09-28', isCurrentMonth: false });
    expect(days.find((day) => day.date === '2026-10-01')).toMatchObject({ isCurrentMonth: true, dayNumber: 1 });
    expect(days.at(-1)).toMatchObject({ date: '2026-11-01', isCurrentMonth: false });
  });

  it('navega meses incluso al cruzar un año', () => {
    expect(addCalendarMonths(new Date('2026-12-01T00:00:00.000Z'), 1).toISOString()).toBe('2027-01-01T00:00:00.000Z');
    expect(addCalendarMonths(new Date('2026-01-01T00:00:00.000Z'), -1).toISOString()).toBe('2025-12-01T00:00:00.000Z');
  });

  it('prioriza los próximos ítems cronológicos e ignora los ya pasados', () => {
    expect(getUpcomingPreparationItems(items, '2026-10-03').map((item) => item.id)).toEqual(['a', 'b', 'c']);
    expect(getUpcomingPreparationItems(items, '2026-10-04').map((item) => item.id)).toEqual(['c']);
    expect(getUpcomingPreparationItems(items, 'not-a-date')).toEqual([]);
  });
});

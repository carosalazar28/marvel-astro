import type { PreparationRouteItem } from './preparation-route';

export interface CalendarDay {
  readonly date: string;
  readonly dayNumber: number;
  readonly isCurrentMonth: boolean;
}

/** Builds Monday-first calendar cells in UTC so local time zones cannot shift a scheduled day. */
export function createCalendarDays(month: Date): CalendarDay[] {
  const year = month.getUTCFullYear();
  const monthIndex = month.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, monthIndex, 1));
  const mondayOffset = (firstDay.getUTCDay() + 6) % 7;
  const currentMonthDays = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const totalDays = Math.ceil((mondayOffset + currentMonthDays) / 7) * 7;
  const start = new Date(Date.UTC(year, monthIndex, 1 - mondayOffset));

  return Array.from({ length: totalDays }, (_, index) => {
    const day = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate() + index));

    return {
      date: toIsoDate(day),
      dayNumber: day.getUTCDate(),
      isCurrentMonth: day.getUTCMonth() === monthIndex,
    };
  });
}

/** Returns the first day of a neighboring month without retaining a potentially invalid day number. */
export function addCalendarMonths(month: Date, offset: number): Date {
  return new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + offset, 1));
}

/** Returns chronological items from a valid selected day onward without changing the editorial route. */
export function getUpcomingPreparationItems(
  items: readonly PreparationRouteItem[],
  fromDate: string,
): PreparationRouteItem[] {
  if (!isIsoDate(fromDate)) {
    return [];
  }

  return [...items]
    .filter((item) => item.scheduledDate >= fromDate)
    .sort((left, right) => left.scheduledDate.localeCompare(right.scheduledDate));
}

export function formatCalendarMonth(month: Date): string {
  return new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(month)
    .replace(/^./, (letter) => letter.toUpperCase());
}

export function formatCalendarDay(date: string): string {
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00.000Z`));
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(value);
}

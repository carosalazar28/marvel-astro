export type ContentType = 'movie' | 'series';
export type InitialStatus = 'unwatched' | 'watched';

export interface PreparationRouteItem {
  id: string;
  title: string;
  type: ContentType;
  scheduledDate: string;
  initialStatus: InitialStatus;
  reason: string;
  isOverdue: boolean;
}

export interface PreparationRouteResult {
  items: PreparationRouteItem[];
  issues: string[];
}

/**
 * Converts the manually versioned route into UI-safe data. Invalid entries are
 * isolated so an editorial mistake cannot make the preparation plan unusable.
 */
export function parsePreparationRoute(value: unknown, now: Date): PreparationRouteResult {
  if (!Array.isArray(value)) {
    return { items: [], issues: ['La ruta de preparación debe ser una lista.'] };
  }

  const seenIds = new Set<string>();
  const items: PreparationRouteItem[] = [];
  const issues: string[] = [];

  value.forEach((entry, index) => {
    const position = index + 1;

    if (!isRecord(entry)) {
      issues.push(`La entrada ${position} no es un objeto válido.`);
      return;
    }

    if (!isNonEmptyString(entry.id) || !isNonEmptyString(entry.title)) {
      issues.push(`La entrada ${position} tiene un id o título inválido.`);
      return;
    }

    if (seenIds.has(entry.id)) {
      issues.push(`La entrada ${position} repite el id "${entry.id}".`);
      return;
    }

    if (!isContentType(entry.type)) {
      issues.push(`La entrada ${position} tiene un tipo inválido.`);
      return;
    }

    if (!isIsoDate(entry.scheduledDate)) {
      issues.push(`La entrada ${position} tiene una fecha programada inválida.`);
      return;
    }

    if (!isInitialStatus(entry.initialStatus)) {
      issues.push(`La entrada ${position} tiene un estado inicial inválido.`);
      return;
    }

    if (!isNonEmptyString(entry.reason)) {
      issues.push(`La entrada ${position} tiene una razón de relevancia inválida.`);
      return;
    }

    seenIds.add(entry.id);
    items.push({
      id: entry.id,
      title: entry.title,
      type: entry.type,
      scheduledDate: entry.scheduledDate,
      initialStatus: entry.initialStatus,
      reason: entry.reason,
      isOverdue: entry.initialStatus === 'unwatched' && isPastScheduledDate(entry.scheduledDate, now),
    });
  });

  return { items: items.sort((left, right) => left.scheduledDate.localeCompare(right.scheduledDate)), issues };
}

export function formatScheduledDate(value: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isContentType(value: unknown): value is ContentType {
  return value === 'movie' || value === 'series';
}

function isInitialStatus(value: unknown): value is InitialStatus {
  return value === 'unwatched' || value === 'watched';
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().startsWith(value);
}

function isPastScheduledDate(scheduledDate: string, now: Date): boolean {
  const today = now.toISOString().slice(0, 10);
  return scheduledDate < today;
}

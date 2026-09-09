import { useMemo, useState } from 'react';
import { useViewingStatus } from '../hooks/useViewingStatus';
import type { PreparationRouteItem } from '../utils/preparation-route';
import {
  getVisiblePreparationItems,
  parsePreparationFilter,
  parsePreparationSort,
  type PreparationFilter,
  type PreparationSort,
} from '../utils/preparation-tracker';
import PreparationRoute from './PreparationRoute';
import ReadinessSummary from './ReadinessSummary';
import MonthlyCalendar from './MonthlyCalendar';
import '../styles/preparation-tracker.css';

interface PreparationTrackerProps {
  readonly items: readonly PreparationRouteItem[];
  readonly issues: readonly string[];
}

/**
 * Connects the immutable editorial route to the browser-only viewing state.
 * It owns filtering and controls while the route and readiness components stay
 * presentational and reusable.
 */
export default function PreparationTracker({ items, issues }: PreparationTrackerProps) {
  const [filter, setFilter] = useState<PreparationFilter>('all');
  const [sort, setSort] = useState<PreparationSort>('scheduled-date');
  const [activeView, setActiveView] = useState<'route' | 'calendar'>('route');
  const knownContentIds = useMemo(() => items.map((item) => item.id), [items]);
  const { statuses, isHydrated, getStatus, advance, reset } = useViewingStatus(knownContentIds);
  const visibleItems = useMemo(
    () => getVisiblePreparationItems(items, statuses, filter, sort),
    [filter, items, sort, statuses],
  );
  const readinessItems = useMemo(
    () => items.map((item) => ({ id: item.id, status: getStatus(item.id) })),
    [getStatus, items],
  );

  return (
    <section className="preparation-tracker" aria-label="Tracker de preparación">
      <ReadinessSummary items={readinessItems} />

      <nav className="preparation-tracker__tabs" aria-label="Vistas del tracker">
        <button className="preparation-tracker__tab" type="button" aria-pressed={activeView === 'route'} onClick={() => setActiveView('route')}>Películas</button>
        <button className="preparation-tracker__tab" type="button" aria-pressed={activeView === 'calendar'} onClick={() => setActiveView('calendar')}>Calendario</button>
      </nav>
      <div className="preparation-tracker__content" data-active-view={activeView}>
      <div className="preparation-tracker__route">
      <div className="preparation-tracker__controls" aria-label="Controles de la ruta">
        <label>
          Filtrar ruta
          <select value={filter} onChange={(event) => setFilter(parsePreparationFilter(event.target.value))}>
            <option value="all">Todo el contenido</option>
            <option value="unseen">Sin ver</option>
            <option value="watching">Viendo</option>
            <option value="watched">Vista</option>
            <option value="movie">Películas</option>
            <option value="series">Series</option>
          </select>
        </label>
        <label>
          Ordenar ruta
          <select value={sort} onChange={(event) => setSort(parsePreparationSort(event.target.value))}>
            <option value="scheduled-date">Fecha programada</option>
            <option value="title">Título</option>
          </select>
        </label>
        <button type="button" onClick={reset} disabled={!isHydrated}>Reiniciar progreso local</button>
      </div>

      <p className="preparation-tracker__result-count" aria-live="polite">
        {visibleItems.length} de {items.length} contenidos visibles
      </p>
      <PreparationRoute
        items={visibleItems}
        issues={issues}
        getStatus={getStatus}
        onAdvance={advance}
        isHydrated={isHydrated}
        emptyMessage={items.length > 0 ? 'No hay contenido que coincida con los filtros seleccionados.' : undefined}
      />
      </div>
      <div className="preparation-tracker__calendar">
      <MonthlyCalendar items={items} getStatus={getStatus} />
      </div>
      </div>
    </section>
  );
}

import { useMemo, useState } from 'react';
import type { ViewingStatus } from '../utils/progress/viewing-status';
import type { PreparationRouteItem } from '../utils/preparation-route';
import {
  addCalendarMonths,
  createCalendarDays,
  formatCalendarDay,
  formatCalendarMonth,
  getUpcomingPreparationItems,
  toIsoDate,
} from '../utils/monthly-calendar';
import '../styles/monthly-calendar.css';

interface MonthlyCalendarProps {
  readonly items: readonly PreparationRouteItem[];
  readonly getStatus: (contentId: string) => ViewingStatus;
  readonly today?: Date;
}

const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] as const;
const statusLabels: Readonly<Record<ViewingStatus, string>> = {
  unseen: 'Sin ver',
  watching: 'Viendo',
  watched: 'Vista',
};

/** Shows the route in a navigable monthly grid while keeping progress owned by its parent. */
export default function MonthlyCalendar({ items, getStatus, today = new Date() }: MonthlyCalendarProps) {
  const initialMonth = useMemo(() => new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)), [today]);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(toIsoDate(today));
  const days = useMemo(() => createCalendarDays(month), [month]);
  const selectedItems = items.filter((item) => item.scheduledDate === selectedDate);
  const upcomingItems = getUpcomingPreparationItems(items, selectedDate);

  function moveMonth(offset: number): void {
    const nextMonth = addCalendarMonths(month, offset);
    setMonth(nextMonth);
    setSelectedDate(toIsoDate(nextMonth));
  }

  return (
    <section className="monthly-calendar" aria-labelledby="monthly-calendar-title">
      <div className="monthly-calendar__heading">
        <p className="monthly-calendar__eyebrow">Calendario</p>
        <h2 id="monthly-calendar-title">Tu preparación mensual</h2>
      </div>
      <div className="monthly-calendar__navigation">
        <button type="button" onClick={() => moveMonth(-1)} aria-label="Mes anterior">←</button>
        <h3>{formatCalendarMonth(month)}</h3>
        <button type="button" onClick={() => moveMonth(1)} aria-label="Mes siguiente">→</button>
      </div>
      <div className="monthly-calendar__grid" aria-label={`Calendario de ${formatCalendarMonth(month)}`}>
        {weekdayLabels.map((label) => <span className="monthly-calendar__weekday" key={label}>{label}</span>)}
        {days.map((day) => {
          const dayItems = items.filter((item) => item.scheduledDate === day.date);
          const contentLabel = dayItems.length === 0
            ? 'sin contenido'
            : `${dayItems.length} contenido${dayItems.length === 1 ? '' : 's'}: ${dayItems.map((item) => `${item.title}, ${statusLabels[getStatus(item.id)]}`).join('; ')}`;

          return (
            <button
              className="monthly-calendar__day"
              data-current-month={day.isCurrentMonth}
              type="button"
              key={day.date}
              aria-pressed={day.date === selectedDate}
              aria-label={`${formatCalendarDay(day.date)} — ${contentLabel}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <span>{day.dayNumber}</span>
              {dayItems.length > 0 ? <span className="monthly-calendar__content-count">{dayItems.length} contenido{dayItems.length === 1 ? '' : 's'}</span> : null}
            </button>
          );
        })}
      </div>
      <div className="monthly-calendar__details" aria-live="polite">
        <h3>Contenido del {formatCalendarDay(selectedDate)}</h3>
        {selectedItems.length === 0 ? <p>No hay contenido programado para este día.</p> : (
          <ul>{selectedItems.map((item) => <li key={item.id}>{item.title} · {statusLabels[getStatus(item.id)]}</li>)}</ul>
        )}
      </div>
      <aside className="monthly-calendar__upcoming" aria-label="Próximas visualizaciones">
        <h3>Próximas visualizaciones</h3>
        {upcomingItems.length === 0 ? <p>No hay próximos contenidos en la ruta.</p> : (
          <ol>{upcomingItems.slice(0, 3).map((item, index) => <li key={item.id}>{index === 0 ? 'Próximo paso: ' : ''}{item.title}</li>)}</ol>
        )}
      </aside>
    </section>
  );
}

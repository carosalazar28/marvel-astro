import { formatScheduledDate, type PreparationRouteItem } from '../utils/preparation-route';
import '../styles/preparation-route.css';

interface PreparationRouteProps {
  items: PreparationRouteItem[];
  issues: string[];
}

const typeLabel = {
  movie: 'Película',
  series: 'Serie',
} as const;

/** Presents the read-only editorial route; state transitions arrive in US-03. */
export default function PreparationRoute({ items, issues }: PreparationRouteProps) {
  return (
    <section className="preparation-route" aria-labelledby="preparation-route-title">
      <div className="preparation-route__heading">
        <p className="preparation-route__eyebrow">Plan de visionado</p>
        <h2 id="preparation-route-title">Tu ruta de preparación</h2>
        <p>Una película o serie completa por semana para llegar lista al estreno.</p>
      </div>

      {issues.length > 0 ? (
        <p className="preparation-route__validation" role="alert">
          {issues.length} {issues.length === 1 ? 'entrada del catálogo no se pudo mostrar.' : 'entradas del catálogo no se pudieron mostrar.'}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="preparation-route__empty">Aún no hay contenido programado para esta ruta.</p>
      ) : (
        <ol className="preparation-route__list">
          {items.map((item) => (
            <li className="preparation-route__item" key={item.id}>
              <article className="preparation-card">
                <div className="preparation-card__meta">
                  <span>{typeLabel[item.type]}</span>
                  <span aria-label="Estado inicial">Sin ver</span>
                  {item.isOverdue ? <span className="preparation-card__overdue">Atrasada</span> : null}
                </div>
                <h3>{item.title}</h3>
                <p className="preparation-card__date">
                  Programada para <time dateTime={item.scheduledDate} aria-label={`Programada para ${formatScheduledDate(item.scheduledDate)}`}>{formatScheduledDate(item.scheduledDate)}</time>
                </p>
                <p className="preparation-card__reason"><strong>Por qué verla:</strong> {item.reason}</p>
              </article>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

import { formatScheduledDate, type PreparationRouteItem } from '../utils/preparation-route';
import type { ViewingStatus } from '../utils/progress/viewing-status';
import '../styles/preparation-route.css';

interface PreparationRouteProps {
  readonly items: readonly PreparationRouteItem[];
  readonly issues: readonly string[];
  readonly getStatus?: (contentId: string) => ViewingStatus;
  readonly onAdvance?: (contentId: string) => void;
  readonly isHydrated?: boolean;
  readonly emptyMessage?: string;
}

const typeLabel = {
  movie: 'Película',
  series: 'Serie',
} as const;

const statusLabel: Readonly<Record<ViewingStatus, string>> = {
  unseen: 'Sin ver',
  watching: 'Viendo',
  watched: 'Vista',
};

function getNextActionLabel(status: ViewingStatus): string {
  if (status === 'unseen') {
    return 'Marcar como viendo';
  }

  return status === 'watching' ? 'Marcar como vista' : 'Vista';
}

interface PreparationCardProps {
  readonly item: PreparationRouteItem;
  readonly status: ViewingStatus;
  readonly isInteractive: boolean;
  readonly isHydrated: boolean;
  readonly onAdvance?: (contentId: string) => void;
}

function PreparationCard({ item, status, isInteractive, isHydrated, onAdvance }: PreparationCardProps) {
  return (
    <article className="preparation-card">
      <div className="preparation-card__meta">
        <span>{typeLabel[item.type]}</span>
        <span aria-label={`Estado: ${statusLabel[status]}`}>{statusLabel[status]}</span>
        {item.isOverdue ? <span className="preparation-card__overdue">Atrasada</span> : null}
      </div>
      <h3>{item.title}</h3>
      <p className="preparation-card__date">
        Programada para <time dateTime={item.scheduledDate} aria-label={`Programada para ${formatScheduledDate(item.scheduledDate)}`}>{formatScheduledDate(item.scheduledDate)}</time>
      </p>
      <p className="preparation-card__reason"><strong>Por qué verla:</strong> {item.reason}</p>
      {isInteractive ? (
        <button
          className="preparation-card__status-action"
          type="button"
          onClick={() => onAdvance?.(item.id)}
          disabled={!isHydrated || status === 'watched'}
          aria-label={`Cambiar estado de ${item.title}: ${statusLabel[status]}`}
        >
          {getNextActionLabel(status)}
        </button>
      ) : null}
    </article>
  );
}

/** Presents the editorial route and optionally exposes browser-owned progress controls. */
export default function PreparationRoute({ items, issues, getStatus, onAdvance, isHydrated = true, emptyMessage }: PreparationRouteProps) {
  const isInteractive = getStatus !== undefined && onAdvance !== undefined;

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
        <p className="preparation-route__empty">{emptyMessage ?? 'Aún no hay contenido programado para esta ruta.'}</p>
      ) : (
        <ol className="preparation-route__list">
          {items.map((item) => (
            <li className="preparation-route__item" key={item.id}>
              <PreparationCard
                item={item}
                status={getStatus?.(item.id) ?? 'unseen'}
                isInteractive={isInteractive}
                isHydrated={isHydrated}
                onAdvance={onAdvance}
              />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

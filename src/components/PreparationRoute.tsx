import { formatScheduledDate, type PreparationRouteItem } from '../utils/preparation-route';
import type { ViewingStatus } from '../utils/progress/viewing-status';
import artworkSheet from '../assets/preparation-artwork-v1.jpg';
import ironManArtwork from '../assets/preparation/iron-man.jpg';
import incredibleHulkArtwork from '../assets/preparation/the-incredible-hulk.jpg';
import ironManTwoArtwork from '../assets/preparation/iron-man-2.jpg';
import thorArtwork from '../assets/preparation/thor.jpg';
import captainAmericaArtwork from '../assets/preparation/captain-america-the-first-avenger.jpg';
import avengersArtwork from '../assets/preparation/the-avengers.jpg';
import ironManThreeArtwork from '../assets/preparation/iron-man-3.jpg';
import thorDarkWorldArtwork from '../assets/preparation/thor-the-dark-world.jpg';
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

const artworkPosition: Readonly<Record<string, string>> = {
  'iron-man': '0% 0%',
  'captain-america-first-avenger': '33.333% 0%',
  'the-avengers': '66.667% 0%',
  'avengers-infinity-war': '100% 0%',
  'avengers-endgame': '0% 100%',
  'loki-season-one': '33.333% 100%',
  'doctor-strange-multiverse-of-madness': '66.667% 100%',
  'fantastic-four-first-steps': '100% 100%',
};

type ArtworkAsset = string | { readonly src: string };

const individualArtwork: Readonly<Record<string, ArtworkAsset>> = {
  'iron-man': ironManArtwork,
  'the-incredible-hulk': incredibleHulkArtwork,
  'iron-man-2': ironManTwoArtwork,
  thor: thorArtwork,
  'captain-america-the-first-avenger': captainAmericaArtwork,
  'the-avengers': avengersArtwork,
  'iron-man-3': ironManThreeArtwork,
  'thor-the-dark-world': thorDarkWorldArtwork,
};

/** Returns the stable focus target used to navigate from the monthly calendar. */
export function getPreparationCardId(contentId: string): string {
  return `preparation-card-${contentId}`;
}

/** Normalizes Vite's test string and Astro's processed-image metadata. */
export function resolveAssetUrl(asset: string | { readonly src: string }): string {
  return typeof asset === 'string' ? asset : asset.src;
}

/** Uses individual generated art when available and preserves the legacy sheet as a safe fallback. */
export function getArtworkStyle(contentId: string): { readonly backgroundImage: string; readonly backgroundPosition: string; readonly backgroundSize: string } {
  const artwork = individualArtwork[contentId];

  if (artwork) {
    return {
      backgroundImage: `url(${resolveAssetUrl(artwork)})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
  }

  return {
    backgroundImage: `url(${resolveAssetUrl(artworkSheet)})`,
    backgroundPosition: artworkPosition[contentId] ?? '0% 0%',
    backgroundSize: '400% 200%',
  };
}

function getNextActionLabel(status: ViewingStatus): string {
  if (status === 'unseen') {
    return 'Marcar como viendo';
  }

  return status === 'watching' ? 'Marcar como vista' : 'Marcar como sin ver';
}

interface PreparationCardProps {
  readonly item: PreparationRouteItem;
  readonly status: ViewingStatus;
  readonly isInteractive: boolean;
  readonly isHydrated: boolean;
  readonly onAdvance?: (contentId: string) => void;
}

function PreparationCard({ item, status, isInteractive, isHydrated, onAdvance }: PreparationCardProps) {
  const artworkStyle = getArtworkStyle(item.id);

  return (
    <article className="preparation-card" id={getPreparationCardId(item.id)} tabIndex={-1}>
      <div className="preparation-card__artwork" aria-hidden="true" style={artworkStyle} />
      <div className="preparation-card__content">
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
          disabled={!isHydrated}
          aria-label={`Cambiar estado de ${item.title}: ${statusLabel[status]}`}
        >
          {getNextActionLabel(status)}
        </button>
      ) : null}
      </div>
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
        <p>Una película cada sábado y, cuando el plan lo indica, otra el domingo para llegar lista al estreno.</p>
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

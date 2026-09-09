import { getReadinessSummary, type ReadinessItem } from '../utils/readiness';
import '../styles/readiness-summary.css';

interface ReadinessSummaryProps {
  items: readonly ReadinessItem[];
}

function getCompletionLabel(completed: number): string {
  return `${completed} completada${completed === 1 ? '' : 's'}`;
}

function getReadinessMessage(total: number, pending: number, isReady: boolean): string {
  if (total === 0) {
    return 'Aún no hay películas en tu ruta de preparación.';
  }

  if (isReady) {
    return '¡Estás lista para el estreno!';
  }

  return pending === 1
    ? 'Te falta 1 película para estar lista.'
    : `Te faltan ${pending} películas para estar lista.`;
}

/** Presents preparation without owning the movie route or local persistence. */
export default function ReadinessSummary({ items }: ReadinessSummaryProps) {
  const { total, completed, pending, percentage, isReady } = getReadinessSummary(items);
  const message = getReadinessMessage(total, pending, isReady);

  return (
    <section className="readiness-summary" aria-labelledby="readiness-summary-title">
      <div className="readiness-summary__header">
        <p className="readiness-summary__eyebrow">Preparación</p>
        <h2 id="readiness-summary-title">Tu avance hacia el estreno</h2>
      </div>
      <div className="readiness-summary__content">
        <p className="readiness-summary__percentage" aria-hidden="true">{percentage}%</p>
        <div className="readiness-summary__progress-group">
          <progress
            className="readiness-summary__progress"
            aria-label={`Progreso de preparación: ${percentage}%`}
            value={percentage}
            max="100"
          />
          <p className="readiness-summary__counts">{getCompletionLabel(completed)} · {pending} pendientes</p>
        </div>
      </div>
      <p className="readiness-summary__message" role={isReady ? 'status' : undefined}>{message}</p>
    </section>
  );
}

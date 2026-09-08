import React from 'react';
import '../styles/movie-card.css';

interface Movie {
  week: number;
  dateRange: string;
  startDate: string;
  endDate: string;
  title: string;
  year: string;
  phase: number;
}

interface MovieCardProps {
  movie: Movie;
  isWatched?: boolean;
  onToggleWatched?: (movie: Movie) => void;
}

export default function MovieCard({ movie, isWatched = false, onToggleWatched }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getPhaseColor = (phase: number) => {
    const colors = {
      1: 'bg-green-500',
      2: 'bg-blue-500', 
      3: 'bg-purple-500',
      4: 'bg-orange-500',
      5: 'bg-red-500'
    };
    return colors[phase as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className={`movie-card ${isWatched ? 'movie-card--watched' : ''}`}>
      <div className="movie-card__header">
        <div className="movie-card__week">
          <span className="movie-card__week-number">Semana {movie.week}</span>
          <span className="movie-card__date-range">{movie.dateRange}</span>
        </div>
        <div className={`movie-card__phase ${getPhaseColor(movie.phase)}`}>
          Fase {movie.phase}
        </div>
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{movie.year}</span>
          <span className="movie-card__dates">
            {formatDate(movie.startDate)} - {formatDate(movie.endDate)}
          </span>
        </div>
      </div>

      <div className="movie-card__actions">
        <button 
          className={`movie-card__checkbox ${isWatched ? 'movie-card__checkbox--checked' : ''}`}
          onClick={() => onToggleWatched?.(movie)}
          aria-label={`Marcar ${movie.title} como ${isWatched ? 'no vista' : 'vista'}`}
        >
          <span className="movie-card__checkbox-icon">
            {isWatched ? '✓' : ''}
          </span>
          <span className="movie-card__checkbox-text">
            {isWatched ? 'Vista' : 'Por ver'}
          </span>
        </button>
      </div>
    </div>
  );
}

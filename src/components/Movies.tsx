import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/movies.css';

interface Movie {
  week: number;
  dateRange: string;
  startDate: string;
  endDate: string;
  title: string;
  year: string;
  phase: number;
}

interface MoviesProps {
  movies: Movie[];
}

export default function Movies({ movies }: MoviesProps) {
  const [watchedMovies, setWatchedMovies] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'watched' | 'unwatched'>('all');
  const [sortBy, setSortBy] = useState<'week' | 'title' | 'phase'>('week');

  // Load watched movies from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watched-movies');
    if (saved) {
      setWatchedMovies(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save watched movies to localStorage
  useEffect(() => {
    localStorage.setItem('watched-movies', JSON.stringify(Array.from(watchedMovies)));
  }, [watchedMovies]);

  const handleToggleWatched = (movie: Movie) => {
    const movieKey = `${movie.week}-${movie.title}`;
    setWatchedMovies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(movieKey)) {
        newSet.delete(movieKey);
      } else {
        newSet.add(movieKey);
      }
      return newSet;
    });
  };

  const isWatched = (movie: Movie) => {
    const movieKey = `${movie.week}-${movie.title}`;
    return watchedMovies.has(movieKey);
  };

  const getFilteredAndSortedMovies = () => {
    let filtered = movies;

    // Apply filter
    if (filter === 'watched') {
      filtered = movies.filter(movie => isWatched(movie));
    } else if (filter === 'unwatched') {
      filtered = movies.filter(movie => !isWatched(movie));
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'phase':
          return a.phase - b.phase;
        case 'week':
        default:
          return a.week - b.week;
      }
    });

    return sorted;
  };

  const getStats = () => {
    const watched = movies.filter(movie => isWatched(movie)).length;
    const total = movies.length;
    const percentage = total > 0 ? Math.round((watched / total) * 100) : 0;
    
    return { watched, total, percentage };
  };

  const stats = getStats();
  const filteredMovies = getFilteredAndSortedMovies();

  return (
    <div className="movies">
      <div className="movies__header">
        <h2 className="movies__title">Plan Marvel 🦹🏽‍♀️🦸🏼‍♀️</h2>
        <p className="movies__description">🗓️ Calendario MCU – 1 película por semana</p>
        
        <div className="movies__stats">
          <div className="movies__stat">
            <span className="movies__stat-number">{stats.watched}</span>
            <span className="movies__stat-label">Vistas</span>
          </div>
          <div className="movies__stat">
            <span className="movies__stat-number">{stats.total}</span>
            <span className="movies__stat-label">Total</span>
          </div>
          <div className="movies__stat">
            <span className="movies__stat-number">{stats.percentage}%</span>
            <span className="movies__stat-label">Progreso</span>
          </div>
        </div>
      </div>

      <div className="movies__controls">
        <div className="movies__filters">
          <button 
            className={`movies__filter ${filter === 'all' ? 'movies__filter--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas ({movies.length})
          </button>
          <button 
            className={`movies__filter ${filter === 'watched' ? 'movies__filter--active' : ''}`}
            onClick={() => setFilter('watched')}
          >
            Vista ({stats.watched})
          </button>
          <button 
            className={`movies__filter ${filter === 'unwatched' ? 'movies__filter--active' : ''}`}
            onClick={() => setFilter('unwatched')}
          >
            Por ver ({stats.total - stats.watched})
          </button>
        </div>

        <div className="movies__sort">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'week' | 'title' | 'phase')}
            className="movies__sort-select"
          >
            <option value="week">Ordenar por Semana</option>
            <option value="title">Ordenar por Título</option>
            <option value="phase">Ordenar por Fase</option>
          </select>
        </div>
      </div>

      <div className="movies__list">
        {filteredMovies.length === 0 ? (
          <div className="movies__empty">
            <p>No hay películas para mostrar con los filtros actuales.</p>
          </div>
        ) : (
          filteredMovies.map(movie => (
            <MovieCard
              key={`${movie.week}-${movie.title}`}
              movie={movie}
              isWatched={isWatched(movie)}
              onToggleWatched={handleToggleWatched}
            />
          ))
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import CountdownItem from './atoms/CountdownItem';
import '../styles/countdown-base.css';
import '../styles/countdown-themes.css';

interface CountdownTimerProps {
  title: string;
  targetDate: string;
  subtitle?: string;
  isCurrent?: boolean;
  colorTheme?: 'green' | 'purple' | 'blue' | 'orange' | 'red';
}

export default function CountdownTimer({ title, targetDate, subtitle = "Tiempo para el estreno", isCurrent = false, colorTheme = 'blue' }: CountdownTimerProps) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className={`countdown countdown--${colorTheme} ${isCurrent ? 'countdown--current' : ''}`}>
      {isCurrent ? (
        <>
          <h2 className="countdown__title">
            {title}
          </h2>
          <p className="countdown__subtitle">{subtitle}</p>

          <div className="countdown__grid">
            <CountdownItem value={timeLeft.months} label="Meses" />
            <CountdownItem value={timeLeft.days} label="Días" />
            <CountdownItem value={timeLeft.hours} label="Horas" />
            <CountdownItem value={timeLeft.minutes} label="Minutos" />
            <CountdownItem value={timeLeft.seconds} label="Segundos" />
          </div>
        </>
      ) : (
        <div className="countdown__preview">
          <h3 className="countdown__preview-title">Próximo estreno</h3>
        </div>
      )}
    </div>
  );
}

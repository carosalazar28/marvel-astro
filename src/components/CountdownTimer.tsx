import { useEffect, useState } from 'react';
import { calculateTimeLeft, INITIAL_TIME_LEFT } from './countdown-time';
import '../styles/countdown.css';

interface CountdownTimerProps {
  title: string;
  targetDate: string;
  subtitle?: string;
  isCurrent?: boolean;
}

export default function CountdownTimer({ title, targetDate, subtitle = "Tiempo para el estreno", isCurrent = false }: CountdownTimerProps) {
  const targetDateTime = new Date(targetDate).getTime();
  // A stable zero state is rendered on server and client before hydration. Reading the
  // clock only in the effect prevents a one-second SSR/client mismatch.
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);

  useEffect(() => {
    if (!isCurrent) {
      return undefined;
    }

    const updateTimeLeft = () => {
      setTimeLeft(calculateTimeLeft(targetDateTime, Date.now()));
    };

    updateTimeLeft();
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [isCurrent, targetDateTime]);

  return (
    <div className={`countdown ${isCurrent ? 'countdown--current' : ''}`}>
      {isCurrent ? (
        <>
          <h2 className="countdown__title">
            {title}
          </h2>
          <p className="countdown__subtitle">{subtitle}</p>

          <div className="countdown__grid">
            <div className="countdown__item">
              <div className="countdown__value">
                {timeLeft.days}
              </div>
              <div className="countdown__label">Días</div>
            </div>

            <div className="countdown__item">
              <div className="countdown__value">
                {timeLeft.hours}
              </div>
              <div className="countdown__label">Horas</div>
            </div>

            <div className="countdown__item">
              <div className="countdown__value">
                {timeLeft.minutes}
              </div>
              <div className="countdown__label">Minutos</div>
            </div>

            <div className="countdown__item">
              <div className="countdown__value">
                {timeLeft.seconds}
              </div>
              <div className="countdown__label">Segundos</div>
            </div>
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

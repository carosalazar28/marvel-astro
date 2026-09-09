import { useEffect, useState } from 'react';
import { calculateTimeLeft, INITIAL_TIME_LEFT } from '../utils/countdown-time';
import '../styles/countdown.css';

interface CountdownTimerProps {
  title: string;
  targetDate: string;
  targetDateLabel?: string;
  subtitle?: string;
  isCurrent?: boolean;
}

type CountdownStatus = 'upcoming' | 'released' | 'invalid';

export default function CountdownTimer({ title, targetDate, targetDateLabel, subtitle = "Tiempo para el estreno", isCurrent = false }: CountdownTimerProps) {
  const targetDateTime = new Date(targetDate).getTime();
  // A stable zero state is rendered on server and client before hydration. Reading the
  // clock only in the effect prevents a one-second SSR/client mismatch.
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);
  const [status, setStatus] = useState<CountdownStatus>(Number.isFinite(targetDateTime) ? 'upcoming' : 'invalid');

  useEffect(() => {
    if (!isCurrent || status !== 'upcoming') {
      return undefined;
    }

    const updateTimeLeft = () => {
      if (targetDateTime <= Date.now()) {
        setStatus('released');
        return false;
      }
      setTimeLeft(calculateTimeLeft(targetDateTime, Date.now()));
      return true;
    };

    if (!updateTimeLeft()) {
      return undefined;
    }
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [isCurrent, status, targetDateTime]);

  return (
    <div className={`countdown ${isCurrent ? 'countdown--current' : ''}`}>
      {isCurrent ? (
        <>
          <h2 className="countdown__title">
            {title}
          </h2>
          {targetDateLabel ? <p className="countdown__date">Estreno: <time dateTime={targetDate}>{targetDateLabel}</time></p> : null}
          <p className="countdown__subtitle">{subtitle}</p>
          {status === 'released' ? <p className="countdown__released" role="status">Este estreno ya está disponible. Elige tu próxima meta de visionado.</p> : null}
          {status === 'invalid' ? <p className="countdown__error" role="alert">No podemos mostrar la cuenta regresiva para este estreno.</p> : null}
          {status === 'upcoming' ? <div className="countdown__grid">
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
          </div> : null}
        </>
      ) : (
        <div className="countdown__preview">
          <h3 className="countdown__preview-title">Próximo estreno</h3>
        </div>
      )}
    </div>
  );
}

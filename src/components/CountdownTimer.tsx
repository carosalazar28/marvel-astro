import { useState, useEffect } from 'react';
import '../styles/countdown.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  title: string;
  targetDate: string;
  subtitle?: string;
  isCurrent?: boolean;
}

export default function CountdownTimer({ title, targetDate, subtitle = "Tiempo para el estreno", isCurrent = false }: CountdownTimerProps) {
  const targetDateTime = new Date(targetDate).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDateTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

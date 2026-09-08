import { describe, expect, it } from 'vitest';
import { calculateTimeLeft, INITIAL_TIME_LEFT } from '../src/components/countdown-time';

describe('calculateTimeLeft', () => {
  const now = new Date('2026-01-01T00:00:00.000Z').getTime();

  it('descompone una fecha futura en días, horas, minutos y segundos', () => {
    const target = new Date('2026-01-03T02:03:04.000Z').getTime();

    expect(calculateTimeLeft(target, now)).toEqual({
      days: 2,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it('devuelve cero cuando el estreno ocurre exactamente ahora o ya pasó', () => {
    expect(calculateTimeLeft(now, now)).toEqual(INITIAL_TIME_LEFT);
    expect(calculateTimeLeft(now - 1, now)).toEqual(INITIAL_TIME_LEFT);
  });

  it('devuelve cero para una fecha de estreno inválida', () => {
    expect(calculateTimeLeft(Number.NaN, now)).toEqual(INITIAL_TIME_LEFT);
  });
});

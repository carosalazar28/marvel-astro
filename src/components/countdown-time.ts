export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const INITIAL_TIME_LEFT: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

/**
 * Converts a valid future premiere timestamp into the values displayed by the countdown.
 * Invalid and elapsed dates share the recoverable zero state so the UI never renders NaN
 * or a negative countdown.
 */
export function calculateTimeLeft(targetTime: number, now: number): TimeLeft {
  const difference = targetTime - now;

  if (!Number.isFinite(difference) || difference <= 0) {
    return INITIAL_TIME_LEFT;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

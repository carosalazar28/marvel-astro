// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import CountdownTimer from '../src/components/CountdownTimer';

describe('CountdownTimer', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('genera el mismo marcador inicial estable durante el render de servidor', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    const props = {
      title: 'Avengers: Doomsday',
      targetDate: '2026-01-03T02:03:04.000Z',
      isCurrent: true,
    };

    const firstMarkup = renderToString(<CountdownTimer {...props} />);
    vi.setSystemTime(new Date('2026-01-01T00:00:01.000Z'));
    const secondMarkup = renderToString(<CountdownTimer {...props} />);

    expect(firstMarkup).toBe(secondMarkup);
    expect(firstMarkup).toContain('>0<');
  });

  it('calcula el tiempo inmediatamente después de hidratar y lo actualiza cada segundo', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    render(
      <CountdownTimer
        title="Avengers: Doomsday"
        targetDate="2026-01-03T02:03:04.000Z"
        targetDateLabel="3 de enero de 2026"
        subtitle="Cuenta regresiva"
        isCurrent
      />,
    );

    expect(screen.getAllByText('2')).toHaveLength(2);
    expect(screen.getByText('Cuenta regresiva')).toBeTruthy();
    expect(screen.getByText('3 de enero de 2026')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(screen.getAllByText('3')).toHaveLength(2);
  });

  it('muestra una vista previa sin iniciar un temporizador para tarjetas no activas', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    render(
      <CountdownTimer
        title="Avengers: Doomsday"
        targetDate="invalid-date"
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Próximo estreno' })).toBeTruthy();
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it('libera el temporizador al desmontar la tarjeta activa', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const { unmount } = render(
      <CountdownTimer
        title="Avengers: Doomsday"
        targetDate="2026-01-03T02:03:04.000Z"
        isCurrent
      />,
    );

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });

  it('reemplaza el contador por un estado legible cuando el estreno ya ocurrió', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-03T00:00:00.000Z'));
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    render(
      <CountdownTimer
        title="Avengers: Doomsday"
        targetDate="2026-01-01T00:00:00.000Z"
        isCurrent
      />,
    );

    const releasedMessage = screen.getByRole('status');
    expect(releasedMessage.textContent).toContain('Este estreno ya está disponible');
    expect(releasedMessage.parentElement?.querySelector('.countdown__grid')).toBeNull();
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it('explica una fecha inválida sin iniciar un temporizador', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    render(
      <CountdownTimer
        title="Avengers: Doomsday"
        targetDate="fecha-inválida"
        isCurrent
      />,
    );

    expect(screen.getByRole('alert').textContent).toContain('No podemos mostrar la cuenta regresiva');
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });
});

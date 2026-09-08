// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SliderCountdown from '../src/components/SliderCountdown';

vi.mock('../src/components/CountdownTimer', () => ({
  default: ({ isCurrent, title }: { isCurrent: boolean; title: string }) => (
    <p data-testid={isCurrent ? 'current-premiere' : 'preview-premiere'}>{title}</p>
  ),
}));

const slides = [
  { id: 1, title: 'Avengers: Doomsday', targetDate: '2026-12-18T00:00:00' },
  { id: 2, title: 'Spider-Man: Brand New Day', targetDate: '2026-07-31T00:00:00' },
  { id: 3, title: 'The Fantastic Four: First Steps', targetDate: '2026-11-01T00:00:00' },
];

describe('SliderCountdown', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('navega por los estrenos con controles etiquetados en español y conserva el ciclo', async () => {
    const user = userEvent.setup();
    render(<SliderCountdown slides={slides} />);

    expect(screen.getByTestId('current-premiere').textContent).toBe('Avengers: Doomsday');

    await user.click(screen.getByRole('button', { name: 'Siguiente estreno' }));
    expect(screen.getByTestId('current-premiere').textContent).toBe('Spider-Man: Brand New Day');

    await user.click(screen.getByRole('button', { name: 'Ir al estreno 3' }));
    expect(screen.getByTestId('current-premiere').textContent).toBe('The Fantastic Four: First Steps');

    await user.click(screen.getByRole('button', { name: 'Siguiente estreno' }));
    expect(screen.getByTestId('current-premiere').textContent).toBe('Avengers: Doomsday');

    await user.click(screen.getByRole('button', { name: 'Estreno anterior' }));
    expect(screen.getByTestId('current-premiere').textContent).toBe('The Fantastic Four: First Steps');

    await user.click(screen.getByRole('button', { name: 'Estreno anterior' }));
    expect(screen.getByTestId('current-premiere').textContent).toBe('Spider-Man: Brand New Day');
  });
});

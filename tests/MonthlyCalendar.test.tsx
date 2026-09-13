// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MonthlyCalendar from '../src/components/MonthlyCalendar';
import type { PreparationRouteItem } from '../src/utils/preparation-route';

const items: PreparationRouteItem[] = [
  { id: 'iron-man', title: 'Iron Man', type: 'movie', scheduledDate: '2026-10-03', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'loki', title: 'Loki', type: 'series', scheduledDate: '2026-10-03', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
  { id: 'thor', title: 'Thor', type: 'movie', scheduledDate: '2026-11-01', initialStatus: 'unwatched', reason: 'x', isOverdue: false },
];

afterEach(cleanup);

describe('MonthlyCalendar', () => {
  it('permite navegar, seleccionar un día y leer su contenido y estado', async () => {
    const user = userEvent.setup();
    const onSelectItem = vi.fn();
    render(
      <MonthlyCalendar
        items={items}
        getStatus={(id) => id === 'iron-man' ? 'watched' : 'unseen'}
        onSelectItem={onSelectItem}
        today={new Date('2026-10-01T00:00:00.000Z')}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Octubre de 2026' })).toBeTruthy();
    expect(screen.getByRole('button', { name: /3 de octubre de 2026.*2 contenidos/i })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /3 de octubre de 2026.*2 contenidos/i }));
    await user.click(screen.getByRole('button', { name: 'Ir a la tarjeta de Iron Man' }));
    expect(onSelectItem).toHaveBeenCalledWith('iron-man');
    expect(screen.getByRole('button', { name: 'Ir a la tarjeta de Loki' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Mes siguiente' }));
    expect(screen.getByRole('heading', { name: 'Noviembre de 2026' })).toBeTruthy();
    expect(screen.getByText('Próximo paso: Thor')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Mes anterior' }));
    expect(screen.getByRole('heading', { name: 'Octubre de 2026' })).toBeTruthy();
  });

  it('mantiene el detalle como texto cuando no recibe una acción de navegación', async () => {
    const user = userEvent.setup();
    render(<MonthlyCalendar items={items} getStatus={() => 'unseen'} today={new Date('2026-10-01T00:00:00.000Z')} />);

    await user.click(screen.getByRole('button', { name: /3 de octubre de 2026.*2 contenidos/i }));

    expect(screen.getByText('Iron Man · Sin ver')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Ir a la tarjeta de Iron Man' })).toBeNull();
  });

  it('explica días sin contenido y una ruta sin próximos pasos', async () => {
    const user = userEvent.setup();
    render(<MonthlyCalendar items={[]} getStatus={() => 'unseen'} today={new Date('2026-10-01T00:00:00.000Z')} />);

    await user.click(screen.getByRole('button', { name: /^1 de octubre de 2026 — sin contenido$/i }));
    expect(screen.getByText('No hay contenido programado para este día.')).toBeTruthy();
    expect(screen.getByText('No hay próximos contenidos en la ruta.')).toBeTruthy();
  });
});

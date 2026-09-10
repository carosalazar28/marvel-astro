// @vitest-environment jsdom
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import PreparationTracker from '../src/components/PreparationTracker';
import type { PreparationRouteItem } from '../src/utils/preparation-route';

const items: PreparationRouteItem[] = [
  {
    id: 'iron-man',
    title: 'Iron Man',
    type: 'movie',
    scheduledDate: '2026-10-28',
    initialStatus: 'unwatched',
    reason: 'Inicia el MCU.',
    isOverdue: false,
  },
  {
    id: 'loki',
    title: 'Loki',
    type: 'series',
    scheduledDate: '2026-11-04',
    initialStatus: 'unwatched',
    reason: 'Introduce variantes.',
    isOverdue: false,
  },
];

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe('PreparationTracker', () => {
  it('hidrata el progreso, permite completar la ruta y anuncia que está lista', async () => {
    window.localStorage.setItem('mcu-viewing-statuses-v1', JSON.stringify({ 'iron-man': 'watching' }));
    const user = userEvent.setup();
    render(<PreparationTracker items={items} issues={[]} />);

    expect(screen.getByRole('button', { name: 'Películas' }).getAttribute('aria-pressed')).toBe('true');
    await user.click(screen.getByRole('button', { name: 'Calendario' }));
    expect(screen.getByRole('button', { name: 'Calendario' }).getAttribute('aria-pressed')).toBe('true');
    await user.click(screen.getByRole('button', { name: 'Películas' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Cambiar estado de Iron Man: Viendo' }).disabled).toBe(false));

    await user.click(screen.getByRole('button', { name: 'Cambiar estado de Iron Man: Viendo' }));
    expect(screen.getByRole('button', { name: 'Cambiar estado de Iron Man: Vista' }).disabled).toBe(true);
    expect(screen.getByText('1 completada · 1 pendientes')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Cambiar estado de Loki: Sin ver' }));
    expect(screen.getByRole('button', { name: 'Cambiar estado de Loki: Viendo' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Cambiar estado de Loki: Viendo' }));
    expect(screen.getByRole('status').textContent).toContain('¡Estás lista para el estreno!');
    expect(screen.getByRole('button', { name: 'Cambiar estado de Loki: Vista' }).disabled).toBe(true);

    await user.selectOptions(screen.getByLabelText('Filtrar ruta'), 'series');
    expect(screen.getByText('1 de 2 contenidos visibles')).toBeTruthy();
    expect(screen.queryByText('Iron Man')).toBeNull();

    await user.selectOptions(screen.getByLabelText('Ordenar ruta'), 'title');
    await user.selectOptions(screen.getByLabelText('Filtrar ruta'), 'all');
    expect(screen.getByText('2 de 2 contenidos visibles')).toBeTruthy();

    await user.selectOptions(screen.getByLabelText('Filtrar ruta'), 'watching');
    expect(screen.getByText('No hay contenido que coincida con los filtros seleccionados.')).toBeTruthy();
  });

  it('reinicia el calendario completo y conserva la ruta visible', async () => {
    window.localStorage.setItem('mcu-viewing-statuses-v1', JSON.stringify({ 'iron-man': 'watched' }));
    const user = userEvent.setup();
    const { container } = render(<PreparationTracker items={items} issues={['Entrada editorial inválida']} />);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Reiniciar calendario completo' }).disabled).toBe(false));
    expect(screen.queryByRole('button', { name: 'Reiniciar progreso local' })).toBeNull();
    expect(screen.getByText('1 completada · 1 pendientes')).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Reiniciar calendario completo' }));

    expect(screen.getByText('0 completadas · 2 pendientes')).toBeTruthy();
    expect(window.localStorage.getItem('mcu-viewing-statuses-v1')).toBe(
      JSON.stringify({ 'iron-man': 'unseen', loki: 'unseen' }),
    );
    expect(within(container).getByText('Iron Man')).toBeTruthy();
  });

  it('reinicia el calendario completo a sin ver y conserva esa anulación al recargar', async () => {
    const user = userEvent.setup();
    const editorialItems: PreparationRouteItem[] = [
      { ...items[0], initialStatus: 'watched' },
      items[1],
    ];
    const { unmount } = render(<PreparationTracker items={editorialItems} issues={[]} />);

    await waitFor(() => expect(screen.getByText('1 completada · 1 pendientes')).toBeTruthy());
    await user.click(screen.getByRole('button', { name: 'Reiniciar calendario completo' }));

    expect(screen.getByText('0 completadas · 2 pendientes')).toBeTruthy();
    expect(window.localStorage.getItem('mcu-viewing-statuses-v1')).toBe(
      JSON.stringify({ 'iron-man': 'unseen', loki: 'unseen' }),
    );

    unmount();
    render(<PreparationTracker items={editorialItems} issues={[]} />);
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cambiar estado de Iron Man: Sin ver' })).toBeTruthy());
  });

  it('mantiene una explicación específica cuando la ruta editorial está vacía', () => {
    render(<PreparationTracker items={[]} issues={[]} />);

    expect(screen.getByText('Aún no hay películas en tu ruta de preparación.')).toBeTruthy();
    expect(screen.getByText('Aún no hay contenido programado para esta ruta.')).toBeTruthy();
  });
});

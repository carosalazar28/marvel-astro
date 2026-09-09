// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ReadinessSummary from '../src/components/ReadinessSummary';

describe('ReadinessSummary', () => {
  it('explica una ruta vacía y expone un progreso accesible', () => {
    render(<ReadinessSummary items={[]} />);

    expect(screen.getByText('Aún no hay películas en tu ruta de preparación.')).toBeTruthy();
    expect(screen.getByRole('progressbar', { name: 'Progreso de preparación: 0%' }).getAttribute('value')).toBe('0');
    expect(screen.getByText('0 completadas · 0 pendientes')).toBeTruthy();
  });

  it('muestra el avance parcial y el contenido pendiente', () => {
    render(<ReadinessSummary items={[
      { id: 'iron-man', status: 'watched' },
      { id: 'captain-america', status: 'pending' },
      { id: 'thor', status: 'watching' },
    ]} />);

    expect(screen.getByText('33%')).toBeTruthy();
    expect(screen.getByText('1 completada · 2 pendientes')).toBeTruthy();
    expect(screen.getByText('Te faltan 2 películas para estar lista.')).toBeTruthy();
  });

  it('usa singular para el único contenido pendiente', () => {
    render(<ReadinessSummary items={[
      { id: 'iron-man', status: 'watched' },
      { id: 'captain-america', status: 'pending' },
    ]} />);

    expect(screen.getByText('Te falta 1 película para estar lista.')).toBeTruthy();
  });

  it('anuncia explícitamente que la persona está lista al completar la ruta', () => {
    render(<ReadinessSummary items={[
      { id: 'iron-man', status: 'watched' },
      { id: 'captain-america', status: 'watched' },
    ]} />);

    expect(screen.getByRole('status').textContent).toContain('¡Estás lista para el estreno!');
    expect(screen.getByText('2 completadas · 0 pendientes')).toBeTruthy();
  });
});

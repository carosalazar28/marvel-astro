// @vitest-environment jsdom
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PreparationRoute, { resolveAssetUrl } from '../src/components/PreparationRoute';
import type { PreparationRouteItem } from '../src/utils/preparation-route';

const items: PreparationRouteItem[] = [
  {
    id: 'loki',
    title: 'Loki',
    type: 'series',
    scheduledDate: '2026-09-10',
    initialStatus: 'unwatched',
    reason: 'Define el conflicto temporal.',
    isOverdue: false,
  },
  {
    id: 'iron-man',
    title: 'Iron Man',
    type: 'movie',
    scheduledDate: '2026-09-08',
    initialStatus: 'unwatched',
    reason: 'Inicia el MCU.',
    isOverdue: true,
  },
];

describe('PreparationRoute', () => {
  it('usa la URL de un recurso procesado por Astro para la miniatura local', () => {
    expect(resolveAssetUrl({ src: '/_astro/preparation-artwork-v1.jpg' })).toBe('/_astro/preparation-artwork-v1.jpg');
    expect(resolveAssetUrl('/assets/preparation-artwork-v1.jpg')).toBe('/assets/preparation-artwork-v1.jpg');
  });

  it('muestra los metadatos, razón y alerta de retraso de cada contenido', () => {
    render(<PreparationRoute items={items} issues={[]} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Tu ruta de preparación' })).toBeTruthy();
    expect(screen.getByText('Serie')).toBeTruthy();
    expect(screen.getByText('Película')).toBeTruthy();
    expect(screen.getAllByText('Sin ver')).toHaveLength(2);
    expect(screen.getByText('Define el conflicto temporal.')).toBeTruthy();
    expect(screen.getByText('Atrasada')).toBeTruthy();
    expect(screen.getByRole('time', { name: 'Programada para 8 de septiembre de 2026' })).toBeTruthy();
    const artworks = document.querySelectorAll<HTMLElement>('.preparation-card__artwork');
    expect(artworks).toHaveLength(2);
    expect(artworks[0].style.backgroundImage).toContain('preparation-artwork-v1');
  });

  it('explica una ruta vacía y avisos de validación sin ocultar contenido válido', () => {
    const { container, rerender } = render(<PreparationRoute items={[]} issues={[]} />);
    expect(screen.getByText('Aún no hay contenido programado para esta ruta.')).toBeTruthy();

    rerender(<PreparationRoute items={[items[0]]} issues={['La entrada 2 no es un objeto válido.']} />);
    expect(screen.getByRole('alert').textContent).toContain('1 entrada del catálogo no se pudo mostrar');

    rerender(<PreparationRoute items={[items[0]]} issues={['La entrada 2 no es un objeto válido.', 'La entrada 3 tiene un tipo inválido.']} />);
    expect(screen.getByRole('alert').textContent).toContain('2 entradas del catálogo no se pudieron mostrar');
    expect(within(container).getByText('Loki')).toBeTruthy();
  });
});

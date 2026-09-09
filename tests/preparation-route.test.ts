import { describe, expect, it } from 'vitest';
import { parsePreparationRoute } from '../src/utils/preparation-route';

const now = new Date('2026-09-09T12:00:00.000Z');

const validItem = {
  id: 'captain-america-first-avenger',
  title: 'Capitán América: El primer vengador',
  type: 'movie',
  scheduledDate: '2026-09-16',
  initialStatus: 'unwatched',
  reason: 'Presenta el origen del equipo.',
};

describe('parsePreparationRoute', () => {
  it('valida y ordena la ruta por fecha programada', () => {
    const result = parsePreparationRoute([
      validItem,
      { ...validItem, id: 'loki', title: 'Loki', type: 'series', scheduledDate: '2026-09-10' },
    ], now);

    expect(result.issues).toEqual([]);
    expect(result.items.map((item) => item.id)).toEqual(['loki', 'captain-america-first-avenger']);
    expect(result.items[0]).toMatchObject({ type: 'series', initialStatus: 'unwatched', isOverdue: false });
  });

  it('marca como atrasado el contenido sin ver cuya fecha ya pasó', () => {
    const result = parsePreparationRoute([{ ...validItem, scheduledDate: '2026-09-08' }], now);

    expect(result.items[0]?.isOverdue).toBe(true);
  });

  it('acepta una ruta vacía', () => {
    expect(parsePreparationRoute([], now)).toEqual({ items: [], issues: [] });
  });

  it('descarta una entrada inválida y comunica cada causa al consumidor', () => {
    const result = parsePreparationRoute([
      { ...validItem, id: '', scheduledDate: 'fecha-inválida' },
      { ...validItem, id: 'captain-america-first-avenger' },
      { ...validItem, id: 'captain-america-first-avenger' },
      { ...validItem, id: 'sin-estado', initialStatus: 'watched' },
      { ...validItem, id: 'tipo-invalido', type: 'short' },
      { ...validItem, id: 'fecha-invalida', scheduledDate: '2026-02-30' },
      { ...validItem, id: 'formato-invalido', scheduledDate: 'septiembre' },
      { ...validItem, id: 'sin-razon', reason: '  ' },
      null,
    ], now);

    expect(result.items).toEqual([expect.objectContaining({ id: 'captain-america-first-avenger' })]);
    expect(result.issues).toEqual([
      'La entrada 1 tiene un id o título inválido.',
      'La entrada 3 repite el id "captain-america-first-avenger".',
      'La entrada 4 tiene un estado inicial inválido.',
      'La entrada 5 tiene un tipo inválido.',
      'La entrada 6 tiene una fecha programada inválida.',
      'La entrada 7 tiene una fecha programada inválida.',
      'La entrada 8 tiene una razón de relevancia inválida.',
      'La entrada 9 no es un objeto válido.',
    ]);
  });

  it('rechaza una colección que no es un arreglo', () => {
    expect(parsePreparationRoute({ ...validItem }, now)).toEqual({
      items: [],
      issues: ['La ruta de preparación debe ser una lista.'],
    });
  });
});

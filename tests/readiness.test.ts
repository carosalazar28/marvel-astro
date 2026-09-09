import { describe, expect, it } from 'vitest';
import { getReadinessSummary } from '../src/utils/readiness';

describe('getReadinessSummary', () => {
  it('describe una ruta vacía sin marcar a la persona como lista', () => {
    expect(getReadinessSummary([])).toEqual({
      total: 0,
      completed: 0,
      pending: 0,
      percentage: 0,
      isReady: false,
    });
  });

  it('calcula una ruta en la que no hay contenido visto', () => {
    expect(getReadinessSummary([
      { id: 'iron-man', status: 'pending' },
      { id: 'captain-america', status: 'watching' },
    ])).toMatchObject({ total: 2, completed: 0, pending: 2, percentage: 0, isReady: false });
  });

  it('redondea el avance de una ruta parcial para comunicarlo en porcentaje', () => {
    expect(getReadinessSummary([
      { id: 'iron-man', status: 'watched' },
      { id: 'captain-america', status: 'watching' },
      { id: 'thor', status: 'pending' },
    ])).toMatchObject({ total: 3, completed: 1, pending: 2, percentage: 33, isReady: false });
  });

  it('declara la ruta lista únicamente al completar todos los elementos', () => {
    expect(getReadinessSummary([
      { id: 'iron-man', status: 'watched' },
      { id: 'captain-america', status: 'watched' },
    ])).toMatchObject({ total: 2, completed: 2, pending: 0, percentage: 100, isReady: true });
  });

  it('trata estados desconocidos e identificadores repetidos como contenido pendiente una sola vez', () => {
    expect(getReadinessSummary([
      { id: 'iron-man', status: 'watched' },
      { id: 'iron-man', status: 'pending' },
      { id: 'captain-america', status: 'unknown' },
      { id: '', status: 'watched' },
    ])).toMatchObject({ total: 2, completed: 1, pending: 1, percentage: 50, isReady: false });
  });
});

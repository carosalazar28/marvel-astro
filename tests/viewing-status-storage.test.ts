import { describe, expect, it, vi } from 'vitest';
import {
  clearViewingStatuses,
  readViewingStatuses,
  VIEWING_STATUS_STORAGE_KEY,
  writeViewingStatuses,
} from '../src/services/viewing-status-storage';

const knownIds = ['black-panther', 'captain-marvel'] as const;

describe('viewing status storage', () => {
  it('reads valid known statuses and removes obsolete or invalid entries', () => {
    const storage = {
      getItem: vi.fn().mockReturnValue(
        JSON.stringify({
          'black-panther': 'watched',
          obsolete: 'watching',
          'captain-marvel': 'paused',
        }),
      ),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };

    expect(readViewingStatuses(storage, knownIds)).toEqual({ 'black-panther': 'watched' });
    expect(storage.getItem).toHaveBeenCalledWith(VIEWING_STATUS_STORAGE_KEY);
  });

  it.each([null, undefined])('returns an empty state when storage is unavailable: %s', (storage) => {
    expect(readViewingStatuses(storage, knownIds)).toEqual({});
    expect(writeViewingStatuses(storage, { 'black-panther': 'watching' })).toBe(false);
    expect(clearViewingStatuses(storage)).toBe(false);
  });

  it.each(['not-json', '[]', 'null', '"watching"'])(
    'returns an empty state for corrupt or incompatible stored data: %s',
    (value) => {
      const storage = { getItem: vi.fn().mockReturnValue(value), setItem: vi.fn(), removeItem: vi.fn() };

      expect(readViewingStatuses(storage, knownIds)).toEqual({});
    },
  );

  it('returns an empty state when reading storage throws', () => {
    const storage = {
      getItem: vi.fn(() => {
        throw new Error('blocked');
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };

    expect(readViewingStatuses(storage, knownIds)).toEqual({});
  });

  it('serializes valid statuses and reports write errors without throwing', () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() };

    expect(writeViewingStatuses(storage, { 'black-panther': 'watching' })).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(
      VIEWING_STATUS_STORAGE_KEY,
      JSON.stringify({ 'black-panther': 'watching' }),
    );

    storage.setItem.mockImplementationOnce(() => {
      throw new Error('quota');
    });
    expect(writeViewingStatuses(storage, { 'black-panther': 'watched' })).toBe(false);
  });

  it('removes saved statuses and reports reset errors without throwing', () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() };

    expect(clearViewingStatuses(storage)).toBe(true);
    expect(storage.removeItem).toHaveBeenCalledWith(VIEWING_STATUS_STORAGE_KEY);

    storage.removeItem.mockImplementationOnce(() => {
      throw new Error('blocked');
    });
    expect(clearViewingStatuses(storage)).toBe(false);
  });
});

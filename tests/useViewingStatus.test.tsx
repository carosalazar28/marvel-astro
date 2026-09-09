// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VIEWING_STATUS_STORAGE_KEY, type StorageLike } from '../src/services/viewing-status-storage';
import { useViewingStatus } from '../src/hooks/useViewingStatus';

const knownIds = ['black-panther'] as const;

function createStorage(initialValue: string | null = null): StorageLike {
  let value = initialValue;

  return {
    getItem: vi.fn(() => value),
    setItem: vi.fn((_, nextValue: string) => {
      value = nextValue;
    }),
    removeItem: vi.fn(() => {
      value = null;
    }),
  };
}

describe('useViewingStatus', () => {
  it('hydrates valid saved progress, advances it and resets its local state', async () => {
    const storage = createStorage(JSON.stringify({ 'black-panther': 'watching' }));
    const { result } = renderHook(() => useViewingStatus(knownIds, { storage }));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    expect(result.current.getStatus('black-panther')).toBe('watching');

    act(() => result.current.advance('black-panther'));
    expect(result.current.getStatus('black-panther')).toBe('watched');
    expect(storage.setItem).toHaveBeenCalledWith(
      VIEWING_STATUS_STORAGE_KEY,
      JSON.stringify({ 'black-panther': 'watched' }),
    );

    act(() => result.current.reset());
    expect(result.current.statuses).toEqual({});
    expect(storage.removeItem).toHaveBeenCalledWith(VIEWING_STATUS_STORAGE_KEY);
  });

  it('keeps an empty usable state when browser storage is absent', async () => {
    const { result } = renderHook(() => useViewingStatus(knownIds, { storage: null }));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    act(() => result.current.advance('black-panther'));

    expect(result.current.statuses).toEqual({ 'black-panther': 'watching' });
  });

  it('recovers from corrupt storage and ignores invalid transition ids', async () => {
    const storage = createStorage('not-json');
    const { result } = renderHook(() => useViewingStatus(knownIds, { storage }));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    act(() => result.current.advance(''));

    expect(result.current.statuses).toEqual({});
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it('remains usable when storage access throws', async () => {
    const storage: StorageLike = {
      getItem: vi.fn(() => {
        throw new Error('blocked');
      }),
      setItem: vi.fn(() => {
        throw new Error('quota');
      }),
      removeItem: vi.fn(() => {
        throw new Error('blocked');
      }),
    };
    const { result } = renderHook(() => useViewingStatus(knownIds, { storage }));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    act(() => result.current.advance('black-panther'));
    act(() => result.current.reset());

    expect(result.current.statuses).toEqual({});
  });

  it('uses browser storage only after checking that it is available', async () => {
    window.localStorage.clear();
    window.localStorage.setItem(VIEWING_STATUS_STORAGE_KEY, JSON.stringify({ 'black-panther': 'watched' }));

    const { result } = renderHook(() => useViewingStatus(knownIds));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    expect(result.current.getStatus('black-panther')).toBe('watched');
  });

  it('falls back safely when reading the browser storage property throws', async () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get: () => {
        throw new Error('blocked');
      },
    });

    try {
      const { result } = renderHook(() => useViewingStatus(knownIds));

      await waitFor(() => expect(result.current.isHydrated).toBe(true));
      expect(result.current.statuses).toEqual({});
    } finally {
      Object.defineProperty(window, 'localStorage', originalDescriptor as PropertyDescriptor);
    }
  });

  it('does not rehydrate repeatedly when a caller recreates the catalog array', async () => {
    const storage = createStorage();
    const { result } = renderHook(() => useViewingStatus(['black-panther'], { storage }));

    await waitFor(() => expect(result.current.isHydrated).toBe(true));
    expect(storage.getItem).toHaveBeenCalledTimes(1);
  });
});

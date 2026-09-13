import { describe, expect, it } from 'vitest';
import {
  advanceViewingStatus,
  createEmptyViewingStatuses,
  createUnseenViewingStatuses,
  getViewingStatus,
  isStableContentId,
  isViewingStatus,
} from '../src/utils/progress/viewing-status';

describe('viewing status domain', () => {
  it('avanza un ítem en un ciclo de sin ver a viendo, vista y sin ver', () => {
    const watching = advanceViewingStatus({}, 'black-panther');
    const watched = advanceViewingStatus(watching, 'black-panther');
    const unseen = advanceViewingStatus(watched, 'black-panther');

    expect(getViewingStatus({}, 'black-panther')).toBe('unseen');
    expect(watching).toEqual({ 'black-panther': 'watching' });
    expect(watched).toEqual({ 'black-panther': 'watched' });
    expect(unseen).toEqual({ 'black-panther': 'unseen' });
  });

  it('does not change progress for an invalid content id', () => {
    const statuses = { 'black-panther': 'watching' as const };

    expect(advanceViewingStatus(statuses, '   ')).toBe(statuses);
    expect(getViewingStatus(statuses, '')).toBe('unseen');
  });

  it('recognizes only non-empty stable ids and known status values', () => {
    expect(isStableContentId('black-panther')).toBe(true);
    expect(isStableContentId('')).toBe(false);
    expect(isStableContentId('  ')).toBe(false);
    expect(isStableContentId(123)).toBe(false);
    expect(isViewingStatus('unseen')).toBe(true);
    expect(isViewingStatus('paused')).toBe(false);
  });

  it('crea una anulación local no vista para cada id estable del calendario', () => {
    expect(createUnseenViewingStatuses(['iron-man', '', 'iron-man', 'thor', 42])).toEqual({
      'iron-man': 'unseen',
      thor: 'unseen',
    });
  });
});

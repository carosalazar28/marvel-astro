import { describe, expect, it } from 'vitest';
import {
  advanceViewingStatus,
  createEmptyViewingStatuses,
  createUnseenViewingStatuses,
  getViewingStatus,
  isStableContentId,
  isViewingStatus,
  resetViewingStatuses,
} from '../src/utils/progress/viewing-status';

describe('viewing status domain', () => {
  it('advances an item from unseen through watching to watched', () => {
    const watching = advanceViewingStatus({}, 'black-panther');
    const watched = advanceViewingStatus(watching, 'black-panther');

    expect(getViewingStatus({}, 'black-panther')).toBe('unseen');
    expect(watching).toEqual({ 'black-panther': 'watching' });
    expect(watched).toEqual({ 'black-panther': 'watched' });
  });

  it('keeps a watched item watched when the advance action is repeated', () => {
    expect(advanceViewingStatus({ 'black-panther': 'watched' }, 'black-panther')).toEqual({
      'black-panther': 'watched',
    });
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

  it('resets all saved statuses without mutating the prior state', () => {
    const statuses = { 'black-panther': 'watched' as const };

    expect(createEmptyViewingStatuses()).toEqual({});
    expect(resetViewingStatuses(statuses)).toEqual({});
    expect(statuses).toEqual({ 'black-panther': 'watched' });
  });

  it('crea una anulación local no vista para cada id estable del calendario', () => {
    expect(createUnseenViewingStatuses(['iron-man', '', 'iron-man', 'thor', 42])).toEqual({
      'iron-man': 'unseen',
      thor: 'unseen',
    });
  });
});

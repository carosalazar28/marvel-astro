import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { useViewingStatus } from '../src/hooks/useViewingStatus';

function ServerProgress(): ReturnType<typeof createElement> {
  const progress = useViewingStatus(['black-panther']);

  return createElement('span', null, progress.getStatus('black-panther'));
}

describe('useViewingStatus on the server', () => {
  it('does not access browser storage while Astro renders the initial markup', () => {
    expect(renderToString(createElement(ServerProgress))).toBe('<span>unseen</span>');
  });
});

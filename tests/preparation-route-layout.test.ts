import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const routeStyles = readFileSync(
  new URL('../src/styles/preparation-route.css', import.meta.url),
  'utf8',
);

describe('layout de la ruta de preparación', () => {
  it('mantiene la miniatura compacta sin estirarla a la altura de la tarjeta', () => {
    expect(routeStyles).toMatch(
      /\.preparation-card__artwork\s*\{[\s\S]*?align-self:\s*start;[\s\S]*?height:\s*7\.5rem;[\s\S]*?min-height:\s*0;/,
    );
    expect(routeStyles).toMatch(
      /@media \(max-width: 40rem\)\s*\{[\s\S]*?\.preparation-card__artwork\s*\{[\s\S]*?height:\s*6rem;[\s\S]*?min-height:\s*0;/,
    );
  });
});

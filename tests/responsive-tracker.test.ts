import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const trackerStyles = readFileSync(new URL('../src/styles/preparation-tracker.css', import.meta.url), 'utf8');

describe('contrato responsive del tracker', () => {
  it('ofrece navegación móvil persistente, paneles alternables y objetivos táctiles de 44 px', () => {
    expect(trackerStyles).toMatch(/\.preparation-tracker__tabs[\s\S]*?position:\s*sticky;/);
    expect(trackerStyles).toMatch(/\.preparation-tracker__tab[\s\S]*?min-height:\s*44px;/);
    expect(trackerStyles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\[data-active-view='route'\][\s\S]*?\.preparation-tracker__calendar\s*\{\s*display:\s*none;/);
    expect(trackerStyles).toMatch(/@media \(max-width: 767px\)[\s\S]*?\[data-active-view='calendar'\][\s\S]*?\.preparation-tracker__route\s*\{\s*display:\s*none;/);
  });

  it('recupera dos columnas en escritorio sin ocultar los paneles', () => {
    expect(trackerStyles).toMatch(/@media \(min-width: 768px\)[\s\S]*?\.preparation-tracker__content\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) minmax\(20rem, 0\.9fr\);/);
    expect(trackerStyles).toMatch(/@media \(min-width: 768px\)[\s\S]*?\.preparation-tracker__tabs\s*\{\s*display:\s*none;/);
  });
});

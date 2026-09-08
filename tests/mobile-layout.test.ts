import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const sliderStyles = readFileSync(
  new URL('../src/styles/slider.css', import.meta.url),
  'utf8',
);

describe('contrato responsive del carrusel', () => {
  it('muestra solo el estreno activo y desplaza los controles fuera de la tarjeta en móvil', () => {
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__slide--prev,[\s\S]*?\.slider__slide--next\s*\{\s*display:\s*none;/);
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__button\s*\{[\s\S]*?position:\s*static;/);
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__button--prev\s*\{[\s\S]*?grid-column:\s*1;/);
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__button--next\s*\{[\s\S]*?grid-column:\s*2;/);
  });

  it('permite que la tarjeta central crezca con el contenido en móvil', () => {
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__card\s*\{[\s\S]*?height:\s*auto;/);
    expect(sliderStyles).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.slider__card--active\s*\{[\s\S]*?transform:\s*none;/);
  });
});

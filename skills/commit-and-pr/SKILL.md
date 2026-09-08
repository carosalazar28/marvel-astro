---
name: commit-and-pr
description: Prepara cambios del Plan de Cine MCU para entrega con Conventional Commits, pull requests pequeños y PRs stackeados cuando el alcance lo exige.
---

# Commits y pull requests

Usa esta skill para todo cambio que vaya a integrarse.

## Antes de modificar

- Trabaja en una rama dedicada con prefijo `codex/`, salvo que la persona usuaria indique otra.
- Divide el alcance para que cada PR tenga una intención verificable y pueda revisarse de forma independiente.
- Si el trabajo proyectado supera 1.000 líneas de altas más bajas, diseña PRs stackeados. Cada rama posterior parte de la rama del PR anterior y el orden de merge se declara en todos los PRs de la pila.

## Commits

Usa Conventional Commits con alcance cuando aporte contexto:

```text
type(scope): resumen imperativo
```

Tipos habituales: `feat`, `fix`, `docs`, `test`, `refactor`, `build` y `chore`. El mensaje explica un cambio único y no agrupa trabajo ajeno.

## Antes de abrir el PR

1. Calcula el tamaño con `git diff --shortstat <base>...HEAD`; suma inserciones y eliminaciones. Incluye código, documentación, pruebas y archivos de bloqueo.
2. Completa las revisiones requeridas por las skills de negocio y técnica.
3. Completa todos los campos de `.github/pull_request_template.md`, incluidos comandos de verificación y resultado.
4. Si el PR es stackeado, declara rama base, orden de merge y qué alcance independiente entrega este nivel.

No abras un PR que supere 1.000 líneas ni uno con revisiones incompletas. Divide el trabajo antes de solicitar la revisión.

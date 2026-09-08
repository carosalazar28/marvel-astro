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
3. La descripción debe cumplir exactamente la estructura definida en `.github/pull_request_template.md`: `Description`, `Changes`, `Testing` y `Additional Information`. Sustituye todos los textos de ejemplo por información concreta del cambio; no añadas secciones alternativas ni dejes placeholders.
4. Si el PR es stackeado, declara rama base, orden de merge y qué alcance independiente entrega este nivel.

No abras un PR que supere 1.000 líneas ni uno con revisiones incompletas. Divide el trabajo antes de solicitar la revisión.

## Entregable obligatorio

Cuando el objetivo acordado esté implementado y haya pasado sus controles de calidad, crea el pull request correspondiente. El commit local o la implementación terminada no constituyen una entrega: el PR abierto es el entregable requerido.

Si no es posible abrirlo por una condición del harness —por ejemplo, cobertura incompleta, tamaño excedido o autenticación ausente— no declares el objetivo entregado. Divide, corrige o comunica el bloqueo concreto.

## Cierre tras la fusión

Cuando el PR esté fusionado, verifica su estado y el commit de merge en GitHub. Entrega un resumen final con el enlace del PR, la verificación ejecutada y cualquier seguimiento explícito.

Después, cierra el contexto de la tarea. El siguiente objetivo se inicia en una tarea nueva para evitar que decisiones, supuestos o instrucciones temporales anteriores contaminen el trabajo. No elimines archivos, ramas ni cambios locales de otras personas como parte de ese cierre.

## Entrega autónoma a GitHub

Usa GitHub CLI autenticado por HTTPS para las operaciones remotas. Antes de subir o crear un PR, ejecuta `gh auth status`; si no hay una cuenta activa, detén la entrega y pide a la persona usuaria completar una sola vez:

```text
gh auth login --hostname github.com --git-protocol https --web
```

No expongas ni copies tokens. Configura el remoto del repositorio como `https://github.com/<owner>/<repo>.git`, de modo que Git use la credencial segura de GitHub CLI en vez de depender de un socket SSH de una terminal interactiva.

Después de validar tamaño, revisiones, build y pruebas, sube la rama y crea el PR con `gh pr create`, indicando base, rama, título convencional y un cuerpo que siga exactamente `.github/pull_request_template.md`. Para una pila, crea primero el PR base; cada PR posterior usa la rama del nivel anterior como base.

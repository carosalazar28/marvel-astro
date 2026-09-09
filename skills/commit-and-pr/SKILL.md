---
name: commit-and-pr
description: Prepara cambios del Plan de Cine MCU para entrega con Conventional Commits, pull requests pequeños y PRs stackeados cuando el alcance lo exige.
---

# Commits y pull requests

Usa esta skill para todo cambio que vaya a integrarse.

## Antes de modificar

- Trabaja en una rama dedicada con prefijo `codex/`, salvo que la persona usuaria indique otra.
- Todo PR usa `main` como rama base. Divide el alcance para que cada PR tenga una intención verificable, se pueda revisar de forma independiente y se integre directamente en `main`.
- Si el trabajo proyectado supera 1.000 líneas de altas más bajas, divídelo en PRs independientes contra `main`; no uses una pila solo para fraccionar tamaño.
- La única excepción a la base `main` es corregir o completar una función que vive en un PR **abierto**. En ese caso, la rama puede partir de aquel PR y el nuevo PR debe declarar qué corrige, la rama base y el orden de merge. Si el PR base ya fue fusionado o cerrado, actualiza la rama desde `main` y abre el PR contra `main`.

## Commits

Usa Conventional Commits con alcance cuando aporte contexto:

```text
type(scope): resumen imperativo
```

Tipos habituales: `feat`, `fix`, `docs`, `test`, `refactor`, `build` y `chore`. El mensaje explica un cambio único y no agrupa trabajo ajeno.

## Antes de abrir el PR

1. Calcula el tamaño con `git diff --shortstat <base>...HEAD`; suma inserciones y eliminaciones. Incluye código, documentación, pruebas y archivos de bloqueo.
2. Completa las revisiones requeridas por las skills de negocio y técnica.
3. La descripción debe cumplir exactamente la estructura definida en `.github/pull_request_template.md`: `Description`, `Changes`, `Testing` y `Additional Information`. Sustituye todos los textos de ejemplo por información concreta del cambio; no añadas secciones alternativas ni dejes placeholders. En `Additional Information`, incluye `Closes #<issue-number>` para el issue que el PR entrega; si un PR no corresponde a un issue, crea o vincula el issue antes de abrirlo.
4. Si el PR usa excepcionalmente la rama de otro PR abierto como base, declara la rama base, el PR relacionado, el motivo funcional y el orden de merge.

No abras un PR que supere 1.000 líneas ni uno con revisiones incompletas. Divide el trabajo antes de solicitar la revisión.

### Excepción para lockfiles atómicos

Un lockfile generado por el gestor de paquetes puede quedar fuera del límite solamente si no puede dividirse sin invalidarlo, es necesario para una dependencia del cambio y el resto de las altas y bajas no supera 1.000 líneas. Declara en `Additional Information` el tamaño total, el tamaño sin lockfile y la razón de la excepción. La excepción no aplica a código, pruebas, documentación ni a actualizaciones de lockfile no relacionadas.

## Entregable obligatorio

Cuando el objetivo acordado esté implementado y haya pasado sus controles de calidad, crea el pull request correspondiente. El commit local o la implementación terminada no constituyen una entrega: el PR abierto es el entregable requerido.

Si no es posible abrirlo por una condición del harness —por ejemplo, cobertura incompleta, tamaño excedido o autenticación ausente— no declares el objetivo entregado. Divide, corrige o comunica el bloqueo concreto.

## Actualización de un PR existente

Justo antes de subir cambios a la rama de un PR existente o editar su descripción, consulta su estado remoto con `gh pr view <número> --json state,mergedAt`. Si está `MERGED` o `CLOSED`, no añadas trabajo nuevo a esa rama: parte de `origin/main`, crea un issue si el anterior se cerró y abre un PR nuevo contra `main`. Esta comprobación evita que una entrega posterior quede fuera de `main` al actualizar una rama cuyo PR ya terminó.

## Entrega autónoma a GitHub

Usa GitHub CLI autenticado por HTTPS para las operaciones remotas. Antes de subir o crear un PR, ejecuta `gh auth status`; si no hay una cuenta activa, detén la entrega y pide a la persona usuaria completar una sola vez:

```text
gh auth login --hostname github.com --git-protocol https --web
```

No expongas ni copies tokens. Configura el remoto del repositorio como `https://github.com/<owner>/<repo>.git`, de modo que Git use la credencial segura de GitHub CLI en vez de depender de un socket SSH de una terminal interactiva.

Después de validar tamaño, revisiones, build y pruebas, sube la rama y crea el PR con `gh pr create`, usando `main` como base, título convencional y un cuerpo que siga exactamente `.github/pull_request_template.md`. Usa otra base únicamente para la excepción documentada de un PR abierto.

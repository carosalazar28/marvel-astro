# Harness de ingeniería

Este repositorio desarrolla una aplicación personal para completar un calendario semanal de películas y series del MCU. Antes de cambiar código, datos, estilos o documentación, lee este archivo y las skills aplicables en `skills/`.

## General

- **TypeScript first:** todo código nuevo con lógica, estado, contratos de datos o integración entre componentes se escribe en TypeScript. Declara tipos explícitos para props, datos JSON, valores de retorno y estados con alternativas finitas. No uses `any`; modela datos desconocidos como `unknown` y valídalos antes de usarlos.
- Mantén los cambios pequeños, cohesionados y alineados con un caso de uso. No combines refactors no relacionados con funcionalidad nueva.
- No modifiques archivos ajenos al alcance del cambio. Preserva siempre el trabajo local existente de otras personas.
- Antes de introducir una dependencia, prefiere las capacidades nativas de Astro, React, TypeScript y el navegador. Justifica la dependencia y actualiza la documentación si altera la arquitectura o el flujo de calidad.
- El idioma de la interfaz y la documentación del producto es español; identificadores, tipos y nombres técnicos pueden permanecer en inglés cuando mejoren la claridad.

## Stack y comandos

- Astro 5 proporciona la página y el layout; React 19 se usa únicamente en islas interactivas.
- El contenido versionado vive en `src/data/`; el progreso de la persona usuaria vive solo en `localStorage`.
- Usa `npm run dev` para desarrollo y `npm run build` antes de entregar un cambio. Cuando exista la suite, ejecuta también el comando de pruebas y cobertura definido en `package.json`.
- Usa GitHub CLI (`gh`) autenticado por HTTPS para consultar, subir ramas y crear pull requests. Verifica `gh auth status` antes de una entrega remota; nunca dependas del socket SSH de una sesión interactiva.
- No introduzcas backend, cuentas, APIs externas ni servicios de pago sin actualizar primero la documentación de producto y arquitectura.

## Coding standards

- **TDD:** escribe o actualiza las pruebas unitarias/integración antes de implementar una funcionalidad nueva o corregir un defecto. Las pruebas deben fallar primero por la razón esperada, pasar tras el cambio y cubrir el flujo principal, bordes, errores y transiciones relevantes.
- **Cobertura:** todo código ejecutable modificado requiere 100% de cobertura de líneas, funciones y ramas en el diff. Sigue `skills/testing-and-coverage/SKILL.md`. Hasta configurar la suite del Hito 0 de `PLANS.md`, el PR que añada código de producto debe incluir esa configuración o depender de un PR base que la entregue.
- **Comentarios y documentación:** documenta métodos, funciones, clases, hooks y componentes cuando su propósito, invariantes, efectos secundarios, decisiones de dominio o restricciones no sean evidentes por el tipo y el nombre. Usa comentarios inline para explicar el *porqué*, no para repetir el *qué*. Escribe esta documentación para que una persona y un agente puedan reconstruir decisiones sin revisar el historial de Git.
- Prefiere funciones pequeñas, puras y testeables para cálculo, transformación y validación. Aísla los efectos del navegador —temporizadores, `localStorage` y eventos— detrás de límites explícitos.
- Mantén accesibles los controles nuevos o modificados: semántica HTML, nombre accesible, teclado, foco visible, contraste y alternativa al color como único indicador de estado.

## Repository layout

```text
.
├── src/
│   ├── pages/        Rutas Astro y composición de pantallas.
│   ├── layouts/      Estructura HTML compartida.
│   ├── components/   Islas y componentes React; `atoms/` contiene piezas presentacionales pequeñas.
│   ├── hooks/        Hooks React y lógica de estado reutilizable.
│   ├── services/     Fronteras con APIs del navegador y otras integraciones locales.
│   ├── data/         JSON versionado de catálogo y estrenos.
│   ├── styles/       Estilos globales y estilos de componentes.
│   └── assets/       Recursos procesados por Astro.
├── scripts/          Automatizaciones TypeScript ejecutadas desde npm.
├── tests/            Pruebas unitarias y de integración.
├── public/           Recursos estáticos publicados sin procesamiento.
├── docs/use-cases/   Flujos observables, precondiciones y casos límite del producto.
├── docs/audits/      Evidencia versionada de auditorías y backlog técnico consolidado.
├── skills/           Instrucciones operativas del harness; una carpeta por skill con `SKILL.md`.
├── .github/          Plantillas y automatización de GitHub.
├── AGENTS.md         Reglas de entrada para agentes y contribuciones.
└── *.md              Documentación de arquitectura, diseño, frontend, producto y plan.
```

No crees una carpeta nueva sin una responsabilidad clara. Coloca el código según su responsabilidad: rutas en `pages`, composición compartida en `layouts`, interacción reutilizable en `components`/`hooks`, datos editables en `data` y estilos en `styles`.

## Auditorías de experiencia

Los perfiles reutilizables de `.github/agents/` separan la auditoría de la remediación. Para una auditoría de producto o interfaz, los perfiles de UI/UX y producto trabajan sobre el mismo commit de `main`, sin modificar código. El responsable técnico consolida sus informes antes de priorizar, y el ejecutor crea issues verificables antes de cambiar el producto.

- `ui-ux-pixel-perfect-auditor.agent.md` compara los frames de Figma con la aplicación en escritorio y móvil.
- `product-journey-auditor.agent.md` verifica los flujos de `docs/use-cases/` como una persona usuaria.
- `technical-audit-lead.agent.md` consolida evidencia, elimina duplicados y mantiene el backlog técnico.
- `remediation-engineer.agent.md` transforma una unidad priorizada en issue, implementación y PR contra `main`.

La evidencia vive en `docs/audits/`; el issue de auditoría solo resume el avance y enlaza los documentos. Los criterios reutilizables están en `docs/audits/AUDIT_GUIDELINES.md`. Ningún perfil fusiona pull requests.

## Arquitectura y datos

- Mantén el shell y el contenido estático en Astro; aísla en React solamente los comportamientos que requieren estado del navegador.
- Los estilos `scoped` de Astro no se propagan a los nodos de una isla React. Declara en la hoja de estilos de la isla cualquier invariante visual que necesite —por ejemplo, `box-sizing` para un elemento con ancho y padding— y cúbrela con una prueba de regresión cuando pueda afectar el layout.
- Las imágenes procesadas importadas desde `src/assets/` exponen metadatos en el build de Astro. Cuando una isla React las use como URL, pasa explícitamente su propiedad `src` y cubre tanto ese caso como la cadena de URL de las pruebas.
- Los ítems del calendario necesitan un identificador estable. El estado de visto nunca debe depender de la posición, la semana ni del título visible.
- Los datos de catálogo y estrenos se editan manualmente en JSON y deben validarse antes de consumirse.
- El acceso a `localStorage` debe ser seguro ante valores ausentes o corruptos y no debe ejecutarse durante renderizado de servidor.

## Reglas no negociables

1. Lee `skills/commit-and-pr/SKILL.md`, `skills/testing-and-coverage/SKILL.md`, `skills/business-review/SKILL.md`, `skills/technical-review/SKILL.md` y `skills/documentation-and-learning/SKILL.md` para cualquier cambio de producto o código.
2. Todo cambio integrado se realiza en una rama, con Conventional Commit y pull request contra `main`. El diff total del PR (altas + bajas, incluidas pruebas y documentación) no puede superar 1.000 líneas. Divide el alcance en PRs independientes contra `main` si lo supera. Solo se permite que un PR use como base otro PR **abierto** cuando corrige o completa una función de ese PR; debe declarar la dependencia, el motivo y el orden de merge. Nunca fusiones trabajo nuevo a una rama cuyo PR ya fue mergeado o cerrado. Un lockfile de gestor de paquetes generado, atómico y necesario puede excluirse de ese conteo solo si el PR declara la excepción y el resto del diff respeta el límite.
3. Todo código modificado requiere pruebas unitarias con 100% de cobertura de líneas, funciones y ramas para ese código, incluidos casos límite y de error.
4. Completa la revisión de negocio y la revisión técnica antes de abrir el pull request; adjunta su evidencia en la plantilla del PR.
5. Cuando se cumpla el objetivo acordado y pasen sus controles de calidad, crea el pull request: el PR es el entregable obligatorio del cambio. Su descripción debe incluir `Closes #<issue-number>` para cerrar trazablemente el issue entregado. Un objetivo no se considera entregado solo por estar implementado o confirmado localmente.
6. Actualiza la documentación afectada en el mismo cambio. Un fallo confirmado debe producir un aprendizaje reutilizable en el harness, una skill o la documentación.

## Documentación que gobierna el producto

- `ARCHITECTURE.md`: límites técnicos, flujo de datos y persistencia.
- `DESIGN.md`: lenguaje visual y accesibilidad básica.
- `FRONTEND.md`: contratos de interfaz, componentes y estado.
- `PRODUCT_SENSE.md`: usuario, problema, éxito y límites de v1.
- `PLANS.md`: estado actual, hitos y deuda priorizada.
- `docs/use-cases/`: comportamiento observable por caso de uso.

Actualiza el documento correspondiente cuando cambie cualquiera de sus afirmaciones; no dejes que la documentación describa un producto distinto al código.

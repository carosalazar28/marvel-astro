# Arquitectura

## Objetivo

La aplicación es un plan personal de visionado MCU. Muestra próximos estrenos y un calendario semanal unificado de películas y series; permite registrar progreso únicamente en el navegador de quien la usa.

## Componentes

```text
JSON versionado ──> página Astro ──> islas React ──> interfaz
                                      │
                                      └── localStorage (progreso local)
```

- **Astro** compone la ruta y el layout, y entrega contenido estático.
- **React** maneja el carrusel de estrenos, el calendario, filtros, orden y marcado de contenido visto.
- **JSON en `src/data/`** es la fuente de verdad de catálogo y estrenos. Se edita manualmente y se versiona junto al código.
- **`localStorage`** guarda un mapa versionado de estados de visionado por `id` estable (`watching` o `watched`). La ausencia de una entrada significa `unseen`. No es una fuente de catálogo ni un mecanismo de sincronización.

## Organización de código

`src/utils/` contiene lógica pura y reutilizable que no pertenece a un componente, hook, ruta ni integración de navegador. Sus módulos no importan React, no leen ni escriben `localStorage`, no crean temporizadores ni acceden al DOM; reciben datos explícitos y devuelven resultados deterministas y testeables.

- Agrupa utilidades por dominio del producto, con nombres específicos como `countdown-time.ts`; no crees archivos genéricos `helpers.ts`, `common.ts` o `utils.ts`.
- Cuando un dominio crezca y necesite varios módulos relacionados, crea una carpeta explícita —por ejemplo, `src/utils/progress/`— en vez de mezclarlo con dominios distintos.
- Los componentes y hooks conservan los efectos, estado y eventos; importan funciones desde `utils/`, pero una utilidad nunca depende de una capa de interfaz.
- Cada utilidad exportada declara sus tipos y mantiene pruebas unitarias que cubren sus decisiones. No se usa un índice global que oculte la procedencia de los módulos.

`src/services/` contiene fronteras explícitas con servicios del navegador. Por ahora, `viewing-status-storage.ts` es la única: serializa, recupera y elimina el mapa de progreso sin propagar errores de `localStorage`. Los hooks coordinan estos efectos después del montaje y los componentes no acceden al almacenamiento directamente.

## Contrato de datos objetivo

Cada ítem del calendario debe incluir `id`, `title`, `type` (`movie` o `series`), `week`, `dateRange`, `startDate`, `endDate`, `year` y `phase`. `id` es inmutable y es la única clave permitida para el progreso local.

Los estrenos deben incluir `id`, `title`, `targetDate` y, opcionalmente, un tema visual permitido. Las fechas se almacenan en ISO 8601.

## Límites de v1

No hay autenticación, backend, panel administrativo, integración de API, sincronización entre dispositivos ni datos obtenidos en tiempo de ejecución. Cambiar cualquiera de estos límites exige actualizar esta arquitectura, `PRODUCT_SENSE.md`, `FRONTEND.md` y los casos de uso afectados.

## Estado actual

La página Astro ya carga un carrusel React de cuenta regresiva. Existe una vista React de películas con persistencia local, pero no está conectada a la página y el JSON actual todavía no cumple el contrato unificado ni contiene series. Es deuda de v1, no comportamiento ya entregado.

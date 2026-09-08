# Plan de Cine MCU

Una aplicación personal para preparar un estreno del MCU. Reúne la cuenta regresiva de próximos estrenos con una ruta semanal de películas y series y con el progreso guardado en el navegador.

## Estructura

```text
src/
├── components/  Islas React para interacción
├── data/        Catálogo y estrenos versionados
├── layouts/     Estructura Astro compartida
├── pages/       Rutas Astro
└── styles/      Estilos de la interfaz
docs/use-cases/  Comportamiento observable del producto
skills/          Reglas operativas del harness
```

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` | Instala las dependencias. |
| `npm run dev` | Inicia el entorno local en `localhost:4321`. |
| `npm run build` | Genera la versión de producción en `./dist/`. |
| `npm run test` | Ejecuta las pruebas unitarias. |
| `npm run test:coverage` | Ejecuta las pruebas con cobertura. |

# Frontend

## Página principal

La ruta principal reúne dos áreas: próximos estrenos y calendario de visionado. El contenido estático se compone en Astro; las áreas que cambian por interacción se hidratan como islas React.

## Comportamientos requeridos de v1

- El carrusel permite consultar cada estreno próximo y muestra una cuenta regresiva hasta su fecha. En móvil muestra una sola tarjeta activa y coloca la navegación anterior/siguiente debajo de ella; en escritorio conserva las vistas previas laterales sin restar jerarquía al estreno activo.
- El calendario mezcla películas y series en una única secuencia semanal.
- La persona usuaria puede marcar un ítem como visto y ver el total, completados y porcentaje de avance.
- Puede filtrar por estado, tipo y fase, y ordenar por semana, título o fase.
- El progreso persiste en el dispositivo y una entrada local inválida no rompe la interfaz.
- La cuenta regresiva se renderiza con ceros durante SSR e hidratación; al montar en el navegador calcula de inmediato el tiempo real y después se actualiza cada segundo. Así el reloj del servidor y el cliente no producen HTML distinto durante la hidratación.

## Fronteras de componentes

- Componentes de presentación reciben datos y callbacks; no leen directamente `localStorage` ni mutan JSON.
- El contenedor interactivo posee filtros, orden y progreso; deriva las listas visibles y estadísticas sin mutar sus props.
- La capa de persistencia serializa exclusivamente una colección de `id` estables y tolera datos ausentes, JSON inválido y elementos que ya no existen.
- Los componentes de Astro pasan datos versionados a las islas sin duplicar fuentes de verdad.

## Estado actual

`SliderCountdown` y `CountdownTimer` están activos. `Movies` y `MovieCard` ya implementan una parte del progreso, filtros y orden, pero usan una clave derivada de semana y título, no soportan series/tipos/fases como filtros y no se renderizan desde la ruta principal. Toda evolución debe alinear el código con esta especificación.

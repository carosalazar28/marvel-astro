# Frontend

## Página principal

La ruta principal se presenta como **Plan de Cine MCU**: un encabezado estático explica que une la cuenta regresiva, la ruta de preparación y el progreso personal. Reúne las áreas de meta de estreno y plan de visionado. El contenido estático se compone en Astro; las áreas que cambian por interacción se hidratan como islas React.

## Comportamientos requeridos de v1

- El carrusel permite consultar cada estreno próximo y muestra una cuenta regresiva hasta su fecha. En móvil muestra una sola tarjeta activa y coloca la navegación anterior/siguiente debajo de ella; en escritorio conserva las vistas previas laterales sin restar jerarquía al estreno activo.
- La ruta de preparación muestra el contenido cronológico previo al estreno. Cada tarjeta informa título, tipo, fecha programada, estado inicial visible **Sin ver**, razón de relevancia y etiqueta textual **Atrasada** cuando su fecha ya pasó. Es lectura estática: no contiene controles ni persiste cambios.
- El calendario mezcla películas y series en una única secuencia semanal.
- La persona usuaria puede marcar un ítem como visto y ver el total, completados y porcentaje de avance.
- Puede filtrar por estado, tipo y fase, y ordenar por semana, título o fase.
- El progreso persiste en el dispositivo y una entrada local inválida no rompe la interfaz.
- El resumen de preparación recibe una ruta mediante `id` y `status`, elimina identificadores vacíos o duplicados al calcular y muestra porcentaje, completados, pendientes y un mensaje explícito cuando toda la ruta está vista. No posee catálogo ni persistencia.
- La cuenta regresiva se renderiza con ceros durante SSR e hidratación; al montar en el navegador calcula de inmediato el tiempo real y después se actualiza cada segundo. Así el reloj del servidor y el cliente no producen HTML distinto durante la hidratación.

## Fronteras de componentes

- Componentes de presentación reciben datos y callbacks; no leen directamente `localStorage` ni mutan JSON.
- El contenedor interactivo posee filtros, orden y progreso; deriva las listas visibles y estadísticas sin mutar sus props.
- `ReadinessSummary` es una presentación reutilizable: deriva el avance con `getReadinessSummary` a partir de props tipadas y deja el catálogo, las transiciones y `localStorage` a su futuro contenedor.
- La capa de persistencia serializa exclusivamente una colección de `id` estables y tolera datos ausentes, JSON inválido y elementos que ya no existen.
- Los componentes de Astro pasan datos versionados a las islas sin duplicar fuentes de verdad.
- `PreparationRoute` recibe únicamente ítems ya validados y avisos de validación; `parsePreparationRoute` conserva el límite entre contenido desconocido del JSON y props tipadas de interfaz.

## Estado actual

`CountdownTimer` y `PreparationRoute` están activos. La próxima historia añadirá las transiciones de estado y la persistencia por `id`; no debe convertir el catálogo JSON en estado mutable.

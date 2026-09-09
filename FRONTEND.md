# Frontend

## Página principal

La ruta principal se presenta como **Plan de Cine MCU**: un encabezado estático explica que une la cuenta regresiva, la ruta de preparación y el progreso personal. Reúne las áreas de meta de estreno y plan de visionado. El contenido estático se compone en Astro; las áreas que cambian por interacción se hidratan como islas React.

## Comportamientos requeridos de v1

- El carrusel permite consultar cada estreno próximo y muestra una cuenta regresiva hasta su fecha. En móvil muestra una sola tarjeta activa y coloca la navegación anterior/siguiente debajo de ella; en escritorio conserva las vistas previas laterales sin restar jerarquía al estreno activo.
- La ruta de preparación muestra el contenido cronológico previo al estreno. Cada tarjeta informa título, tipo, fecha programada, estado local visible (**Sin ver**, **Viendo** o **Vista**), razón de relevancia y etiqueta textual **Atrasada** cuando su fecha ya pasó. El control de cada tarjeta avanza de forma segura el estado y se deshabilita al llegar a **Vista**.
- El calendario mezcla películas y series en una única secuencia semanal.
- La persona usuaria puede avanzar cada ítem de `Sin ver` a `Viendo` y finalmente `Vista`; un ítem ya visto no retrocede por una acción repetida. Puede reiniciar su progreso local cuando la interfaz que muestra el plan lo exponga.
- Puede filtrar por estado o tipo, y ordenar por fecha programada o título. Los filtros no cambian el resumen ni el contenido JSON.
- El progreso persiste en el dispositivo y una entrada local inválida no rompe la interfaz.
- El resumen de preparación recibe una ruta mediante `id` y `status`, elimina identificadores vacíos o duplicados al calcular y muestra porcentaje, completados, pendientes y un mensaje explícito cuando toda la ruta está vista. No posee catálogo ni persistencia.
- La cuenta regresiva se renderiza con ceros durante SSR e hidratación; al montar en el navegador calcula de inmediato el tiempo real y después se actualiza cada segundo. Así el reloj del servidor y el cliente no producen HTML distinto durante la hidratación.

## Fronteras de componentes

- Componentes de presentación reciben datos y callbacks; no leen directamente `localStorage` ni mutan JSON.
- `PreparationTracker` es el contenedor interactivo: posee filtros, orden y progreso; deriva las listas visibles y estadísticas sin mutar sus props, y usa `useViewingStatus` como frontera con el navegador.
- La capa de persistencia serializa exclusivamente un mapa de estados por `id` estable, tolera datos ausentes, JSON inválido, elementos que ya no existen y errores de acceso sin bloquear la interfaz.
- `useViewingStatus` es la frontera React reutilizable para recuperar, avanzar y reiniciar el progreso; no renderiza la lista ni calcula métricas de preparación.
- `ReadinessSummary` es una presentación reutilizable: deriva el avance con `getReadinessSummary` a partir de props tipadas y deja el catálogo, las transiciones y `localStorage` a su futuro contenedor.
- Los componentes de Astro pasan datos versionados a las islas sin duplicar fuentes de verdad.
- `PreparationRoute` recibe únicamente ítems ya validados y avisos de validación; puede recibir el estado y callback del contenedor, pero nunca lee `localStorage`. `parsePreparationRoute` conserva el límite entre contenido desconocido del JSON y props tipadas de interfaz.

## Estado actual

`CountdownTimer` y `PreparationTracker` están activos. El tracker persiste solo el estado por `id`; no convierte el catálogo JSON en estado mutable. El calendario mensual será una historia separada.

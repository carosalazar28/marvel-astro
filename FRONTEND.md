# Frontend

## Página principal

La ruta principal abre con la meta de estreno: un hero visual local con rótulo, título, subtítulo, fecha y cuenta regresiva de cuatro unidades. Después reúne la ruta de preparación y el progreso personal. El contenido estático se compone en Astro; las áreas que cambian por interacción se hidratan como islas React.

## Comportamientos requeridos de v1

- El carrusel permite consultar cada estreno próximo y muestra una cuenta regresiva hasta su fecha. En móvil muestra una sola tarjeta activa y coloca la navegación anterior/siguiente debajo de ella; en escritorio conserva las vistas previas laterales sin restar jerarquía al estreno activo.
- La ruta de preparación muestra el contenido cronológico previo al estreno. Cada tarjeta informa una miniatura decorativa local compacta, alineada en la parte superior y con altura fluida acotada para no crecer con la tarjeta o el viewport, título, tipo, fecha programada, estado visible (**Sin ver**, **Viendo** o **Vista**), razón de relevancia y etiqueta textual **Atrasada** cuando una película pendiente ya pasó. El control de cada tarjeta avanza de forma segura el estado y se deshabilita al llegar a **Vista**. El estado inicial editorial puede ser **Vista** y el progreso local tiene prioridad solo cuando existe.
- El calendario mezcla películas y series en una única secuencia semanal.
- La persona usuaria puede avanzar cada ítem de `Sin ver` a `Viendo` y finalmente `Vista`; un ítem ya visto no retrocede por una acción repetida. La única acción de reinicio, **Reiniciar calendario completo**, guarda localmente todos los ids como `Sin ver`, incluida la base editorial marcada como `Vista`.
- Puede filtrar por estado o tipo, y ordenar por fecha programada o título. Los filtros no cambian el resumen ni el contenido JSON.
- El calendario mensual permite navegar entre meses, seleccionar cualquier día y consultar su contenido programado y estado local con texto. Los días con contenido se distinguen por cantidad y nombres accesibles, no solo por color. Un panel de próximas visualizaciones deriva el siguiente paso desde el día seleccionado.
- En móvil, una navegación adhesiva alterna las vistas de ruta y calendario sin borrar su estado. Desde 768 px, ambas vistas se organizan en dos columnas; los controles principales preservan áreas táctiles de al menos 44 px.
- El progreso persiste en el dispositivo y una entrada local inválida no rompe la interfaz.
- El resumen de preparación recibe una ruta mediante `id` y `status`, elimina identificadores vacíos o duplicados al calcular y muestra porcentaje, completados, pendientes y un mensaje explícito cuando toda la ruta está vista. No posee catálogo ni persistencia.
- La cuenta regresiva se renderiza con ceros durante SSR e hidratación; al montar en el navegador calcula de inmediato el tiempo real y después se actualiza cada segundo. Así el reloj del servidor y el cliente no producen HTML distinto durante la hidratación. Si recibe un recurso local, lo presenta como fondo decorativo fuera del árbol accesible y conserva el texto como fuente de información.

## Fronteras de componentes

- Componentes de presentación reciben datos y callbacks; no leen directamente `localStorage` ni mutan JSON.
- `PreparationTracker` es el contenedor interactivo: posee filtros, orden y progreso; deriva las listas visibles y estadísticas sin mutar sus props, usa `useViewingStatus` como frontera con el navegador y agrupa el resumen con la ruta en la columna izquierda del tracker de escritorio.
- La capa de persistencia serializa exclusivamente un mapa de estados por `id` estable, tolera datos ausentes, JSON inválido, elementos que ya no existen y errores de acceso sin bloquear la interfaz.
- `useViewingStatus` es la frontera React reutilizable para recuperar, avanzar y reiniciar el progreso; no renderiza la lista ni calcula métricas de preparación.
- `ReadinessSummary` es una presentación reutilizable: deriva el avance con `getReadinessSummary` a partir de props tipadas y deja el catálogo, las transiciones y `localStorage` a su futuro contenedor.
- Los componentes de Astro pasan datos versionados a las islas sin duplicar fuentes de verdad.
- `PreparationRoute` recibe únicamente ítems ya validados y avisos de validación; puede recibir el estado y callback del contenedor, pero nunca lee `localStorage`. `parsePreparationRoute` conserva el límite entre contenido desconocido del JSON y props tipadas de interfaz.
- `MonthlyCalendar` solo presenta la ruta y los estados que recibe: posee navegación y selección temporal, pero no escribe progreso ni edita el JSON. `monthly-calendar.ts` centraliza la cuadrícula UTC, navegación mensual y priorización cronológica.

## Estado actual

`CountdownTimer`, `PreparationTracker` y `MonthlyCalendar` están activos. El tracker persiste solo el estado por `id`; ni la ruta ni el calendario convierten el catálogo JSON en estado mutable.

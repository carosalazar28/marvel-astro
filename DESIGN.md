# Diseño

## Dirección visual

El producto se identifica como **Plan de Cine MCU**. Es un plan personal, oscuro y minimalista para preparar un estreno: la portada debe explicar primero la meta de estreno, después la ruta semanal y finalmente el progreso. La información domina sobre la decoración.

La identidad visual usa `#0D1020` como fondo, `#11152A` y `#1A1F3A` como superficies, `#717CFF` como acento principal, `#EEF0F7` para texto principal y `#96A0C5` para texto secundario. Inter se usa para lectura, Fraunces para el título del hero de estreno, Space Grotesk para títulos funcionales y JetBrains Mono para etiquetas o cifras temporales.

## Jerarquía

1. Meta de estreno elegida: hero cinematográfico local, rótulo, título, subtítulo, fecha y cuenta regresiva.
2. Ruta semanal y progreso personal.
3. Semana actual y contenido programado.
4. Estado de visto y porcentaje de avance.
5. Metadatos secundarios: tipo, fase, año y rango de fechas.

El hero de estreno es el primer bloque de la página. Su imagen decorativa local queda debajo de un degradado oscuro para preservar legibilidad, y sus cuatro unidades temporales se agrupan en celdas delimitadas; no depende de una imagen remota. La ruta de preparación se presenta como una lista cronológica de tarjetas. Cada tarjeta muestra una miniatura decorativa compacta, alineada al inicio y separada del borde, para que no ocupe toda la altura de la tarjeta; también muestra cápsulas textuales para tipo y estado inicial, la fecha con el elemento semántico `time`, y una frase breve de relevancia. Una fecha atrasada añade la etiqueta textual **Atrasada** además de su acento de color, para que el significado no dependa del color.

Cada tarjeta debe comunicar su estado sin depender únicamente del color. Los acentos pueden diferenciar estrenos, tipos o fases, pero siempre con texto, icono o etiqueta equivalente.

El resumen de preparación muestra el porcentaje, la cantidad completada y pendiente, y un mensaje textual. Cuando no hay ruta comunica ese estado; al completar todos los elementos declara explícitamente que la persona está lista para el estreno. Los selectores de filtro y orden, el reinicio local y el cambio de estado son controles con etiqueta visible, foco perceptible y una altura mínima de 40 px; si un filtro no produce resultados, se comunica con texto.

El calendario mensual usa una cuadrícula de lunes a domingo, botones reales para navegar o seleccionar días y un contorno visible para el día activo. Cada día con contenido escribe su cantidad; su nombre accesible añade títulos y estados para que el significado no dependa de color. Debajo, el detalle del día y el panel de próximas visualizaciones explican el contexto seleccionado.

## Responsive y accesibilidad básica

- La experiencia debe funcionar desde 320 px hasta escritorio sin ocultar contenido esencial.
- En pantallas de hasta 768 px, el carrusel presenta únicamente el estreno activo. Los botones anterior y siguiente ocupan una fila propia debajo de la tarjeta para evitar recortes y solapamiento con la cuenta regresiva; cada control conserva un área táctil mínima de 44 px.
- Desde escritorio, el estreno activo conserva la prioridad visual y puede estar acompañado por vistas previas laterales de los estrenos adyacentes.
- Usa HTML semántico, encabezados ordenados y botones reales para acciones.
- Todo control interactivo necesita nombre accesible; los iconos no sustituyen etiquetas.
- La navegación con teclado debe alcanzar carrusel, filtros, orden y marcado de visto; el foco ha de ser visible.
- Mantén contraste legible entre texto, superficie y estados. Respeta `prefers-reduced-motion` para animaciones no esenciales.
- En móvil, una barra adhesiva permite alternar entre **Películas** y **Calendario**; ambos controles miden al menos 44 px. Desde 768 px, ambas áreas aparecen simultáneamente en dos columnas sin ocultar acciones ni contexto.

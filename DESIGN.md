# Diseño

## Dirección visual

El producto se identifica como **Plan de Cine MCU**. Es un plan personal, oscuro y minimalista para preparar un estreno: la portada debe explicar primero la meta de estreno, después la ruta semanal y finalmente el progreso. La información domina sobre la decoración.

La identidad visual usa `#0D1020` como fondo, `#11152A` y `#1A1F3A` como superficies, `#717CFF` como acento principal, `#EEF0F7` para texto principal y `#96A0C5` para texto secundario. Inter se usa para lectura, Space Grotesk para títulos y JetBrains Mono para etiquetas o cifras temporales.

## Jerarquía

1. Identidad de Plan de Cine MCU y la meta de estreno elegida.
2. Cuenta regresiva y próximos estrenos.
3. Semana actual y contenido programado.
4. Estado de visto y porcentaje de avance.
5. Metadatos secundarios: tipo, fase, año y rango de fechas.

La ruta de preparación se presenta como una lista cronológica de tarjetas. Cada tarjeta muestra cápsulas textuales para tipo y estado inicial, la fecha con el elemento semántico `time`, y una frase breve de relevancia. Una fecha atrasada añade la etiqueta textual **Atrasada** además de su acento de color, para que el significado no dependa del color.

Cada tarjeta debe comunicar su estado sin depender únicamente del color. Los acentos pueden diferenciar estrenos, tipos o fases, pero siempre con texto, icono o etiqueta equivalente.

## Responsive y accesibilidad básica

- La experiencia debe funcionar desde 320 px hasta escritorio sin ocultar contenido esencial.
- En pantallas de hasta 768 px, el carrusel presenta únicamente el estreno activo. Los botones anterior y siguiente ocupan una fila propia debajo de la tarjeta para evitar recortes y solapamiento con la cuenta regresiva; cada control conserva un área táctil mínima de 44 px.
- Desde escritorio, el estreno activo conserva la prioridad visual y puede estar acompañado por vistas previas laterales de los estrenos adyacentes.
- Usa HTML semántico, encabezados ordenados y botones reales para acciones.
- Todo control interactivo necesita nombre accesible; los iconos no sustituyen etiquetas.
- La navegación con teclado debe alcanzar carrusel, filtros, orden y marcado de visto; el foco ha de ser visible.
- Mantén contraste legible entre texto, superficie y estados. Respeta `prefers-reduced-motion` para animaciones no esenciales.

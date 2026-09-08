# Diseño

## Dirección visual

El producto es un calendario minimalista: claro, sobrio y orientado a decidir qué ver esta semana. La información domina sobre la decoración. Se conserva la base visual existente de tema oscuro y tipografías Inter, Space Grotesk y JetBrains Mono, pero las decisiones futuras deben priorizar legibilidad y planificación.

## Jerarquía

1. Próximo contenido y fecha de estreno.
2. Semana actual y contenido programado.
3. Estado de visto y porcentaje de avance.
4. Metadatos secundarios: tipo, fase, año y rango de fechas.

Cada tarjeta debe comunicar su estado sin depender únicamente del color. Los acentos pueden diferenciar estrenos, tipos o fases, pero siempre con texto, icono o etiqueta equivalente.

## Responsive y accesibilidad básica

- La experiencia debe funcionar desde 320 px hasta escritorio sin ocultar contenido esencial.
- En pantallas de hasta 768 px, el carrusel presenta únicamente el estreno activo. Los botones anterior y siguiente ocupan una fila propia debajo de la tarjeta para evitar recortes y solapamiento con la cuenta regresiva; cada control conserva un área táctil mínima de 44 px.
- Desde escritorio, el estreno activo conserva la prioridad visual y puede estar acompañado por vistas previas laterales de los estrenos adyacentes.
- Usa HTML semántico, encabezados ordenados y botones reales para acciones.
- Todo control interactivo necesita nombre accesible; los iconos no sustituyen etiquetas.
- La navegación con teclado debe alcanzar carrusel, filtros, orden y marcado de visto; el foco ha de ser visible.
- Mantén contraste legible entre texto, superficie y estados. Respeta `prefers-reduced-motion` para animaciones no esenciales.

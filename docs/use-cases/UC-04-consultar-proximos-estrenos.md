# UC-04: Consultar próximos estrenos

**Actor:** persona usuaria local.

**Precondición:** existe al menos un estreno con fecha ISO válida.

**Flujo principal:** abre el carrusel, avanza o retrocede mediante botones o paginación y consulta la cuenta regresiva del estreno seleccionado.

**Resultado:** puede identificar el próximo estreno y el tiempo restante. Al cargar la página, la cuenta se actualiza después de la hidratación sin mostrar una advertencia de React ni reemplazar el árbol renderizado por el servidor.

**Casos límite:** cero o un estreno, fecha pasada, fecha inválida y navegación circular. Una fecha pasada muestra cero sin valores negativos; datos inválidos no provocan fallo de renderizado. El marcado inicial del contador es estable en SSR y cliente; el reloj solo se consulta tras hidratar la isla.

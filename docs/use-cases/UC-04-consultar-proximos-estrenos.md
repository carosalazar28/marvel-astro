# UC-04: Consultar próximos estrenos

**Actor:** persona usuaria local.

**Precondición:** existe al menos un estreno con fecha ISO válida.

**Flujo principal:** abre la portada, identifica el estreno objetivo, su fecha y la cuenta regresiva para completar su preparación.

**Resultado:** puede identificar el estreno objetivo y el tiempo restante. Al cargar la página, la cuenta se actualiza después de la hidratación sin mostrar una advertencia de React ni reemplazar el árbol renderizado por el servidor.

**Casos límite:** una fecha pasada sustituye el contador por un mensaje de estreno disponible, sin valores negativos; una fecha inválida muestra un error recuperable. El marcado inicial del contador es estable en SSR y cliente; el reloj solo se consulta tras hidratar la isla.

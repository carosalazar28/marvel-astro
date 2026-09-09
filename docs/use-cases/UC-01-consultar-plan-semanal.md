# UC-01: Consultar el plan semanal

**Actor:** persona usuaria local.

**Precondición:** la ruta JSON contiene ítems válidos con identificador estable, tipo, fecha programada, estado inicial y razón de relevancia.

**Flujo principal:** abre la página, consulta la ruta cronológica y reconoce el contenido programado, su tipo, fecha, estado inicial **Sin ver** y por qué es relevante antes del estreno.

**Resultado:** puede decidir qué contenido le corresponde ver sin calcular fechas ni mantener una lista externa. Si la fecha pasó, reconoce la señal textual **Atrasada**.

**Casos límite:** catálogo vacío; fechas no consecutivas; título largo; ítem de tipo desconocido, fecha inválida, identificador duplicado o razón ausente. Los datos inválidos se tratan de forma segura y visible, sin romper la página ni ocultar las entradas válidas.

# UC-01: Consultar el plan semanal

**Actor:** persona usuaria local.

**Precondición:** la ruta JSON contiene ítems válidos con identificador estable, tipo, fecha programada, estado inicial (`unwatched` o `watched`) y razón de relevancia.

**Flujo principal:** abre la página, consulta la ruta cronológica y reconoce el contenido programado, su tipo, fecha, estado local (**Sin ver**, **Viendo** o **Vista**) y por qué es relevante antes del estreno. Puede filtrar por estado o tipo y ordenar por fecha o título sin alterar el plan ni el resumen global.

**Resultado:** puede decidir qué contenido le corresponde ver sin calcular fechas ni mantener una lista externa. El plan asigna una película al sábado y, cuando hay dos, otra al domingo. Si una película pendiente ya pasó, reconoce la señal textual **Atrasada**; las películas editoriales ya vistas no se presentan como atrasadas.

**Casos límite:** catálogo vacío; fechas no consecutivas; título largo; ítem de tipo desconocido, fecha inválida, identificador duplicado o razón ausente. Los datos inválidos se tratan de forma segura y visible, sin romper la página ni ocultar las entradas válidas.

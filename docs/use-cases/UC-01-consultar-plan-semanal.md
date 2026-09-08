# UC-01: Consultar el plan semanal

**Actor:** persona usuaria local.

**Precondición:** el catálogo JSON contiene ítems válidos con identificador estable y semana.

**Flujo principal:** abre la página, consulta el calendario cronológico y reconoce el contenido programado para cada semana, incluidos su tipo y fase.

**Resultado:** puede decidir qué contenido le corresponde ver sin calcular fechas ni mantener una lista externa.

**Casos límite:** catálogo vacío; semanas no consecutivas; título largo; ítem de tipo desconocido o con fechas inválidas. Los datos inválidos se tratan de forma segura y visible, sin romper la página.

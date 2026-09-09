# UC-05: Recuperar progreso local

**Actor:** persona usuaria local.

**Precondición:** el navegador puede exponer o no una entrada de progreso previamente guardada.

**Flujo principal:** después de hidratar la interfaz, se lee el mapa de estados por identificador, se valida contra el catálogo actual y se deriva el progreso que mostrará el plan.

**Resultado:** el progreso válido se recupera sin mostrar detalles de almacenamiento a la persona usuaria.

**Casos límite:** clave inexistente, JSON malformado, valor que no es un mapa, estados desconocidos, identificadores obsoletos y error de acceso al almacenamiento. El estado inicial seguro es progreso vacío.

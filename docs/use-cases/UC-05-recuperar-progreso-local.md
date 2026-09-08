# UC-05: Recuperar progreso local

**Actor:** persona usuaria local.

**Precondición:** el navegador puede exponer o no una entrada de progreso previamente guardada.

**Flujo principal:** al hidratar la interfaz, se lee la colección de identificadores vistos, se valida contra el catálogo actual y se muestran las estadísticas resultantes.

**Resultado:** el progreso válido se recupera sin mostrar detalles de almacenamiento a la persona usuaria.

**Casos límite:** clave inexistente, JSON malformado, valor que no es colección, identificadores duplicados, identificadores obsoletos y error de acceso al almacenamiento. El estado inicial seguro es progreso vacío.

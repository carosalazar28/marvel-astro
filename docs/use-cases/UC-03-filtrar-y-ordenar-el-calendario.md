# UC-03: Filtrar y ordenar el calendario

**Actor:** persona usuaria local.

**Precondición:** la ruta contiene ítems con identificador estable, tipo, fecha programada y estado local.

**Flujo principal:** elige filtros por estado (**Sin ver**, **Viendo** o **Vista**) o tipo, y orden por fecha programada o título; la lista y el recuento reflejan las selecciones.

**Resultado:** encuentra rápidamente el subconjunto deseado sin alterar los datos originales ni su progreso.

**Casos límite:** combinación sin resultados, catálogo vacío, filtro reiniciado y valores de tipo no válidos. Un resultado vacío se explica con un estado visible y accesible. El filtrado y orden no modifican ni el catálogo JSON ni el progreso local.

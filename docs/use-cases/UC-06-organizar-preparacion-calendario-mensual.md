# UC-06: Organizar la preparación en el calendario mensual

**Actor:** persona usuaria local.

**Precondición:** la ruta JSON contiene ítems válidos con fecha programada e identificador estable; el navegador puede o no tener progreso local.

**Flujo principal:** consulta el mes de su preparación, navega al mes anterior o siguiente y selecciona un día. Cada día con contenido expone por texto la cantidad, los títulos y su estado local; el detalle confirma qué se programó para el día seleccionado. El panel de próximas visualizaciones prioriza el primer contenido desde ese día.

**Resultado:** puede organizar lo que debe ver sin perder el contexto del plan ni cambiar el catálogo o el progreso desde el calendario.

**Casos límite:** mes sin contenido, día sin contenido, varias visualizaciones el mismo día, ruta vacía, navegación entre años y estado local ausente. La interfaz conserva botones de mes y día accesibles, comunica los vacíos con texto y no depende solo de color o puntos para informar contenido o estado.

**Responsive:** en móvil, la persona alterna entre **Películas** y **Calendario** mediante controles adhesivos; en escritorio, ambas áreas permanecen visibles en dos columnas. El cambio de vista no borra filtros, progreso ni mes seleccionado.

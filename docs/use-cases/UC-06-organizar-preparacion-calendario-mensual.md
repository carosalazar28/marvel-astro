# UC-06: Organizar la preparación en el calendario mensual

**Actor:** persona usuaria local.

**Precondición:** la ruta JSON contiene ítems válidos con fecha programada e identificador estable; el navegador puede o no tener progreso local.

**Flujo principal:** consulta el mes de su preparación, navega al mes anterior o siguiente y selecciona un día. Cada día con contenido expone por texto la cantidad, los títulos y su estado local; el detalle confirma qué se programó para el día seleccionado. Al seleccionar un título del detalle, la aplicación muestra la vista de **Películas**, elimina cualquier filtro que ocultara ese contenido y enfoca su tarjeta para que pueda transicionar el estado. El panel de próximas visualizaciones prioriza el primer contenido desde ese día.

**Resultado:** puede organizar lo que debe ver y pasar directamente a marcarlo desde su tarjeta, sin cambiar el catálogo ni el progreso solo por navegar desde el calendario.

**Casos límite:** mes sin contenido, día sin contenido, varias visualizaciones el mismo día, ruta vacía, navegación entre años, estado local ausente y un filtro activo que oculta el contenido elegido. La interfaz conserva botones de mes y día accesibles, comunica los vacíos con texto y no depende solo de color o puntos para informar contenido o estado.

**Responsive:** en móvil, la persona alterna entre **Películas** y **Calendario** mediante controles adhesivos; en escritorio, ambas áreas permanecen visibles en dos columnas. El cambio de vista no borra filtros, progreso ni mes seleccionado.

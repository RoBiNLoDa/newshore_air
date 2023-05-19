# NewshoreAir
Este proyecto se generó con Angular CLI version 15.2.3.

## Development server

Cuando clones el repositorio haz un npm install.

Luego haz ng servepara iniciar el servidor e ingresa en el navegador la url http://localhost:4200/

## Construccion del Proyecto

### Desarrollo del punto 1

Se crea una carpeta src/app/models donde se crean las clases para dar solucíon al modelo propuesto en el punto 1 de la prueba (DIAGRAMA UML).

### Desarrollo del punto 2

Para desarrollar este punto, se creo una carpeta services que contiene dos archivos, uno llamado global con la URL Rutas múltiples y de retorno https://recruiting-api.newshore.es/api/flights/2 y un segundo archivo flights donde se mapean los datos obtenidos de la API.

### Desarrollo del punto 3

Para la solución de este punto se concentra la mayor parte de la lógica del proyecto, se crea un componente inicio para el formulario de busqueda, validaciones y obtención de los datos para ser mostrados al usuario. Estos datos son mostrados al usuario en un nuevo componente llamado vuelos, allí se muestra todo el itinerario del vuelo en el enlace detalles del vuelo.Tambien hago uso de una PIPE para obtener el nombre de ciudad para que sea mas clara la información para el usuario.

Para la busqueda de vuelos es necesario ingresar en los campos la sigla IATA (Tres letras en mayúscula de los destinos) para el campo origen y el campo destino, como referencia se anexaron imágenes con los destinos existentes en la API.

Como prueba de una ruta no existente se puede ingresar como origen o destino en uno de los campos la palabra LIM, se realizará la busqueda y como esta no está dentro de las rutas de la API, se mostrará mensaje de ruta no disponible al usuario.

Debajo de cada campo podran obervar las validaciones solicitadas en la prueba cuando se digitan valores no permitidos.

### Desarrollo del punto 4

Para la conversión de precios de los viajes se crea un select en la parte superior de la página con diferentes tipos de monedas, El usuario selecciona el tipo de moneada y este obtendrá inmediatamente la conversión de los valores de acuerdo a lo que ha seleccionado.
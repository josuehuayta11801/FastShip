# FastShip - API REST de gestión de envíos

## Descripción

FastShip es una API REST desarrollada para gestionar envíos de pedidos. Permite registrar, consultar, actualizar y eliminar envíos, utilizando MongoDB como base de datos.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Postman
- Visual Studio Code

## Requisitos previos

- Tener instalado Node.js y npm.
- Tener instalado MongoDB y su servicio en ejecución.
- Tener Postman para realizar las pruebas.

## Instalación

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/fastship
```

5. Iniciar el servidor:

```bash
node server.js
```

6. Acceder a la API:

http://localhost:3000

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/envios | Registrar un envío |
| GET | /api/envios | Consultar todos los envíos |
| GET | /api/envios/activos | Consultar envíos activos |
| GET | /api/envios/:id | Buscar un envío por ID |
| PUT | /api/envios/:id | Actualizar un envío |
| DELETE | /api/envios/:id | Eliminar un envío |

## Ejemplo de registro de envío

Método: POST

URL: http://localhost:3000/api/envios

Body en formato JSON:

```json
{
    "idPedido": "ENV001",
    "remitente": "Juan Perez",
    "destinatario": "Maria Lopez",
    "direccionEntrega": "Av. San Martin 123, Ica",
    "estado": "pendiente"
}
```

## Estados permitidos

- pendiente
- en tránsito
- entregado

## Validaciones y códigos HTTP

- 200 OK: Operación realizada correctamente.
- 201 Created: Envío registrado correctamente.
- 400 Bad Request: Datos no válidos.
- 404 Not Found: Envío no encontrado.
- 409 Conflict: ID del pedido duplicado.
- 500 Internal Server Error: Error interno del servidor.

## Evidencias

La carpeta `evidencias` contiene 13 capturas que demuestran la conexión con MongoDB, el funcionamiento de la API, las operaciones CRUD y las validaciones realizadas mediante Postman.

## Conclusión

El desarrollo de FastShip permitió implementar una API REST para gestionar envíos, aplicando operaciones CRUD, validación de datos, manejo de errores y conexión con una base de datos MongoDB.

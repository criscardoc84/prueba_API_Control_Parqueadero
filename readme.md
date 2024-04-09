# API de Parqueadero

Este es un API creado con Express.js que gestiona las plazas de un parqueadero de vehículos, permitiendo el registro de placas y tiempos de entrada. El parqueadero acepta tanto carros como motos, con un límite de 5 cupos para carros y 10 cupos para motos.

## Requisitos

- Node.js
- npm
- MySQL

## Instalación

1. Clona este repositorio:

git clone https://github.com/criscardoc84/prueba_API_Control_Parqueadero.git

2. Instala las dependencias: 

- express
- mysql
- body-parser

3. Configura la base de datos MySQL:

- Crea una base de datos en MySQL.
- Ejecuta el script `parqueaderodb_registros.sql` para crear la tabla necesaria.

4. Modifica la configuración de la base de datos en `api.js`

# Uso

El servidor estará escuchando en el puerto 3000 por defecto. Puedes enviar solicitudes HTTP a las siguientes rutas:

- GET /registros: Obtener todos los registros.
- POST /registros: Crear un nuevo registro. Se espera un cuerpo JSON con los campos "tipo" y "placa".
- PUT /registros/:id: Actualizar un registro existente. Se espera un cuerpo JSON con los campos a actualizar.
- DELETE /registros/:id: Eliminar un registro existente.

Asegúrate de reemplazar :id con el ID del registro correspondiente.

## Ejemplo de solicitud

Crear un nuevo registro

POST http://localhost:3000/registros

Body:
{
    "tipo": "carro",
    "placa": "ABC123"
}

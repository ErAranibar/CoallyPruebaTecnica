# Task Manager API

## Descripción del Proyecto

Este es el backend de la aplicación de gestión de tareas "Task Manager" creado por Erick Aranibar como parte de la prueba técnica para desarrollador full stack en Coally. Task Manager es una aplicación de gestión de tareas que permite a los usuarios crear, leer, actualizar y eliminar tareas. Los usuarios pueden marcar tareas como completadas o pendientes, y filtrarlas según su estado.

### Funcionalidades

- **Crear, leer, actualizar y eliminar tareas.**
- **Filtrar tareas** por estado (completadas o pendientes).
- **Marcar tareas** como completadas o pendientes.
- **Interfaz intuitiva** para gestionar las tareas.
- Desarrollado con **Express.js** y **MongoDB**.

## Despliegue

La aplicación está desplegada en Render y la base de datos está alojada en **MongoDB Atlas**.

- **Backend (API)**: [Enlace al backend desplegado](https://coallypruebatecnicabackend.onrender.com/)
  
## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Base de Datos**: MongoDB Atlas
- **Autenticación**: JWT
- **Validaciones**: express-validator
- **Documentación API**: Swagger
- **Pruebas**: Jest
- **Desarrollo**: TypeScript

## Instalación

### 1. Clonar el repositorio

```
git clone https://github.com/ErAranibar/CoallyPruebaTecnicaBackend
cd CoallyPruebaTecnicaBackend
```

### 2. Instalar dependencias

Asegúrate de tener **Node.js** y **npm** instalados en tu máquina.

```
npm install
```

### 3. Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

```
PORT=8080
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=TU_SECRET_JWT
```

### 4. Ejecutar el proyecto localmente

Para ejecutar el servidor localmente, utiliza:

```
npm run dev
```

Esto iniciará el servidor en modo desarrollo.

### 5. Ejecutar las pruebas

Para ejecutar las pruebas unitarias, usa el siguiente comando:

```
npm run test
```

## Documentación Swagger

La API está documentada usando **Swagger**. Puedes acceder a la documentación de la API a través del siguiente enlace:

- **Documentación Swagger**: [Swagger UI](https://coallypruebatecnicabackend.onrender.com/api-docs)

## Despliegue en Render

El backend está desplegado en Render y se conecta con MongoDB Atlas para almacenar las tareas. 

Para ver el proyecto en acción, puedes visitar la aplicación desplegada en el siguiente enlace:

- **Enlace al proyecto desplegado**: [Task Manager API en Render](https://coallypruebatecnicabackend.onrender.com/)

## Licencia

Este proyecto está bajo la Licencia MIT.
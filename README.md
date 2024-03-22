# Comparador de Compras

## Descripción
El Comparador de Compras es un servidor basado en Node.js y Express que proporciona una plataforma para comparar precios de productos entre diferentes tiendas en línea. Permite a los usuarios registrarse, iniciar sesión, y agregar productos a sus carritos de compra. Utiliza MongoDB como base de datos para almacenar la información de los usuarios, productos y carritos, y Cloudinary para el almacenamiento de imágenes. Además, ofrece funciones de autenticación con Baretoken, envío de correos electrónicos para verificación de cuentas y recuperación de contraseñas.

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- Cloudinary

## Características
- Autenticación con Baretoken
- Registro de usuarios con envío de correos de verificación
- Recuperación de contraseña mediante correo electrónico
- API para recibir y enviar datos
- Almacenamiento de imágenes en Cloudinary
- Comparador de precios de productos entre tiendas
- Generación y almacenamiento de carritos de compra
- Captura y almacenamiento de coordenadas geográficas de las tiendas

## Instalación
Para instalar y ejecutar el servidor localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install`.
3. Configura tu archivo `.env` con las variables de entorno necesarias, incluyendo la URL de la base de datos MongoDB y las claves de acceso de Cloudinary.
4. Inicia el servidor ejecutando `npm start`.

## Uso
El servidor ofrece una API RESTful para interactuar con las funcionalidades disponibles. Puedes consultar la documentación de la API para obtener más detalles sobre cómo utilizar cada ruta y función.

```json
// Ejemplo de solicitud HTTP POST para registrar un nuevo usuario
POST /api/users
Content-Type: application/json

{
    "name":"Felix",
    "lastName":"Santiago",
    "email":"correo2@correo.com",
    "password":"password"
   
}
```

## Contribución
¡Tus contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu función o corrección de errores (`git checkout -b feature/nueva-funcion`).
3. Haz tus cambios y realiza commit (`git commit -am 'Agrega una nueva función'`).
4. Empuja los cambios a tu repositorio en GitHub (`git push origin feature/nueva-funcion`).
5. Crea una nueva solicitud de extracción.



## Contacto
Para cualquier pregunta, comentario o colaboración relacionada con el proyecto, puedes contactar a Lenin a través del correo electrónico: lenin123333@hotmail.com

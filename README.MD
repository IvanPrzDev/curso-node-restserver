


# Node.js REST Server v6.0.0 - Cloudinary functionality

# Se ha añadido la funcion de subida de imágenes a CLOUDINARY. Se recomienda configurar su propio .env. Puede tomar de ejemplo .example.env

Este proyecto es una base para crear servidores RESTful con Node.js, Express y MongoDB (Mongoose). Incluye autenticación JWT, validación de roles, middlewares personalizados y conexión a MongoDB Atlas.




## Características

- Estructura modular para rutas, controladores, modelos y middlewares
- Autenticación con JWT
- Validación de roles y permisos
- Google Sign-In (autenticación con cuenta de Google)
- Creación, listado, actualización y borrado de categorías
- Creación, listado, actualización y borrado de productos
- Motor de búsqueda en colecciones (usuarios, categorías, productos)
- Subida y gestión de imágenes de usuarios y productos
- Carpeta `assets/` para imágenes por defecto (por ejemplo, `no-image.jpg`)
- Carpeta `uploads/` para almacenamiento local de imágenes subidas (con subcarpetas `products/` y `users/`)
- Manejo profesional de archivos ignorados en `.gitignore` (solo se suben archivos de estructura y documentación, no imágenes)
- Uso de variables de entorno con `dotenv`
- Conexión a MongoDB Atlas con Mongoose
- Validaciones con express-validator
- Fácil de extender y mantener
## Google Sign-In

Esta versión incluye autenticación con Google. Para usarla:

1. Configura el `GOOGLE_CLIENT_ID` en tu archivo `.env` y en Railway si es producción.
2. En el frontend, usa el botón de Google Sign-In y envía el token recibido al endpoint:
	 - `POST /api/auth/google` — Login/registro con Google
3. El backend validará el token y responderá con el usuario y un JWT propio.

Ejemplo de body para el endpoint:
```json
{
	"id_token": "TOKEN_DE_GOOGLE"
}
```


## Instalación

```bash
git clone https://github.com/IvanPrzDev/curso-node-restserver.git
cd curso-node-restserver
npm install
```


## Uso

1. Configura el archivo `.env` con tus variables (ejemplo: `PORT`, `MONGODB_ATLAS`, `SECRETORPRIVATEKEY`).
2. Inicia el servidor:

```bash
npm start
# o
node index.js
```

3. El servidor estará disponible en `http://localhost:8080` (o el puerto que definas).


## Estructura del proyecto

```
.
├── index.js
├── controllers/
├── models/
├── routes/
├── middlewares/
├── helpers/
├── public/
├── assets/
│   └── no-image.jpg
├── uploads/
│   ├── products/
│   │   ├── .gitkeep
│   │   └── README.md
│   └── users/
│       ├── .gitkeep
│       └── README.md
├── .env
├── package.json
└── README.md
```
## Manejo de imágenes y archivos en local

- Las imágenes subidas por usuarios y productos se almacenan en la carpeta `uploads/`.
- Si un usuario o producto no tiene imagen, se muestra la imagen por defecto ubicada en `assets/no-image.jpg`.
- El contenido de `uploads/products` y `uploads/users` está ignorado en el repositorio, pero se mantienen las carpetas y documentación mediante archivos `.gitkeep` y `README.md`.

Ejemplo de `.gitignore` para uploads:
```gitignore
uploads/products/*
uploads/users/*
!uploads/products/.gitkeep
!uploads/products/README.md
!uploads/users/.gitkeep
!uploads/users/README.md
```




## Endpoints de ejemplo

- `GET /api/users` — Listar usuarios
- `POST /api/users` — Crear usuario
- `PUT /api/users/:id` — Actualizar usuario
- `DELETE /api/users/:id` — Borrar usuario (requiere admin rol)
- `GET /api/categories` — Listar categorías
- `POST /api/categories` — Crear categoría
- `PUT /api/categories/:id` — Actualizar categoría
- `DELETE /api/categories/:id` — Borrar categoría (requiere admin rol)
- `GET /api/products` — Listar productos
- `POST /api/products` — Crear producto
- `PUT /api/products/:id` — Actualizar producto
- `DELETE /api/products/:id` — Borrar producto (requiere admin rol)
- `GET /api/search/:collection/:term` — Buscar en colecciones (usuarios, categorías, productos, roles)
- `POST /api/auth/login` — Login tradicional (email/password)
- `POST /api/auth/google` — Login/registro con Google

# Documentación POSTMAN - ENDPOINTS

https://ivanprzdev-4354039.postman.co/workspace/Iv%C3%A1n's-Workspace~a264dd15-f9be-484a-865e-1707f3e6a60f/collection/47454508-8b753292-ce53-43c5-8ab6-1cf30796ad5d?action=share&creator=47454508&active-environment=47454508-92706c9c-6d73-4871-b592-0a4bfb197d7f


## Personalización

Puedes agregar nuevas rutas, controladores, modelos, middlewares y helpers según las necesidades de tu proyecto.


## Licencia

ISC

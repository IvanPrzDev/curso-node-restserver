

# Node.js REST Server v4.0.0

Este proyecto es una base para crear servidores RESTful con Node.js, Express y MongoDB (Mongoose). Incluye autenticación JWT, validación de roles, middlewares personalizados y conexión a MongoDB Atlas.



## Características

- Estructura modular para rutas, controladores, modelos y middlewares
- Autenticación con JWT
- Validación de roles y permisos
- Google Sign-In (autenticación con cuenta de Google)
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
├── .env
├── package.json
└── README.md
```



## Endpoints de ejemplo

- `GET /api/users` — Listar usuarios
- `POST /api/users` — Crear usuario
- `PUT /api/users/:id` — Actualizar usuario
- `DELETE /api/users/:id` — Borrar usuario (requiere admin rol)
- `POST /api/auth/login` — Login tradicional (email/password)
- `POST /api/auth/google` — Login/registro con Google


## Personalización

Puedes agregar nuevas rutas, controladores, modelos, middlewares y helpers según las necesidades de tu proyecto.


## Licencia

ISC

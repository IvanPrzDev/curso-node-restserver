# Node.js REST Server Base

Este proyecto es una plantilla básica de servidor REST construido con Node.js y Express. Puedes usarlo como punto de partida para tus propios proyectos backend.

## Características

- Estructura modular para rutas y controladores
- Uso de variables de entorno con `dotenv`
- Listo para conectar con bases de datos
- Fácil de extender y mantener

## Instalación

```bash
git clone https://github.com/IvanPrzDev/curso-node-restserver.git
cd /ruta/donde/guardaste/el/proyecto
npm install
```

## Uso

1. Si ya tienes el archivo `.env`, revisa que contenga las variables necesarias (por ejemplo, el puerto).
2. Inicia el servidor con el comando correspondiente. Si no tienes un script `start`, usa:

```bash
node app.js || nodemon app
```

3. El servidor estará disponible en `http://localhost:8080` (o el puerto que definas).

## Estructura del proyecto

```
.
├── app.js
├── controllers/
├── models/
├── routes/
├── .env
├── package.json
└── README.md
```

## Endpoints de ejemplo

- `GET /user` — Devuelve un mensaje de prueba

## Personalización

Puedes agregar nuevas rutas, controladores y modelos según las necesidades de tu proyecto.

## Licencia

ISC

# 📖 PulseTasks - Backend

Documentación técnica del backend de la aplicación **PulseTasks**.

---

## Sobre el Proyecto

Este es el backend de la aplicación PulseTasks, desarrollado con **Node.js + Express**.  
La API es responsable de gestionar todas las operaciones de tareas (CRUD), siguiendo una **arquitectura por capas** bien definida.

**Estado actual:** En desarrollo (Fase 4/5)

---

## 🚀 Cómo Instalar y Ejecutar

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm (viene incluido con Node.js)

### Pasos de instalación

1. **Clonar el repositorio** (si aún no lo has hecho):

```bash
git clone https://github.com/valvesmarin/pulsetasks.git
cd pulsetasks
```

2. Entrar en la carpeta del backend:

cd server

3. Instalar las dependencias:

npm install

4. Ejecutar el servidor en modo desarrollo (recomendado):

npm run dev

El servidor se iniciará en el puerto 3000.
URL base de la API: http://localhost:3000

📌 Comandos Disponibles 

npm run dev, Ejecuta con nodemon (desarrollo)
npm start, Ejecuta en modo producción

🔗 Endpoints Principales
Tareas

GET /api/v1/tasks — Obtener todas las tareas
POST /api/v1/tasks — Crear una nueva tarea
PUT /api/v1/tasks/:id — Actualizar una tarea
DELETE /api/v1/tasks/:id — Eliminar una tarea
DELETE /api/v1/tasks/completed — Limpiar todas las tareas completadas
POST /api/v1/tasks/mark-all-completed — Marcar todas las tareas como completadas

Documentación Interactiva
Accede a la documentación completa de la API mediante Swagger UI:
→ http://localhost:3000/api-docs

🗂️ Estructura de Carpetas (Arquitectura por Capas)
textserver/
├── src/
│   ├── config/          # Configuraciones (env, base de datos, etc.)
│   ├── controllers/     # Lógica de los endpoints (controladores)
│   ├── routes/          # Definición de las rutas
│   ├── services/        # Reglas de negocio y lógica de datos
│   └── index.js         # Archivo principal del servidor
├── package.json
└── README.md

📝 Observaciones Importantes

Actualmente el backend utiliza almacenamiento en memoria (let tasks = []).
Los datos se pierden al reiniciar el servidor.
En fases futuras se integrará con MongoDB para persistencia real de datos.
El proyecto sigue buenas prácticas de separación de responsabilidades (arquitectura por capas).

👨‍💻 Autor
Vitor Marin
Alumno de la formación Full Stack
Abril 2026S
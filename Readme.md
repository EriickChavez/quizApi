# 🧠 QuizAPI

> Una API robusta construida con Express, TypeScript, MongoDB y arquitectura hexagonal para crear y gestionar quizzes interactivos.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](#)

## 📋 Tabla de Contenidos

- [🚀 Características](#-características)
- [🏗️ Arquitectura](#%EF%B8%8F-arquitectura)
- [⚡ Instalación Rápida](#-instalación-rápida)
- [🔧 Configuración](#-configuración)
- [📚 API Endpoints](#-api-endpoints)
- [🏃 Scripts Disponibles](#-scripts-disponibles)
- [🔒 Seguridad](#-seguridad)
- [📖 Documentación Detallada](#-documentación-detallada)
- [🤝 Contribuir](#-contribuir)

## 🚀 Características

- ✅ **API RESTful** con arquitectura hexagonal
- 🔐 **Autenticación JWT** segura
- 📊 **MongoDB** para persistencia de datos
- 🛡️ **Validación de datos** con Joi
- ⚡ **Rate limiting** para prevenir abuso
- 📝 **Logging** completo con Winston
- 🔒 **Seguridad** con Helmet y CORS
- 📱 **Interfaz web** incluida
- 🏗️ **Arquitectura limpia** con separación de responsabilidades
- 📦 **TypeScript** para tipado estático

## 🏗️ Arquitectura

Este proyecto sigue el patrón de **Arquitectura Hexagonal** (Ports and Adapters):

```
src/
├── config/          # Configuraciones de BD, JWT, etc.
├── controller/      # Controladores de rutas
├── middleware/      # Middlewares de Express
├── models/          # Modelos de MongoDB
├── repositories/    # Capa de acceso a datos
├── services/        # Lógica de negocio
├── routes/          # Definición de rutas
├── interfaces/      # Contratos TypeScript
├── utils/           # Utilidades
├── validations/     # Esquemas de validación
└── public/          # Archivos estáticos
```

## ⚡ Instalación Rápida

1. **Clonar el repositorio:**
```bash
git clone https://github.com/EriickChavez/quizApi.git
cd quizApi
```

2. **Instalar dependencias:**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar en desarrollo:**
```bash
npm run dev
```

🎉 **¡Listo!** La API estará disponible en `http://localhost:3000`

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000

# Base de datos
MONGO_URI=mongodb://localhost:27017/quizApi

# Autenticación
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=7d

# MySQL (Opcional - para uso futuro)
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=quizApi
```

### Base de Datos

Asegúrate de tener MongoDB ejecutándose:
```bash
# Con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# O instalar localmente
# https://www.mongodb.com/try/download/community
```

## 📚 API Endpoints

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |

### ❓ Quiz Management

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/quiz/getAll` | Obtener todos los quizzes |
| POST | `/api/quiz/create` | Crear nuevo quiz |
| POST | `/api/quiz/createMulti` | Crear múltiples quizzes |
| PUT | `/api/quiz/update/:id` | Actualizar quiz |
| DELETE | `/api/quiz/delete/:id` | Eliminar quiz |

### 🏷️ Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/category/all` | Obtener todas las categorías |
| GET | `/api/category/:id` | Obtener categoría por ID |
| POST | `/api/category/create` | Crear nueva categoría |
| POST | `/api/category/createMulti` | Crear múltiples categorías |
| PUT | `/api/category/update/:id` | Actualizar categoría |
| DELETE | `/api/category/delete/:id` | Eliminar categoría |

## 🏃 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Compilar TypeScript
npm run start        # Iniciar servidor de producción
npm run deploy       # Build + Start

# Utilidades
npm run clean        # Limpiar carpeta dist/
npm test             # Ejecutar tests (pendiente)
```

## 🔒 Seguridad

- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de Cross-Origin Resource Sharing
- **JWT**: Autenticación segura con tokens
- **Bcrypt**: Hash seguro de contraseñas
- **Validación**: Sanitización de datos de entrada

## 📖 Documentación Detallada

Puedes encontrar documentación más detallada en:

- [`docs/howDo.md`](./docs/howDo.md) - Cómo crear nuevos endpoints
- [`docs/question/create.md`](./docs/question/create.md) - Crear preguntas de quiz
- [`docs/api/`](./docs/api/) - Documentación completa de la API

### Ejemplo de Uso

**Crear un nuevo quiz:**
```bash
curl -X POST http://localhost:3000/api/quiz/create \
  -H "Content-Type: application/json" \
  -d '{
    "category": [{
      "id": "cat1",
      "category": "Deportes"
    }],
    "question": {
      "question": "¿Quién ganó el Mundial 2022?",
      "type": "multiple_choice"
    },
    "answers": [
      {"answer": "Argentina", "isCorrect": true, "type": "text"},
      {"answer": "Francia", "isCorrect": false, "type": "text"}
    ],
    "options": {
      "difficulty": "medium"
    }
  }'
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Erick Chavez**
- GitHub: [@EriickChavez](https://github.com/EriickChavez)
- Proyecto: [QuizAPI](https://github.com/EriickChavez/quizApi)

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!

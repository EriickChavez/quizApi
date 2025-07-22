# 📚 Documentación de QuizAPI

Bienvenido a la documentación completa de QuizAPI. Esta guía te ayudará a entender, configurar y usar la API de quizzes.

## 📋 Índice de Contenidos

### 🚀 Introducción y Setup
- [**README Principal**](../README.md) - Inicio rápido y configuración
- [**Arquitectura**](./architecture.md) - Diseño técnico del sistema
- [**Guía de Desarrollo**](./howDo.md) - Cómo crear nuevos endpoints

### 📡 Documentación de la API

#### Endpoints Principales
- [**🔐 Autenticación**](./api/auth.md) - Login, registro y manejo de tokens
- [**❓ Quizzes**](./api/quiz.md) - CRUD de preguntas y respuestas  
- [**🏷️ Categorías**](./api/categories.md) - Gestión de categorías de quizzes

#### Ejemplos Específicos
- [**Crear Pregunta**](./question/create.md) - Ejemplo detallado de creación

### 🛠️ Guías de Desarrollo

#### Para Desarrolladores
- [**Setup del Entorno**](#setup-del-entorno) - Configuración inicial
- [**Estructura del Código**](#estructura-del-código) - Organización de archivos
- [**Testing**](#testing) - Cómo ejecutar tests
- [**Deployment**](#deployment) - Guía de despliegue

---

## 🚀 Quick Start

### 1. Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/EriickChavez/quizApi.git
cd quizApi

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Tu Primera Request

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
  }'

# Crear quiz
curl -X POST http://localhost:3000/api/quiz/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "category": [{"id": "general", "category": "General"}],
    "question": {"question": "¿Capital de México?", "type": "text"},
    "answers": [{"answer": "Ciudad de México", "isCorrect": true, "type": "text"}],
    "options": {"difficulty": "easy"}
  }'
```

---

## 🏗️ Estructura del Proyecto

```
📦 quizApi/
├── 📄 README.md                 # Documentación principal
├── 📁 docs/                     # Documentación completa
│   ├── 📄 index.md             # Este archivo
│   ├── 📄 architecture.md      # Arquitectura técnica
│   ├── 📄 howDo.md            # Guía de desarrollo
│   ├── 📁 api/                 # Documentación de endpoints
│   └── 📁 question/            # Ejemplos específicos
├── 📁 src/                     # Código fuente
│   ├── 📁 config/              # Configuraciones
│   ├── 📁 controllers/         # Controladores HTTP
│   ├── 📁 services/            # Lógica de negocio
│   ├── 📁 repositories/        # Acceso a datos
│   ├── 📁 models/              # Modelos de BD
│   ├── 📁 routes/              # Rutas de la API
│   ├── 📁 middleware/          # Middlewares
│   ├── 📁 validations/         # Validaciones
│   └── 📁 public/              # Archivos estáticos
└── 📄 package.json             # Dependencias del proyecto
```

---

## 🔧 Setup del Entorno

### Variables de Entorno Requeridas

```env
# Servidor
PORT=3000

# Base de datos
MONGO_URI=mongodb://localhost:27017/quizapi

# Autenticación
JWT_SECRET=tu_clave_super_secreta
JWT_EXPIRES_IN=7d

# Opcional: MySQL (futuro uso)
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=quizapi
```

### Base de Datos

**MongoDB** (Requerido):
```bash
# Opción 1: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Opción 2: Instalación local
# Descargar desde: https://www.mongodb.com/try/download/community
```

### Verificación de Setup

```bash
# Verificar que MongoDB esté corriendo
mongosh --eval "db.runCommand({connectionStatus: 1})"

# Verificar variables de entorno
npm run dev

# Debería mostrar: "Server is running on port 3000"
```

---

## 🧪 Testing

### Ejecutar Tests (Pendiente de implementar)

```bash
# Tests unitarios
npm test

# Tests de integración
npm run test:integration

# Coverage
npm run test:coverage
```

### Testing Manual con cURL

```bash
# Test de registro
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "password": "123456"}'

# Test de login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "123456"}'
```

---

## 🚢 Deployment

### Build de Producción

```bash
# Compilar TypeScript
npm run build

# Iniciar en producción
npm run start

# O todo junto
npm run deploy
```

### Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb://your-production-db
JWT_SECRET=your-super-secure-secret
JWT_EXPIRES_IN=7d
```

### Docker (Futuro)

```dockerfile
# Dockerfile (ejemplo)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📖 Recursos Adicionales

### Stack Tecnológico

| Tecnología | Propósito | Documentación |
|------------|-----------|---------------|
| **Express.js** | Framework web | [docs](https://expressjs.com/) |
| **TypeScript** | Tipado estático | [docs](https://www.typescriptlang.org/) |
| **MongoDB** | Base de datos | [docs](https://docs.mongodb.com/) |
| **Mongoose** | ODM para MongoDB | [docs](https://mongoosejs.com/) |
| **JWT** | Autenticación | [docs](https://jwt.io/) |
| **Joi** | Validación | [docs](https://joi.dev/) |
| **Winston** | Logging | [docs](https://github.com/winstonjs/winston) |

### Herramientas Útiles

- **Postman**: Para testing de API
- **MongoDB Compass**: Cliente visual para MongoDB  
- **VS Code**: Editor recomendado
- **Thunder Client**: Extensión de VS Code para testing

### Extensiones de VS Code Recomendadas

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "rangav.vscode-thunder-client"
  ]
}
```

---

## 🤝 Contribución

### Workflow de Desarrollo

1. **Fork** del repositorio
2. **Clone** tu fork
3. **Branch** para nueva feature: `git checkout -b feature/mi-feature`
4. **Commit** cambios: `git commit -m 'Add: nueva funcionalidad'`
5. **Push**: `git push origin feature/mi-feature`
6. **Pull Request** al repositorio principal

### Estándares de Código

- **TypeScript**: Tipado estricto
- **ESLint**: Linting automático
- **Prettier**: Formateo consistente
- **Commits**: Formato convencional (`Add:`, `Fix:`, `Update:`)

### Testing Checklist

- [ ] Tests unitarios pasando
- [ ] Tests de integración pasando  
- [ ] Documentación actualizada
- [ ] Variables de entorno documentadas
- [ ] Ejemplos de uso incluidos

---

## ❓ FAQ

### ¿Cómo agregar un nuevo endpoint?

Sigue la guía en [`docs/howDo.md`](./howDo.md) para el proceso paso a paso.

### ¿Dónde están los logs?

Los logs se guardan en:
- `error.log`: Solo errores
- `combined.log`: Todos los logs

### ¿Cómo cambiar la base de datos?

Puedes cambiar fácilmente entre MongoDB y MySQL modificando los repositorios en `src/repositories/`.

### ¿La API soporta CORS?

Sí, CORS está habilitado por defecto para desarrollo. Para producción, configura dominios específicos.

---

## 📞 Soporte

- **GitHub Issues**: [Reportar bugs](https://github.com/EriickChavez/quizApi/issues)
- **Autor**: [@EriickChavez](https://github.com/EriickChavez)
- **Licencia**: MIT

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**

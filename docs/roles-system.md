# 👥 Sistema de Roles y Permisos - QuizAPI

Este documento describe el sistema completo de roles y permisos implementado en QuizAPI.

## 📋 Tabla de Contenidos

- [Roles Disponibles](#roles-disponibles)
- [Permisos del Sistema](#permisos-del-sistema)
- [Matriz de Permisos](#matriz-de-permisos)
- [Configuración Inicial](#configuración-inicial)
- [Endpoints de Autenticación](#endpoints-de-autenticación)
- [Middlewares de Autorización](#middlewares-de-autorización)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 🎭 Roles Disponibles

### 1. **Student** (Estudiante)
- **Descripción**: Usuario básico que puede tomar quizzes
- **Permisos**: Limitados a consumir contenido
- **Código**: `student`

### 2. **Teacher** (Profesor)
- **Descripción**: Usuario que puede crear y gestionar quizzes
- **Permisos**: Crear contenido educativo
- **Código**: `teacher`

### 3. **Moderator** (Moderador)
- **Descripción**: Usuario que puede moderar contenido y gestionar usuarios
- **Permisos**: Gestión de contenido y usuarios
- **Código**: `moderator`

### 4. **Admin** (Administrador)
- **Descripción**: Acceso completo al sistema
- **Permisos**: Todos los permisos disponibles
- **Código**: `admin`

## 🔐 Permisos del Sistema

### Permisos de Usuarios
- `create:user` - Crear usuarios
- `read:user` - Leer información de usuarios
- `update:user` - Actualizar usuarios
- `delete:user` - Eliminar usuarios
- `manage:users` - Gestión completa de usuarios

### Permisos de Quizzes
- `create:quiz` - Crear quizzes
- `read:quiz` - Leer quizzes
- `update:quiz` - Actualizar quizzes
- `delete:quiz` - Eliminar quizzes
- `manage:quizzes` - Gestión completa de quizzes

### Permisos de Categorías
- `create:category` - Crear categorías
- `read:category` - Leer categorías
- `update:category` - Actualizar categorías
- `delete:category` - Eliminar categorías
- `manage:categories` - Gestión completa de categorías

### Permisos de Administración
- `access:admin` - Acceso al panel administrativo
- `view:analytics` - Ver analíticas del sistema
- `moderate:content` - Moderar contenido

### Permisos de Quiz Taking
- `take:quiz` - Tomar quizzes
- `view:results` - Ver todos los resultados
- `view:own_results` - Ver resultados propios

## 📊 Matriz de Permisos

| Permiso | Student | Teacher | Moderator | Admin |
|---------|---------|---------|-----------|-------|
| **USUARIOS** |
| Leer usuarios | ❌ | ✅ | ✅ | ✅ |
| Crear usuarios | ❌ | ❌ | ✅ | ✅ |
| Actualizar usuarios | ❌ | ❌ | ✅ | ✅ |
| Eliminar usuarios | ❌ | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ✅ | ✅ |
| **QUIZZES** |
| Leer quizzes | ✅ | ✅ | ✅ | ✅ |
| Crear quizzes | ❌ | ✅ | ✅ | ✅ |
| Actualizar quizzes | ❌ | ✅* | ✅ | ✅ |
| Eliminar quizzes | ❌ | ✅* | ✅ | ✅ |
| Gestionar quizzes | ❌ | ❌ | ✅ | ✅ |
| **CATEGORÍAS** |
| Leer categorías | ✅ | ✅ | ✅ | ✅ |
| Crear categorías | ❌ | ✅ | ✅ | ✅ |
| Actualizar categorías | ❌ | ❌ | ✅ | ✅ |
| Eliminar categorías | ❌ | ❌ | ✅ | ✅ |
| **SISTEMA** |
| Tomar quizzes | ✅ | ✅ | ✅ | ✅ |
| Ver resultados propios | ✅ | ✅ | ✅ | ✅ |
| Ver todos los resultados | ❌ | ❌ | ✅ | ✅ |
| Panel administrativo | ❌ | ❌ | ❌ | ✅ |
| Ver analíticas | ❌ | ❌ | ✅ | ✅ |
| Moderar contenido | ❌ | ❌ | ✅ | ✅ |

> **Nota**: *Los teachers solo pueden actualizar/eliminar sus propios quizzes

## ⚙️ Configuración Inicial

### 1. Crear Usuario Administrador

```bash
# Crear el primer usuario admin
npm run create:admin

# O crear múltiples usuarios de prueba
npm run create:test-users
```

### 2. Variables de Entorno

Asegúrate de tener configuradas las variables de entorno en tu archivo `.env`:

```env
JWT_SECRET=tu_clave_super_secreta
JWT_EXPIRES_IN=7d
MONGO_URI=mongodb://localhost:27017/quizapi
```

## 🔗 Endpoints de Autenticación

### Registro Público
```bash
POST /api/auth/register
# Crea usuarios con rol 'student' por defecto
```

### Registro con Roles Específicos
```bash
# Solo admins pueden crear otros admins/moderators
POST /api/auth/register/admin        # Crear admin (solo admins)
POST /api/auth/register/moderator    # Crear moderator (solo admins)
POST /api/auth/register/teacher      # Crear teacher (admins y moderators)
```

### Login
```bash
POST /api/auth/login
# Funciona para todos los roles
```

### Información del Usuario
```bash
GET /api/auth/me
# Obtiene información del usuario autenticado
```

## 🛡️ Middlewares de Autorización

### Básicos
```typescript
// Verificar autenticación
authMiddleware

// Verificar rol específico
requireRole(USER_ROLES.ADMIN)
requireRole([USER_ROLES.ADMIN, USER_ROLES.MODERATOR])

// Verificar permiso específico
requirePermission(PERMISSIONS.CREATE_QUIZ)
```

### Avanzados
```typescript
// Verificar múltiples permisos (TODOS requeridos)
requireAllPermissions([PERMISSIONS.CREATE_QUIZ, PERMISSIONS.READ_CATEGORY])

// Verificar múltiples permisos (AL MENOS UNO requerido)  
requireAnyPermission([PERMISSIONS.UPDATE_QUIZ, PERMISSIONS.MANAGE_QUIZZES])

// Verificar propiedad o permisos administrativos
requireOwnershipOrAdmin('userId')
```

### Shortcuts Útiles
```typescript
requireAdmin                 // Solo administradores
requireAdminOrModerator      // Admins o moderadores
requireTeacherOrAbove        // Teachers, moderadores o admins
```

## 📝 Ejemplos de Uso

### 1. Registro de Estudiante
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Estudiante",
    "email": "juan@student.com",
    "password": "Student123!"
  }'
```

### 2. Registro de Profesor (por Admin)
```bash
curl -X POST http://localhost:3000/api/auth/register/teacher \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "María Profesora",
    "email": "maria@teacher.com",
    "password": "Teacher123!",
    "role": "teacher"
  }'
```

### 3. Login de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@student.com",
    "password": "Student123!"
  }'
```

### 4. Crear Quiz (como Teacher)
```bash
curl -X POST http://localhost:3000/api/quiz/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TEACHER_TOKEN" \
  -d '{
    "category": [{"id": "math", "category": "Matemáticas"}],
    "question": {"question": "¿Cuánto es 2+2?", "type": "multiple_choice"},
    "answers": [
      {"answer": "3", "isCorrect": false, "type": "text"},
      {"answer": "4", "isCorrect": true, "type": "text"}
    ],
    "options": {"difficulty": "easy"}
  }'
```

## 🚫 Manejo de Errores

### Error 401 - No Autenticado
```json
{
  "success": false,
  "message": "Authentication required",
  "error": {
    "code": "AUTH_REQUIRED",
    "details": "User must be authenticated to access this resource"
  }
}
```

### Error 403 - Sin Permisos
```json
{
  "success": false,
  "message": "Insufficient permissions",
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "details": "Required permission: create:quiz. User role: student does not have this permission"
  }
}
```

## 🔧 Personalización

### Agregar Nuevo Rol

1. **Actualizar enum de roles** (`src/enums/roles.ts`):
```typescript
export enum USER_ROLES {
  // ... roles existentes
  SUPERVISOR = 'supervisor'
}
```

2. **Definir permisos del rol**:
```typescript
export const ROLE_PERMISSIONS: Record<USER_ROLES, PERMISSIONS[]> = {
  // ... otros roles
  [USER_ROLES.SUPERVISOR]: [
    PERMISSIONS.READ_QUIZ,
    PERMISSIONS.VIEW_ANALYTICS,
    // ... otros permisos
  ]
};
```

3. **Actualizar validaciones** (`src/validations/authRoleValidation.ts`)

### Agregar Nuevo Permiso

1. **Definir permiso** (`src/enums/roles.ts`):
```typescript
export enum PERMISSIONS {
  // ... permisos existentes
  EXPORT_DATA = 'export:data'
}
```

2. **Asignar a roles apropiados**:
```typescript
[USER_ROLES.ADMIN]: [
  // ... otros permisos
  PERMISSIONS.EXPORT_DATA
]
```

3. **Usar en middleware**:
```typescript
router.get('/export', 
  authMiddleware,
  requirePermission(PERMISSIONS.EXPORT_DATA),
  exportController
);
```

## 🔍 Debugging

### Ver Permisos de un Rol
```typescript
import { getRolePermissions, USER_ROLES } from './src/enums/roles';

console.log('Teacher permissions:', getRolePermissions(USER_ROLES.TEACHER));
```

### Verificar Permiso
```typescript
import { hasPermission, USER_ROLES, PERMISSIONS } from './src/enums/roles';

const canCreate = hasPermission(USER_ROLES.TEACHER, PERMISSIONS.CREATE_QUIZ);
console.log('Teacher can create quiz:', canCreate);
```

## 📚 Recursos Adicionales

- [Documentación de Autenticación](./api/auth.md)
- [Arquitectura del Sistema](./architecture.md)
- [Guía de Desarrollo](./howDo.md)

---

## 🔒 Consideraciones de Seguridad

1. **Tokens JWT**: Incluyen información del rol del usuario
2. **Validación en Backend**: Todos los permisos se verifican en el servidor
3. **Principio de Menor Privilegio**: Los usuarios solo tienen los permisos mínimos necesarios
4. **Auditoría**: Los cambios de roles deberían ser auditados (implementación futura)
5. **Rotación de Secrets**: Cambia JWT_SECRET regularmente en producción

---

¡El sistema de roles está completamente implementado y listo para usar! 🎉

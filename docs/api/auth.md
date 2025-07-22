# 🔐 API de Autenticación

Esta documentación describe los endpoints de autenticación disponibles en QuizAPI.

## Base URL
```
http://localhost:3000/api/auth
```

## Endpoints

### 1. Registrar Usuario

**POST** `/register`

Crea una nueva cuenta de usuario en el sistema.

#### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)"
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "mipassword123"
  }'
```

#### Response Exitoso (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Errores Posibles

**400 - Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Email already exists"
  }
}
```

**500 - Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": {
    "code": "SERVER_ERROR",
    "details": "Error details here"
  }
}
```

### 2. Iniciar Sesión

**POST** `/login`

Autentica un usuario existente y devuelve un token JWT.

#### Request Body
```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "mipassword123"
  }'
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Errores Posibles

**401 - Unauthorized**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": {
    "code": "AUTH_ERROR",
    "details": "Email or password is incorrect"
  }
}
```

**400 - Bad Request**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Invalid email format"
  }
}
```

## Autenticación con JWT

Una vez que obtienes el token JWT de los endpoints de login o register, debes incluirlo en el header `Authorization` de tus requests a endpoints protegidos:

```bash
curl -X GET http://localhost:3000/api/protected-endpoint \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Formato del Token

El token JWT incluye la siguiente información:
- `userId`: ID del usuario autenticado
- `email`: Email del usuario
- `exp`: Fecha de expiración del token

### Expiración

Los tokens JWT tienen una expiración configurada en las variables de entorno (`JWT_EXPIRES_IN`). Después de expirar, será necesario hacer login nuevamente.

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Usuario creado exitosamente |
| 400 | Error de validación o solicitud malformada |
| 401 | Credenciales inválidas |
| 409 | Conflicto (ej: email ya existe) |
| 500 | Error interno del servidor |

## Rate Limiting

Todos los endpoints de autenticación están protegidos por rate limiting para prevenir ataques de fuerza bruta. Los límites actuales son:

- **Register**: Máximo 5 registros por IP cada 15 minutos
- **Login**: Máximo 10 intentos por IP cada 15 minutos

Si excedes estos límites, recibirás un error 429 (Too Many Requests).

## Seguridad

- Las contraseñas se almacenan hasheadas usando bcrypt
- Los tokens JWT están firmados con una clave secreta
- Se implementa rate limiting para prevenir ataques
- Headers de seguridad configurados con Helmet
- Validación estricta de datos de entrada

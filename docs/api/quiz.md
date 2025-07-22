# ❓ API de Quizzes

Esta documentación describe los endpoints para gestionar quizzes en QuizAPI.

## Base URL
```
http://localhost:3000/api/quiz
```

## Autenticación

Todos los endpoints de quiz requieren autenticación. Incluye el token JWT en el header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. Obtener Todos los Quizzes

**GET** `/getAll`

Obtiene una lista paginada de todos los quizzes disponibles.

#### Query Parameters (Opcionales)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `category`: Filtrar por ID de categoría
- `difficulty`: Filtrar por dificultad

#### Ejemplo de Request
```bash
curl -X GET "http://localhost:3000/api/quiz/getAll?page=1&limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Quizzes retrieved successfully",
  "data": {
    "quizzes": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "category": [
          {
            "id": "cat1",
            "category": "Deportes",
            "icon": "⚽"
          }
        ],
        "question": {
          "question": "¿Quién ganó el Mundial 2022?",
          "type": "multiple_choice"
        },
        "answers": [
          {
            "id": "ans1",
            "answer": "Argentina",
            "isCorrect": true,
            "type": "text"
          },
          {
            "id": "ans2",
            "answer": "Francia",
            "isCorrect": false,
            "type": "text"
          }
        ],
        "options": {
          "difficulty": "medium"
        },
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalQuizzes": 25,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### 2. Crear Quiz

**POST** `/create`

Crea un nuevo quiz en el sistema.

#### Request Body
```json
{
  "category": [
    {
      "id": "string (required)",
      "category": "string (required)",
      "icon": "string (optional)"
    }
  ],
  "question": {
    "question": "string (required)",
    "type": "string (required)" // "multiple_choice", "true_false", "text"
  },
  "answers": [
    {
      "answer": "string (required)",
      "isCorrect": "boolean (required)",
      "type": "string (required)"
    }
  ],
  "options": {
    "difficulty": "string (required)" // "easy", "medium", "hard"
  }
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/quiz/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "category": [{
      "id": "cat1",
      "category": "Historia",
      "icon": "📚"
    }],
    "question": {
      "question": "¿En qué año llegó Cristóbal Colón a América?",
      "type": "multiple_choice"
    },
    "answers": [
      {"answer": "1490", "isCorrect": false, "type": "text"},
      {"answer": "1492", "isCorrect": true, "type": "text"},
      {"answer": "1494", "isCorrect": false, "type": "text"},
      {"answer": "1496", "isCorrect": false, "type": "text"}
    ],
    "options": {
      "difficulty": "easy"
    }
  }'
```

#### Response Exitoso (201)
```json
{
  "success": true,
  "message": "Quiz created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "category": [{
      "id": "cat1",
      "category": "Historia",
      "icon": "📚"
    }],
    "question": {
      "question": "¿En qué año llegó Cristóbal Colón a América?",
      "type": "multiple_choice"
    },
    "answers": [
      {"id": "ans1", "answer": "1490", "isCorrect": false, "type": "text"},
      {"id": "ans2", "answer": "1492", "isCorrect": true, "type": "text"},
      {"id": "ans3", "answer": "1494", "isCorrect": false, "type": "text"},
      {"id": "ans4", "answer": "1496", "isCorrect": false, "type": "text"}
    ],
    "options": {
      "difficulty": "easy"
    },
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 3. Crear Múltiples Quizzes

**POST** `/createMulti`

Crea múltiples quizzes en una sola operación.

#### Request Body
```json
{
  "quizzes": [
    {
      "category": [...],
      "question": {...},
      "answers": [...],
      "options": {...}
    },
    // más quizzes...
  ]
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/quiz/createMulti \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "quizzes": [
      {
        "category": [{"id": "cat1", "category": "Ciencias"}],
        "question": {"question": "¿Cuál es la fórmula del agua?", "type": "text"},
        "answers": [{"answer": "H2O", "isCorrect": true, "type": "text"}],
        "options": {"difficulty": "easy"}
      },
      {
        "category": [{"id": "cat2", "category": "Matemáticas"}],
        "question": {"question": "¿Cuánto es 2 + 2?", "type": "multiple_choice"},
        "answers": [
          {"answer": "3", "isCorrect": false, "type": "text"},
          {"answer": "4", "isCorrect": true, "type": "text"}
        ],
        "options": {"difficulty": "easy"}
      }
    ]
  }'
```

#### Response Exitoso (201)
```json
{
  "success": true,
  "message": "Multiple quizzes created successfully",
  "data": {
    "created": 2,
    "quizzes": [
      // Array con los quizzes creados
    ]
  }
}
```

### 4. Actualizar Quiz

**PUT** `/update/:id`

Actualiza un quiz existente por su ID.

#### URL Parameters
- `id`: ID del quiz a actualizar

#### Request Body
```json
{
  "category": [...], // Opcional
  "question": {...}, // Opcional
  "answers": [...],  // Opcional
  "options": {...}   // Opcional
}
```

#### Ejemplo de Request
```bash
curl -X PUT http://localhost:3000/api/quiz/update/65f1a2b3c4d5e6f7g8h9i0j1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "question": {
      "question": "¿Quién ganó la Copa Mundial de Fútbol 2022?",
      "type": "multiple_choice"
    },
    "options": {
      "difficulty": "medium"
    }
  }'
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Quiz updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    // Quiz actualizado completo
  }
}
```

### 5. Eliminar Quiz

**DELETE** `/delete/:id`

Elimina un quiz existente por su ID.

#### URL Parameters
- `id`: ID del quiz a eliminar

#### Ejemplo de Request
```bash
curl -X DELETE http://localhost:3000/api/quiz/delete/65f1a2b3c4d5e6f7g8h9i0j1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Quiz deleted successfully",
  "data": {
    "deletedId": "65f1a2b3c4d5e6f7g8h9i0j1"
  }
}
```

## Tipos de Preguntas Soportados

### 1. Multiple Choice (`multiple_choice`)
Pregunta con múltiples opciones donde solo una es correcta.

### 2. True/False (`true_false`)
Pregunta de verdadero o falso.

### 3. Text (`text`)
Pregunta de respuesta abierta de texto.

## Niveles de Dificultad

- `easy`: Fácil
- `medium`: Medio
- `hard`: Difícil

## Errores Comunes

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Question is required"
  }
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized",
  "error": {
    "code": "AUTH_ERROR",
    "details": "Invalid or expired token"
  }
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Quiz not found",
  "error": {
    "code": "NOT_FOUND",
    "details": "Quiz with the specified ID does not exist"
  }
}
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Quiz creado exitosamente |
| 400 | Error de validación |
| 401 | No autorizado |
| 404 | Quiz no encontrado |
| 500 | Error interno del servidor |

## Paginación

Los endpoints que devuelven listas incluyen información de paginación:

```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalQuizzes": 100,
    "hasNext": true,
    "hasPrev": false,
    "limit": 10
  }
}
```

## Rate Limiting

- Máximo 100 requests por hora por usuario autenticado
- Máximo 10 creaciones de quiz por minuto por usuario

# 🏷️ API de Categorías

Esta documentación describe los endpoints para gestionar categorías de quizzes en QuizAPI.

## Base URL
```
http://localhost:3000/api/category
```

## Autenticación

Todos los endpoints de categorías requieren autenticación. Incluye el token JWT en el header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. Obtener Todas las Categorías

**GET** `/all`

Obtiene una lista de todas las categorías disponibles.

#### Query Parameters (Opcionales)
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 50)

#### Ejemplo de Request
```bash
curl -X GET "http://localhost:3000/api/category/all?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": {
    "categories": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
        "id": "cat1",
        "category": "Deportes",
        "icon": "⚽"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "id": "cat2",
        "category": "Historia",
        "icon": "📚"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
        "id": "cat3",
        "category": "Ciencias",
        "icon": "🔬"
      }
    ],
    "total": 3
  }
}
```

### 2. Obtener Categoría por ID

**GET** `/:id`

Obtiene una categoría específica por su ID.

#### URL Parameters
- `id`: ID de la categoría

#### Ejemplo de Request
```bash
curl -X GET http://localhost:3000/api/category/cat1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Category retrieved successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "id": "cat1",
    "category": "Deportes",
    "icon": "⚽"
  }
}
```

### 3. Crear Categoría

**POST** `/create`

Crea una nueva categoría en el sistema.

#### Request Body
```json
{
  "id": "string (required, unique)",
  "category": "string (required)",
  "icon": "string (optional)"
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/category/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "id": "cat4",
    "category": "Tecnología",
    "icon": "💻"
  }'
```

#### Response Exitoso (201)
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "id": "cat4",
    "category": "Tecnología",
    "icon": "💻"
  }
}
```

### 4. Crear Múltiples Categorías

**POST** `/createMulti`

Crea múltiples categorías en una sola operación.

#### Request Body
```json
{
  "categories": [
    {
      "id": "string (required, unique)",
      "category": "string (required)",
      "icon": "string (optional)"
    },
    // más categorías...
  ]
}
```

#### Ejemplo de Request
```bash
curl -X POST http://localhost:3000/api/category/createMulti \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "categories": [
      {
        "id": "cat5",
        "category": "Arte",
        "icon": "🎨"
      },
      {
        "id": "cat6",
        "category": "Música",
        "icon": "🎵"
      },
      {
        "id": "cat7",
        "category": "Cine",
        "icon": "🎬"
      }
    ]
  }'
```

#### Response Exitoso (201)
```json
{
  "success": true,
  "message": "Multiple categories created successfully",
  "data": {
    "created": 3,
    "categories": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
        "id": "cat5",
        "category": "Arte",
        "icon": "🎨"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j6",
        "id": "cat6",
        "category": "Música",
        "icon": "🎵"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j7",
        "id": "cat7",
        "category": "Cine",
        "icon": "🎬"
      }
    ]
  }
}
```

### 5. Actualizar Categoría

**PUT** `/update/:id`

Actualiza una categoría existente por su ID.

#### URL Parameters
- `id`: ID de la categoría a actualizar

#### Request Body
```json
{
  "category": "string (optional)",
  "icon": "string (optional)"
}
```

#### Ejemplo de Request
```bash
curl -X PUT http://localhost:3000/api/category/update/cat1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "category": "Deportes y Recreación",
    "icon": "🏆"
  }'
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Category updated successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "id": "cat1",
    "category": "Deportes y Recreación",
    "icon": "🏆"
  }
}
```

### 6. Eliminar Categoría

**DELETE** `/delete/:id`

Elimina una categoría existente por su ID.

> **⚠️ Advertencia**: Al eliminar una categoría, todos los quizzes asociados a esa categoría también pueden verse afectados.

#### URL Parameters
- `id`: ID de la categoría a eliminar

#### Ejemplo de Request
```bash
curl -X DELETE http://localhost:3000/api/category/delete/cat4 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response Exitoso (200)
```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "deletedId": "cat4",
    "deletedCategory": "Tecnología"
  }
}
```

## Categorías Predeterminadas

El sistema viene con estas categorías predeterminadas:

| ID | Categoría | Icono | Descripción |
|----|-----------|-------|-------------|
| `sports` | Deportes | ⚽ | Preguntas sobre deportes y atletismo |
| `history` | Historia | 📚 | Preguntas sobre eventos históricos |
| `science` | Ciencias | 🔬 | Preguntas sobre física, química, biología |
| `geography` | Geografía | 🌍 | Preguntas sobre países, capitales, geografía |
| `entertainment` | Entretenimiento | 🎭 | Preguntas sobre cine, música, TV |
| `technology` | Tecnología | 💻 | Preguntas sobre informática y tecnología |
| `art` | Arte | 🎨 | Preguntas sobre arte y cultura |
| `literature` | Literatura | 📖 | Preguntas sobre libros y literatura |

## Validaciones

### Creación de Categoría
- `id`: Debe ser único, alfanumérico, sin espacios
- `category`: Mínimo 2 caracteres, máximo 50 caracteres
- `icon`: Opcional, máximo 2 caracteres (para emojis)

### Actualización de Categoría
- No se puede cambiar el `id` de una categoría existente
- `category`: Mínimo 2 caracteres, máximo 50 caracteres
- `icon`: Opcional, máximo 2 caracteres

## Errores Comunes

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "Category name is required"
  }
}
```

### 409 - Conflict
```json
{
  "success": false,
  "message": "Category already exists",
  "error": {
    "code": "DUPLICATE_ERROR",
    "details": "A category with this ID already exists"
  }
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Category not found",
  "error": {
    "code": "NOT_FOUND",
    "details": "Category with the specified ID does not exist"
  }
}
```

## Uso en Quizzes

Las categorías se utilizan en los quizzes de la siguiente manera:

```json
{
  "category": [
    {
      "id": "sports",
      "category": "Deportes",
      "icon": "⚽"
    }
  ]
}
```

### Múltiples Categorías
Un quiz puede pertenecer a múltiples categorías:

```json
{
  "category": [
    {
      "id": "sports",
      "category": "Deportes",
      "icon": "⚽"
    },
    {
      "id": "history",
      "category": "Historia",
      "icon": "📚"
    }
  ]
}
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Categoría creada exitosamente |
| 400 | Error de validación |
| 401 | No autorizado |
| 404 | Categoría no encontrada |
| 409 | Conflicto (categoría ya existe) |
| 500 | Error interno del servidor |

## Rate Limiting

- Máximo 50 requests por minuto por usuario autenticado
- Máximo 10 creaciones de categoría por minuto por usuario

## Mejores Prácticas

1. **IDs Descriptivos**: Usa IDs descriptivos y en inglés para mejor compatibilidad
   ```json
   {"id": "computer_science", "category": "Ciencias de la Computación"}
   ```

2. **Iconos Consistentes**: Usa emojis consistentes que representen bien la categoría

3. **Nombres Claros**: Los nombres de categorías deben ser claros y específicos

4. **Organización**: Evita crear demasiadas categorías similares, prefiere agrupar conceptos relacionados

# 🏗️ Arquitectura del Proyecto

Este documento describe la arquitectura técnica de QuizAPI, siguiendo el patrón de **Arquitectura Hexagonal** (Ports and Adapters).

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Estructura de Directorios](#estructura-de-directorios)
- [Capas de la Arquitectura](#capas-de-la-arquitectura)
- [Patrones de Diseño](#patrones-de-diseño)
- [Base de Datos](#base-de-datos)
- [Middlewares](#middlewares)
- [Manejo de Errores](#manejo-de-errores)
- [Seguridad](#seguridad)

## Visión General

QuizAPI utiliza **Arquitectura Hexagonal** para lograr:

- ✅ **Separación de responsabilidades**
- ✅ **Testabilidad**
- ✅ **Flexibilidad** para cambiar implementaciones
- ✅ **Mantenibilidad** del código
- ✅ **Escalabilidad** de la aplicación

```
┌─────────────────────────────────────────────────────────┐
│                    Interfaz Web                         │
│                   (Express Routes)                      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Controladores                           │
│            (HTTP Request/Response)                      │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   Servicios                            │
│                (Lógica de Negocio)                     │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                 Repositorios                           │
│               (Acceso a Datos)                         │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                   Base de Datos                        │
│                    (MongoDB)                           │
└─────────────────────────────────────────────────────────┘
```

## Estructura de Directorios

```
src/
├── 📁 config/              # Configuraciones
│   ├── ENV.ts              # Variables de entorno
│   ├── db.ts               # Conexión a base de datos
│   ├── jwt.ts              # Configuración JWT
│   └── auth.ts             # Configuración de autenticación
│
├── 📁 interfaces/          # Contratos TypeScript
│   ├── IUser.ts            # Interface de Usuario
│   ├── IQuiz.ts            # Interface de Quiz
│   ├── ICategory.ts        # Interface de Categoría
│   └── IScore.ts           # Interface de Puntuación
│
├── 📁 models/              # Modelos de MongoDB
│   ├── userModel.ts        # Esquema de Usuario
│   ├── quizModel.ts        # Esquema de Quiz
│   └── categoryModel.ts    # Esquema de Categoría
│
├── 📁 repositories/        # Capa de Acceso a Datos
│   ├── interfaces/         # Contratos de repositorios
│   │   ├── IUserRepository.ts
│   │   ├── IQuizRepository.ts
│   │   └── ICategoryRepository.ts
│   └── mongodb/            # Implementación MongoDB
│       ├── userRepository.ts
│       ├── quizRepository.ts
│       └── categoryMongoRepository.ts
│
├── 📁 services/            # Lógica de Negocio
│   ├── auth/               # Servicios de autenticación
│   ├── quiz/               # Servicios de quiz
│   ├── category/           # Servicios de categoría
│   └── instances/          # Instancias de servicios
│
├── 📁 controller/          # Controladores HTTP
│   ├── auth/               # Controladores de auth
│   ├── quiz/               # Controladores de quiz
│   └── category/           # Controladores de categoría
│
├── 📁 routes/              # Definición de rutas
│   ├── index.ts            # Router principal
│   ├── authRoutes.ts       # Rutas de autenticación
│   ├── quizRoutes.ts       # Rutas de quiz
│   └── categoryRoutes.ts   # Rutas de categoría
│
├── 📁 middleware/          # Middlewares
│   ├── authMiddleware.ts   # Autenticación JWT
│   ├── errorHandler.ts     # Manejo de errores
│   ├── logger.ts           # Logging
│   └── rateLimiter.ts      # Límite de requests
│
├── 📁 validations/         # Validación de datos
│   ├── authValidation.ts   # Validaciones de auth
│   └── quiz.validation.ts  # Validaciones de quiz
│
├── 📁 exceptions/          # Manejo de excepciones
│   ├── ApiError.ts         # Error de API
│   ├── ValidationError.ts  # Error de validación
│   └── errorHandler.ts     # Handler global
│
├── 📁 utils/               # Utilidades
│   └── apiResponse.ts      # Respuestas estandarizadas
│
└── 📁 public/              # Archivos estáticos
    ├── index.html          # Página de inicio
    ├── css/styles.css      # Estilos
    └── js/scripts.js       # Scripts frontend
```

## Capas de la Arquitectura

### 1. **Capa de Presentación** (Routes + Controllers)

**Responsabilidades:**
- Manejo de requests HTTP
- Validación de entrada
- Serialización de respuestas
- Autenticación y autorización

```typescript
// Ejemplo: authController.ts
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authServiceInstance.login(email, password);
    sendResponse(res, 200, "Login successful", result);
  } catch (error: any) {
    sendResponse(res, 401, error.message, null, {
      code: "AUTH_001",
      details: error.message,
    });
  }
};
```

### 2. **Capa de Aplicación** (Services)

**Responsabilidades:**
- Lógica de negocio
- Orquestación entre repositorios
- Validaciones de negocio
- Transformaciones de datos

```typescript
// Ejemplo: authService.ts
export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new Error("Invalid password");
    
    const token = generateJWT(user);
    return { user, token };
  }
}
```

### 3. **Capa de Infraestructura** (Repositories)

**Responsabilidades:**
- Acceso a datos
- Implementación de persistencia
- Mapeo de entidades
- Queries a la base de datos

```typescript
// Ejemplo: userRepository.ts
export class UserMongoRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email }).exec();
  }

  async create(userData: Omit<IUser, '_id'>): Promise<IUserDocument> {
    const user = new UserModel(userData);
    return await user.save();
  }
}
```

## Patrones de Diseño

### 1. **Dependency Injection**

Las dependencias se inyectan en los constructores para facilitar testing y flexibilidad:

```typescript
// services/instances/authServiceInstance.ts
const userRepository = new UserMongoRepository();
export const authServiceInstance = new AuthService(userRepository);
```

### 2. **Repository Pattern**

Abstrae el acceso a datos con interfaces:

```typescript
export interface IUserRepository {
  findByEmail(email: string): Promise<IUserDocument | null>;
  create(user: Omit<IUser, '_id'>): Promise<IUserDocument>;
  findById(id: string): Promise<IUserDocument | null>;
}
```

### 3. **Service Layer Pattern**

Encapsula la lógica de negocio:

```typescript
export class QuizService {
  constructor(private quizRepository: IQuizRepository) {}
  
  async createQuiz(quizData: CreateQuizData): Promise<IQuiz> {
    // Lógica de validación y creación
    return await this.quizRepository.create(quizData);
  }
}
```

## Base de Datos

### MongoDB con Mongoose

```typescript
// models/userModel.ts
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: String,
}, {
  timestamps: true
});

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
```

### Estructura de Documentos

```typescript
// Quiz Document
{
  _id: ObjectId,
  category: [
    { id: "sports", category: "Deportes", icon: "⚽" }
  ],
  question: {
    question: "¿Quién ganó el Mundial 2022?",
    type: "multiple_choice"
  },
  answers: [
    { id: "1", answer: "Argentina", isCorrect: true, type: "text" }
  ],
  options: {
    difficulty: "medium"
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Middlewares

### 1. **Autenticación**
```typescript
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

### 2. **Rate Limiting**
```typescript
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});
```

### 3. **Error Handling**
```typescript
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: { code: 'VALIDATION_ERROR', details: err.details }
    });
  }
  // ... otros tipos de error
};
```

## Manejo de Errores

### Jerarquía de Errores

```typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public readonly details: string) {
    super(message, 400);
  }
}
```

### Respuestas Estandarizadas

```typescript
export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: any = null
) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    error,
    timestamp: new Date().toISOString()
  });
};
```

## Seguridad

### 1. **Autenticación JWT**
- Tokens firmados con secret key
- Expiración configurable
- Refresh token (futuro)

### 2. **Validación de Datos**
```typescript
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
```

### 3. **Rate Limiting**
- Límites por IP
- Límites por usuario autenticado
- Ventanas deslizantes

### 4. **Headers de Seguridad**
```typescript
app.use(helmet()); // Configura headers de seguridad
app.use(cors());   // Configura CORS
```

## Configuración de Entornos

```typescript
// config/ENV.ts
export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/quizapi',
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
```

## Logging

```typescript
// middleware/logger.ts
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Flujo de una Request

```
1. HTTP Request → Express Router
2. Router → Middleware (auth, validation)
3. Middleware → Controller
4. Controller → Service (business logic)
5. Service → Repository (data access)
6. Repository → MongoDB
7. MongoDB → Repository (data)
8. Repository → Service (processed data)
9. Service → Controller (result)
10. Controller → HTTP Response
```

Esta arquitectura proporciona una base sólida, escalable y mantenible para QuizAPI.

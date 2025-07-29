/**
 * Enum que define los roles disponibles en el sistema
 */
export enum USER_ROLES {
  ADMIN = 'admin',           // Administrador - Acceso completo
  MODERATOR = 'moderator',   // Moderador - Puede gestionar contenido
  TEACHER = 'teacher',       // Profesor - Puede crear y gestionar quizzes
  STUDENT = 'student'        // Estudiante - Puede tomar quizzes
}

/**
 * Enum que define los permisos específicos del sistema
 */
export enum PERMISSIONS {
  // Permisos de usuarios
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  MANAGE_USERS = 'manage:users',

  // Permisos de quizzes
  CREATE_QUIZ = 'create:quiz',
  READ_QUIZ = 'read:quiz',
  UPDATE_QUIZ = 'update:quiz',
  DELETE_QUIZ = 'delete:quiz',
  MANAGE_QUIZZES = 'manage:quizzes',

  // Permisos de categorías
  CREATE_CATEGORY = 'create:category',
  READ_CATEGORY = 'read:category',
  UPDATE_CATEGORY = 'update:category',
  DELETE_CATEGORY = 'delete:category',
  MANAGE_CATEGORIES = 'manage:categories',

  // Permisos de administración
  ADMIN_PANEL = 'access:admin',
  VIEW_ANALYTICS = 'view:analytics',
  MODERATE_CONTENT = 'moderate:content',

  // Permisos de quiz taking
  TAKE_QUIZ = 'take:quiz',
  VIEW_RESULTS = 'view:results',
  VIEW_OWN_RESULTS = 'view:own_results'
}

/**
 * Mapa de roles a permisos
 */
export const ROLE_PERMISSIONS: Record<USER_ROLES, PERMISSIONS[]> = {
  [USER_ROLES.ADMIN]: [
    // Todos los permisos
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.MANAGE_USERS,
    
    PERMISSIONS.CREATE_QUIZ,
    PERMISSIONS.READ_QUIZ,
    PERMISSIONS.UPDATE_QUIZ,
    PERMISSIONS.DELETE_QUIZ,
    PERMISSIONS.MANAGE_QUIZZES,
    
    PERMISSIONS.CREATE_CATEGORY,
    PERMISSIONS.READ_CATEGORY,
    PERMISSIONS.UPDATE_CATEGORY,
    PERMISSIONS.DELETE_CATEGORY,
    PERMISSIONS.MANAGE_CATEGORIES,
    
    PERMISSIONS.ADMIN_PANEL,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MODERATE_CONTENT,
    
    PERMISSIONS.TAKE_QUIZ,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_OWN_RESULTS
  ],

  [USER_ROLES.MODERATOR]: [
    // Puede gestionar contenido y ver usuarios
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    
    PERMISSIONS.CREATE_QUIZ,
    PERMISSIONS.READ_QUIZ,
    PERMISSIONS.UPDATE_QUIZ,
    PERMISSIONS.DELETE_QUIZ,
    PERMISSIONS.MANAGE_QUIZZES,
    
    PERMISSIONS.CREATE_CATEGORY,
    PERMISSIONS.READ_CATEGORY,
    PERMISSIONS.UPDATE_CATEGORY,
    PERMISSIONS.DELETE_CATEGORY,
    
    PERMISSIONS.MODERATE_CONTENT,
    PERMISSIONS.VIEW_ANALYTICS,
    
    PERMISSIONS.TAKE_QUIZ,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_OWN_RESULTS
  ],

  [USER_ROLES.TEACHER]: [
    // Puede crear y gestionar sus propios quizzes
    PERMISSIONS.READ_USER,
    
    PERMISSIONS.CREATE_QUIZ,
    PERMISSIONS.READ_QUIZ,
    PERMISSIONS.UPDATE_QUIZ,
    PERMISSIONS.DELETE_QUIZ, // Solo sus propios quizzes
    
    PERMISSIONS.READ_CATEGORY,
    PERMISSIONS.CREATE_CATEGORY, // Puede crear categorías
    
    PERMISSIONS.TAKE_QUIZ,
    PERMISSIONS.VIEW_RESULTS,
    PERMISSIONS.VIEW_OWN_RESULTS
  ],

  [USER_ROLES.STUDENT]: [
    // Solo puede tomar quizzes y ver sus resultados
    PERMISSIONS.READ_QUIZ,
    PERMISSIONS.READ_CATEGORY,
    PERMISSIONS.TAKE_QUIZ,
    PERMISSIONS.VIEW_OWN_RESULTS
  ]
};

/**
 * Función helper para verificar si un rol tiene un permiso específico
 */
export const hasPermission = (role: USER_ROLES, permission: PERMISSIONS): boolean => {
  return ROLE_PERMISSIONS[role].includes(permission);
};

/**
 * Función helper para obtener todos los permisos de un rol
 */
export const getRolePermissions = (role: USER_ROLES): PERMISSIONS[] => {
  return ROLE_PERMISSIONS[role];
};

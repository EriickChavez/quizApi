import Joi from 'joi';
import { USER_ROLES } from '../enums/roles';

/**
 * Esquema de validación para registro de usuario
 */
export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),

  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required'
    }),

  role: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .optional()
    .messages({
      'any.only': `Role must be one of: ${Object.values(USER_ROLES).join(', ')}`
    })
});

/**
 * Esquema de validación para login
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .lowercase()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
});

/**
 * Esquema de validación para registro de admin (más estricto)
 */
export const registerAdminSchema = registerSchema.keys({
  role: Joi.string()
    .valid(USER_ROLES.ADMIN, USER_ROLES.MODERATOR)
    .required()
    .messages({
      'any.only': 'Role must be admin or moderator',
      'any.required': 'Role is required for admin registration'
    }),

  // Contraseña más estricta para admins
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])'))
    .required()
    .messages({
      'string.min': 'Admin password must be at least 8 characters long',
      'string.pattern.base': 'Admin password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    })
});

/**
 * Esquema de validación para registro de teacher
 */
export const registerTeacherSchema = registerSchema.keys({
  role: Joi.string()
    .valid(USER_ROLES.TEACHER)
    .default(USER_ROLES.TEACHER)
});

/**
 * Esquema de validación para cambio de rol (solo admins)
 */
export const changeRoleSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    }),

  newRole: Joi.string()
    .valid(...Object.values(USER_ROLES))
    .required()
    .messages({
      'any.only': `Role must be one of: ${Object.values(USER_ROLES).join(', ')}`,
      'any.required': 'New role is required'
    }),

  reason: Joi.string()
    .trim()
    .max(500)
    .optional()
    .messages({
      'string.base': 'Reason must be a string',
      'string.max': 'Reason cannot exceed 500 characters'
    })
});

/**
 * Función helper para validar datos de registro
 */
export const validateRegistration = (data: any, isAdminRegistration: boolean = false) => {
  const schema = isAdminRegistration ? registerAdminSchema : registerSchema;
  return schema.validate(data, { abortEarly: false });
};

/**
 * Función helper para validar datos de login
 */
export const validateLogin = (data: any) => {
  return loginSchema.validate(data, { abortEarly: false });
};

/**
 * Función helper para validar cambio de rol
 */
export const validateRoleChange = (data: any) => {
  return changeRoleSchema.validate(data, { abortEarly: false });
};

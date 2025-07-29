import { Request, Response, NextFunction } from 'express';
import { USER_ROLES, PERMISSIONS, hasPermission } from '../enums/roles';
import { sendResponse } from '../utils/apiResponse';

// Extender la interfaz Request para incluir información del usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: USER_ROLES;
      };
    }
  }
}

/**
 * Middleware para verificar que el usuario tenga un rol específico
 */
export const requireRole = (allowedRoles: USER_ROLES | USER_ROLES[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated to access this resource'
      });
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!roles.includes(user.role)) {
      return sendResponse(res, 403, 'Insufficient permissions', null, {
        code: 'INSUFFICIENT_PERMISSIONS',
        details: `Required role(s): ${roles.join(', ')}. Current role: ${user.role}`
      });
    }

    next();
  };
};

/**
 * Middleware para verificar que el usuario tenga un permiso específico
 */
export const requirePermission = (permission: PERMISSIONS) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated to access this resource'
      });
    }

    if (!hasPermission(user.role, permission)) {
      return sendResponse(res, 403, 'Insufficient permissions', null, {
        code: 'INSUFFICIENT_PERMISSIONS',
        details: `Required permission: ${permission}. User role: ${user.role} does not have this permission`
      });
    }

    next();
  };
};

/**
 * Middleware para verificar múltiples permisos (requiere TODOS)
 */
export const requireAllPermissions = (permissions: PERMISSIONS[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated to access this resource'
      });
    }

    const missingPermissions = permissions.filter(permission => 
      !hasPermission(user.role, permission)
    );

    if (missingPermissions.length > 0) {
      return sendResponse(res, 403, 'Insufficient permissions', null, {
        code: 'INSUFFICIENT_PERMISSIONS',
        details: `Missing permissions: ${missingPermissions.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Middleware para verificar múltiples permisos (requiere AL MENOS UNO)
 */
export const requireAnyPermission = (permissions: PERMISSIONS[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated to access this resource'
      });
    }

    const hasAnyPermission = permissions.some(permission => 
      hasPermission(user.role, permission)
    );

    if (!hasAnyPermission) {
      return sendResponse(res, 403, 'Insufficient permissions', null, {
        code: 'INSUFFICIENT_PERMISSIONS',
        details: `Required at least one of: ${permissions.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Middleware para verificar si el usuario es admin
 */
export const requireAdmin = requireRole(USER_ROLES.ADMIN);

/**
 * Middleware para verificar si el usuario es admin o moderador
 */
export const requireAdminOrModerator = requireRole([USER_ROLES.ADMIN, USER_ROLES.MODERATOR]);

/**
 * Middleware para verificar si el usuario es teacher, admin o moderador
 */
export const requireTeacherOrAbove = requireRole([
  USER_ROLES.TEACHER, 
  USER_ROLES.MODERATOR, 
  USER_ROLES.ADMIN
]);

/**
 * Middleware para verificar que el usuario esté activo
 */
export const requireActiveUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return sendResponse(res, 401, 'Authentication required', null, {
      code: 'AUTH_REQUIRED',
      details: 'User must be authenticated to access this resource'
    });
  }

  // Nota: Aquí asumiríamos que el middleware de autenticación ya verificó que el usuario esté activo
  // o podríamos hacer una consulta adicional a la base de datos si es necesario
  next();
};

/**
 * Middleware para verificar que el usuario sea el propietario del recurso o tenga permisos administrativos
 */
export const requireOwnershipOrAdmin = (userIdField: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const resourceUserId = req.params[userIdField] || req.body[userIdField];

    if (!user) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated to access this resource'
      });
    }

    // Si es admin o moderador, puede acceder a cualquier recurso
    if (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.MODERATOR) {
      return next();
    }

    // Si no es admin/moderador, debe ser el propietario del recurso
    if (user.id !== resourceUserId) {
      return sendResponse(res, 403, 'Access denied', null, {
        code: 'ACCESS_DENIED',
        details: 'You can only access your own resources'
      });
    }

    next();
  };
};

import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/apiResponse";
import { userServiceInstance } from "../../services/instances/userServiceInstance";
import { hashPassword } from "../../config/auth";
import { authServiceInstance } from "../../services/instances/authServiceInstance";
import { USER_ROLES } from "../../enums/roles";

interface RegisterRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    role?: USER_ROLES; // Opcional, por defecto será STUDENT
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

/**
 * Registro de usuario con rol
 */
export const register = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar que el rol sea válido si se proporciona
    const userRole = role && Object.values(USER_ROLES).includes(role) 
      ? role 
      : USER_ROLES.STUDENT;

    // Solo los admins pueden crear usuarios con roles admin o moderator
    if ((role === USER_ROLES.ADMIN || role === USER_ROLES.MODERATOR) && req.user?.role !== USER_ROLES.ADMIN) {
      return sendResponse(res, 403, 'Insufficient permissions to create user with this role', null, {
        code: 'INSUFFICIENT_PERMISSIONS',
        details: 'Only administrators can create admin or moderator accounts'
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userServiceInstance.registerUser({
      name,
      email,
      passwordHash: hashedPassword,
      role: userRole,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = authServiceInstance.generateAuthToken({ 
      id: newUser._id?.toString() || '', 
      email: newUser.email,
      role: newUser.role
    });

    // Usar el método toSafeObject si está disponible
    const safeUser = newUser.toSafeObject ? newUser.toSafeObject() : {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    sendResponse(res, 201, 'User registered successfully', { 
      user: safeUser, 
      token 
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return sendResponse(res, 400, 'Email already exists', null, {
        code: 'DUPLICATE_EMAIL',
        details: 'A user with this email already exists'
      });
    }
    next(error);
  }
};

/**
 * Login de usuario
 */
export const login = async (
  req: LoginRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await authServiceInstance.login(email, password);

    sendResponse(res, 200, 'Login successful', result);
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return sendResponse(res, 401, 'Invalid credentials', null, {
        code: 'INVALID_CREDENTIALS',
        details: 'Email or password is incorrect'
      });
    }

    if (error.message === 'Account is deactivated') {
      return sendResponse(res, 401, 'Account deactivated', null, {
        code: 'ACCOUNT_DEACTIVATED',
        details: 'This account has been deactivated'
      });
    }

    next(error);
  }
};

/**
 * Obtener información del usuario autenticado
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, 401, 'Authentication required', null, {
        code: 'AUTH_REQUIRED',
        details: 'User must be authenticated'
      });
    }

    const user = await userServiceInstance.getUserById(userId);

    if (!user) {
      return sendResponse(res, 404, 'User not found', null, {
        code: 'USER_NOT_FOUND',
        details: 'User not found'
      });
    }

    const safeUser = user.toSafeObject ? user.toSafeObject() : {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    sendResponse(res, 200, 'User information retrieved', safeUser);
  } catch (error) {
    next(error);
  }
};

/*
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authServiceInstance.signup(email, password);
    sendResponse(res, 201, "User registered successfully", user);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.VALIDATION_ERROR,
      details: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authServiceInstance.login(email, password);
    sendResponse(res, 200, "Login successful", { user, token });
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_CREDENTIALS,
      details: error.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = await authServiceInstance.forgotPassword(email);
    sendResponse(res, 200, "Password reset token sent", resetToken);
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_CREDENTIALS,
      details: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authServiceInstance.resetPassword(token, newPassword);
    sendResponse(res, 200, "Password reset successful");
  } catch (error: any) {
    logger.error(error.message);
    sendResponse(res, 400, error.message, null, {
      code: ERROR_CODES.INVALID_RESET_TOKEN,
      details: error.message,
    });
  }
};
*/
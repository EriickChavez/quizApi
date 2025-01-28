import rateLimit from "express-rate-limit";

// Configuración básica de rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP en 15 minutos
  message: {
    success: false,
    message: "Too many requests, please try again later.",
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      details:
        "You have exceeded the allowed number of requests. Please wait and try again.",
    },
  },
  standardHeaders: true, // Devuelve información del rate limit en los headers
  legacyHeaders: false, // Desactiva los headers obsoletos
});

import { UnauthorizedError, ForbiddenError } from '../../../domain/errors/DomainErrors.js';

// Verifica el JWT en CADA peticion (nunca confiar, siempre verificar)
export function authenticate(tokenService) {
  return (req, _res, next) => {
    const [scheme, token] = (req.get('authorization') ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) {
      return next(new UnauthorizedError('Falta el token de acceso'));
    }
    try {
      const payload = tokenService.verify(token);
      req.auth = {
        userId: payload.sub,
        username: payload.username,
        role: payload.role,
        expiresAt: new Date(payload.exp * 1000).toISOString(),
      };
      next();
    } catch (err) {
      next(err);
    }
  };
}

// Minimo privilegio: solo los roles indicados pasan
export function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return next(new ForbiddenError());
    }
    next();
  };
}

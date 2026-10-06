import { InvalidCredentialsError, ValidationError } from '../../../domain/errors/DomainErrors.js';

const USERNAME_RE = /^[a-zA-Z0-9._-]{3,50}$/;
const clean = (v) => String(v).replace(/[^\w.@-]/g, '?').slice(0, 50);

// Validacion de la peticion: nada entra al caso de uso sin revisarse
function validateLogin(body) {
  const { username, password } = body ?? {};
  if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
    throw new ValidationError('El usuario tiene un formato inválido');
  }
  if (typeof password !== 'string' || password.length < 1 || password.length > 128) {
    throw new ValidationError('La contraseña tiene un formato inválido');
  }
  return { username, password };
}

export class AuthController {
  constructor({ loginUser }) {
    this.loginUser = loginUser;
  }

  login = async (req, res, next) => {
    try {
      const credentials = validateLogin(req.body);
      const result = await this.loginUser.execute(credentials);
      console.info(`[AUTH_OK] ${new Date().toISOString()} ip=${req.ip} user=${clean(result.user.username)}`);
      res.json(result);
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        console.warn(`[AUTH_FAIL] ${new Date().toISOString()} ip=${req.ip} user=${clean(req.body?.username ?? '')}`);
      }
      next(err);
    }
  };
}

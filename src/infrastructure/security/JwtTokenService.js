import jwt from 'jsonwebtoken';
import { TokenService } from '../../domain/ports/TokenService.js';
import { UnauthorizedError } from '../../domain/errors/DomainErrors.js';

export class JwtTokenService extends TokenService {
  constructor({ secret, expiresIn, issuer, audience }) {
    super();
    this.secret = secret;
    this.expiresIn = expiresIn;
    this.issuer = issuer;
    this.audience = audience;
  }

  sign({ sub, username, role }) {
    return jwt.sign({ username, role }, this.secret, {
      algorithm: 'HS256',
      subject: String(sub),
      expiresIn: this.expiresIn,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  verify(token) {
    try {
      return jwt.verify(token, this.secret, {
        algorithms: ['HS256'], // nunca aceptar "none" ni otro algoritmo
        issuer: this.issuer,
        audience: this.audience,
      });
    } catch {
      throw new UnauthorizedError('Token inválido o expirado');
    }
  }
}

import { UnauthorizedError } from '../../domain/errors/DomainErrors.js';

export class GetDashboard {
  constructor({ userRepository, systemInfo }) {
    this.userRepository = userRepository;
    this.systemInfo = systemInfo;
  }

  async execute({ userId, tokenExpiresAt }) {
    // Zero Trust: aunque el token sea valido, se vuelve a comprobar que el usuario exista
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedError('El usuario del token ya no es valido');

    return {
      user: user.toPublic(),
      tokenExpiresAt,
      checks: [
        { name: 'Conexión cifrada', detail: 'La petición llegó por HTTPS al proxy Nginx' },
        { name: 'Token verificado', detail: 'Firma HS256, emisor, audiencia y expiración válidos' },
        { name: 'Usuario revalidado', detail: 'El usuario del token existe en este momento' },
        { name: 'Rol autorizado', detail: `El rol "${user.role}" tiene permiso para el dashboard` },
      ],
      backend: this.systemInfo.describe(),
    };
  }
}

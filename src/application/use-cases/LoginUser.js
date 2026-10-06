import { InvalidCredentialsError } from '../../domain/errors/DomainErrors.js';

export class LoginUser {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ username, password }) {
    const user = await this.userRepository.findByUsername(username);
    // Se compara aunque el usuario no exista, para no revelar si existe
    const valid = await this.passwordHasher.compare(password, user?.passwordHash ?? null);
    if (!user || !valid) throw new InvalidCredentialsError();

    const token = this.tokenService.sign({
      sub: user.id,
      username: user.username,
      role: user.role,
    });
    return { token, user: user.toPublic() };
  }
}

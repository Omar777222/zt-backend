import { UserRepository } from '../../domain/ports/UserRepository.js';
import { User } from '../../domain/entities/User.js';

// Adaptador de persistencia. Se puede cambiar por MySQL/DynamoDB sin tocar el dominio.
export class InMemoryUserRepository extends UserRepository {
  constructor(seedUsers = []) {
    super();
    this.users = new Map(seedUsers.map((u) => [String(u.id), new User(u)]));
  }

  async findByUsername(username) {
    for (const user of this.users.values()) {
      if (user.username === username) return user;
    }
    return null;
  }

  async findById(id) {
    return this.users.get(String(id)) ?? null;
  }
}

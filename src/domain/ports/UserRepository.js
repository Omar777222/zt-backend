// PUERTO (interfaz): el dominio dice QUE necesita, la infraestructura decide COMO.
export class UserRepository {
  async findByUsername(_username) { throw new Error('No implementado'); }
  async findById(_id) { throw new Error('No implementado'); }
}

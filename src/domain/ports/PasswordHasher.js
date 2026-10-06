export class PasswordHasher {
  // Debe devolver false si hash es null, tardando lo mismo (evita enumerar usuarios)
  async compare(_plain, _hash) { throw new Error('No implementado'); }
}

// Entidad de dominio: no sabe nada de Express, JWT ni bases de datos.
export class User {
  constructor({ id, username, passwordHash, role }) {
    this.id = String(id);
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
    Object.freeze(this);
  }

  // Datos que se pueden mostrar fuera del sistema (nunca el hash)
  toPublic() {
    return { id: this.id, username: this.username, role: this.role };
  }
}

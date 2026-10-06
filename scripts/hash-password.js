import bcrypt from 'bcryptjs';

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error('Uso: npm run hash -- "TuPassword"   (minimo 8 caracteres)');
  process.exit(1);
}
console.log(bcrypt.hashSync(password, 12));

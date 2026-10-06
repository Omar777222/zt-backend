import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name} (revisa tu archivo .env)`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? '127.0.0.1',
  trustProxy: process.env.TRUST_PROXY ?? 'loopback',
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
    issuer: process.env.JWT_ISSUER ?? 'zt-backend',
    audience: process.env.JWT_AUDIENCE ?? 'zt-frontend',
  },
  seedUser: {
    username: required('SEED_USERNAME'),
    passwordHash: required('SEED_PASSWORD_HASH'),
    role: process.env.SEED_ROLE ?? 'admin',
  },
};

if (config.jwt.secret.length < 32) {
  throw new Error('JWT_SECRET debe tener al menos 32 caracteres');
}

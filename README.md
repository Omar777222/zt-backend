# zt-backend

API REST en Node.js + Express con arquitectura hexagonal (puertos y adaptadores) y JWT.

```
src/
  domain/          Entidades, errores y puertos (sin dependencias externas)
  application/     Casos de uso: LoginUser, GetDashboard
  infrastructure/  Adaptadores: Express (http), bcrypt/JWT (security), memoria (persistence)
  container.js     Conecta puertos con adaptadores
```

## Ejecutar
1. `npm install`
2. Copiar `.env.example` a `.env` y llenar `JWT_SECRET` y `SEED_PASSWORD_HASH` (`npm run hash -- "TuPassword"`)
3. `npm run dev`

## Endpoints
| Metodo | Ruta | Protegido |
|---|---|---|
| GET | /api/health | No |
| POST | /api/auth/login | No |
| GET | /api/dashboard | Si (Bearer JWT) |

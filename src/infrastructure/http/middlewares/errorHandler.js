import { DomainError } from '../../../domain/errors/DomainErrors.js';

const STATUS_BY_CODE = {
  VALIDATION_ERROR: 400,
  INVALID_CREDENTIALS: 401,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export function errorHandler(err, _req, res, _next) {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Petición demasiado grande' });

  if (err instanceof DomainError) {
    return res.status(STATUS_BY_CODE[err.code] ?? 400).json({ error: err.message });
  }

  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Error interno del servidor' });
}

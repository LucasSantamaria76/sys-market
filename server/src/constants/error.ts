export const ERROR_CODES: { [key: string]: any } = {
  P2002: 'Duplicidad encontrada (unique constrain)',
};

export const ERROR_TOKEN: { [key: string]: any } = {
  JsonWebTokenError: {
    'invalid token': 'Token/Error en header',
    'invalid signature': 'Token/Firma inválida',
    'jwt signature is required': 'Token/Se requiere firma jwt',
    'jwt malformed': 'Token/jwt malformado',
  },
  TokenExpiredError: { 'jwt expired': 'Token/Expirado' },
  NotBeforeError: { 'jwt not active': 'Token/jwt no activo' },
  Error: { Unauthorized: 'Unauthorized/Bearer token inexistente' },
};

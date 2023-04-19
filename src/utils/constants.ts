export const ROUTE_PREFIX = '/api/v1';
export const JWT_EXPIRATION_TIME = '1h';
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = '1d';

export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

export const DATE_FORMAT_REGEX =
  /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

/**
 * Server configuration object type definition
 */
export interface Config {
  port?: number;
  mongoUri?: string;
  jwtSecret?: string;
  jwtRefreshSecret?: string;
  nodeEnv?: string;
}

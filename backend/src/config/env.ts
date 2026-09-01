import 'dotenv/config';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? 'development';
const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`Invalid PORT environment variable: ${process.env.PORT}`);
}

const defaultJwtSecret = 'feedback_analyzer_super_secret_jwt_key_2026';
const jwtSecret = process.env.JWT_SECRET ?? (nodeEnv === 'production'
  ? requireEnv('JWT_SECRET')
  : defaultJwtSecret);
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

export const env = {
  nodeEnv,
  port,
  isProduction: nodeEnv === 'production',
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret,
  jwtExpiresIn,
};

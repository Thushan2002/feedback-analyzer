import "dotenv/config";
import { log } from "node:console";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const nodeEnv = process.env.NODE_ENV ?? "development";
const port = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(port) || port <= 0) {
  throw new Error(`Invalid PORT environment variable: ${process.env.PORT}`);
}

export const env = {
  nodeEnv,
  port,
  isProduction: nodeEnv === "production",
  databaseUrl: requireEnv("DATABASE_URL"),
};

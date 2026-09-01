import { PrismaPg } from '@prisma/adapter-pg';

import { env } from '../config/env.js';
import { PrismaClient } from '../generated/prisma/client.js';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: env.databaseUrl,
    }),
  });

if (env.nodeEnv !== 'production') {
  globalForPrisma.prisma = prisma;
}

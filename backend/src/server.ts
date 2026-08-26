import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';

const server = app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port} [${env.nodeEnv}]`);
});

async function shutdown(signal: string): Promise<void> {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(async (err) => {
    await prisma.$disconnect();

    if (err) {
      console.error('Error while closing server:', err);
      process.exit(1);
    }

    process.exit(0);
  });
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

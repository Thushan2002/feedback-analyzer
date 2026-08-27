import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';
import { logger } from './utils/logger/logger.js';

const server = app.listen(env.port, () => {
  logger.info(`Server running at http://localhost:${env.port} [${env.nodeEnv}]`);
});

async function shutdown(signal:string): Promise<void> {
  logger.info(`${signal} received. Shutting down gracefully...`);
  try {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    })
    await prisma.$disconnect()
    logger.info('Closed out remaining connections.');
    process.exit(0);
  } catch (err) {
    logger.error(err, 'Error during graceful shutdown:')
    process.exit(1);
  }
}    

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {                                                                                                       
  logger.fatal({ err: reason instanceof Error ? reason : new Error(String(reason)) }, 'Unhandled promise rejection');                                
  process.exit(1);                                                                                                                                   
});

process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught exception');
  process.exit(1);
});

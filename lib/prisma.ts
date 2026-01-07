import { PrismaClient } from '@prisma/client';

/**
 * Axis by Sakura - Sovereign Prisma Engine (v3.0)
 * Hardened for Concurrent Automated Testing & Hot-Reload Persistence
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export function getPrisma() {
  // Build-time circuit breaker
  if (!process.env.DATABASE_URL) {
    // We return a mock-ready client or throw only in runtime to prevent build-phase crashes
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return {} as PrismaClient;
    }
    throw new Error('DATABASE_URL_NOT_SET: Infrastructure missing critical connection string.');
  }

  // Persistent Singleton Pattern
  // In development, we attach Prisma to the 'global' object so it survives Hot Reloads.
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development'
        ? ['error', 'warn'] // Removed 'query' to keep the Playwright logs readable
        : ['error'],
      errorFormat: 'pretty',
    });
  }

  return globalForPrisma.prisma;
}

// Ensure Prisma connects once and stays active
const prisma = getPrisma();

export default prisma;

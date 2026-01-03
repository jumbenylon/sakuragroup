import { PrismaClient } from '@prisma/client';

/**
 * Axis by Sakura - Sovereign Prisma Engine (v2.10)
 * Hardened for Build-Time Resilience & Legacy Compatibility
 */

let prisma: PrismaClient | undefined;

export function getPrisma() {
  // Build-time circuit breaker
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL_NOT_SET: Infrastructure is in build-mode or env vars are missing.');
  }

  // Singleton pattern: Ensure only one client instance exists
  if (!prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    });
  }

  return prisma;
}

// Default Export for legacy compatibility
const safeExport = process.env.DATABASE_URL ? getPrisma() : (undefined as unknown as PrismaClient);
export default safeExport;

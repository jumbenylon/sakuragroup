import { PrismaClient } from '@prisma/client';

/**
 * Axis by Sakura - Sovereign Prisma Engine (v4.0)
 * Logic: Named export for Treasury API compatibility + Build-phase safety.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export function getPrisma() {
  // Build-time circuit breaker to prevent Step 17 crashes
  if (!process.env.DATABASE_URL) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return {} as PrismaClient;
    }
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      errorFormat: 'pretty',
    });
  }

  return globalForPrisma.prisma;
}

// 🟢 Named export 'prisma' is required for the Treasury API routes
export const prisma = getPrisma();

// Default export for legacy compatibility
export default prisma;

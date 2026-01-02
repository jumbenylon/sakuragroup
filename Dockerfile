# 1. Base Image
FROM node:18-alpine AS base

# 2. Dependencies
FROM base AS deps
# Install libc6-compat and openssl for Prisma/Alpine compatibility
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy Prisma schema first to allow caching of the generation step
COPY prisma ./prisma/

# Copy package manifests
COPY package.json package-lock.json* ./

# Install dependencies (This triggers 'postinstall' -> 'prisma generate')
RUN npm install

# 3. Builder
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
# Note: Ensure 'binaryTargets' in schema.prisma includes "linux-musl"
RUN npm run build

# 4. Runner (Production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# CRITICAL: Install OpenSSL in the Runner stage (Prisma needs this to talk to Neon)
RUN apk add --no-cache openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# --- AUTO-SYNC SETUP ---

# 1. Copy the Schema (Required for 'prisma db push')
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# 2. Install Prisma CLI globally so we can run migration commands
#    (We do this before switching users to ensure permissions)
RUN npm install -g prisma

# -----------------------

# Copy the standalone build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# CHANGED: The "Self-Healing" Start Command
# Attempts to push the schema to Neon. If successful, starts the server.
CMD ["/bin/sh", "-c", "prisma db push --accept-data-loss && node server.js"]

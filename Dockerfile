# 1. Base Image: Ensuring OpenSSL 3.0 compatibility for Neon/Postgres
FROM node:18-slim AS base
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

# 2. Dependencies: Prisma-first installation
FROM base AS deps
WORKDIR /app
COPY prisma ./prisma/
COPY package.json package-lock.json* ./
# We use ci for deterministic builds in production
RUN npm ci 

# 3. Builder: Compiling the Sovereign Engine
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma Client specifically for the debian-slim runtime
RUN npx prisma generate
RUN npm run build

# 4. Runner: The "Expensive" Production Environment
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Re-verify OpenSSL for the runtime stage
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 1001 nodejs
RUN useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

# CRITICAL: Copy the public folder so logos and videos actually work
COPY --from=builder /app/public ./public

# Set up standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Required for Prisma to function in standalone mode
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The command starts the server
CMD ["node", "server.js"]

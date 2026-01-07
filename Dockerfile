# 1. Base Image: Premium infrastructure start
FROM node:18-slim AS base
RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*

# 2. Dependencies: Networking Hardening
FROM base AS deps
WORKDIR /app

# [FIX] Senior Resilience: Handling the ECONNRESET and network timeouts
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set maxsockets 10

COPY prisma ./prisma/
COPY package.json package-lock.json* ./

# Use 'npm ci' for faster, more reliable builds in CI environments
RUN npm ci || npm install

# 3. Builder: Functional Purity
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# [TRICK] Build-time placeholders
ENV DATABASE_URL="postgresql://placeholder:5432/db"
ENV NEXT_TELEMETRY_DISABLED=1

# Ensure asset directories exist
RUN mkdir -p public

RUN npx prisma generate
RUN npm run build

# 4. Runner: Production Prowess
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# [FIX] Final Runtime Hardening
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

# Resilience: Cleanly copying only what is needed for the 200 OK experience
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

# 1. Base Image
FROM node:18-alpine AS base

# 2. Dependencies
FROM base AS deps
# Adding compat libraries for Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app
COPY prisma ./prisma/
COPY package.json package-lock.json* ./
RUN npm install

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install OpenSSL 3.0 and the legacy compat if needed
RUN apk add --no-cache openssl libstdc++

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the Schema and Prisma CLI
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
RUN npm install -g prisma

# Copy Standalone Build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# We use a slight delay to ensure DB is reachable, then push and start
CMD ["/bin/sh", "-c", "prisma db push --accept-data-loss && node server.js"]

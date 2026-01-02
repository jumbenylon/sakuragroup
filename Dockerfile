# 1. Base Image
FROM node:18-alpine AS base

# 2. Dependencies
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# Added 'openssl' to ensure Prisma Client functions correctly on Alpine Linux.
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy Prisma schema specifically for the postinstall step
COPY prisma ./prisma/

# Copy package manifests
COPY package.json package-lock.json* ./

# Install dependencies (triggered postinstall will now find schema.prisma)
RUN npm install

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# CRITICAL ADDITION: Copy the public folder.
# Standalone mode excludes this by default, breaking favicons/manifests.
COPY --from=builder /app/public ./public

# Copy the standalone build
# This includes the server, node_modules, and configured env vars
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]

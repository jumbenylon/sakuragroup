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

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# OPTIONAL: If you create a 'public' folder later (favicons, etc.), uncomment this:
# COPY --from=builder /app/public ./public

# Copy the standalone build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]

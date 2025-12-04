# syntax=docker/dockerfile:1

FROM node:21-alpine AS deps
WORKDIR /app

# copy only lockfile(s) first to leverage build cache
COPY package.json package-lock.json ./

# reproducible, fast, small: install only production deps
RUN npm ci --omit=dev

# -------- final runtime image --------
FROM node:21-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# copy installed deps from deps stage
COPY --from=deps /app/node_modules ./node_modules

# copy app source
COPY . .

# change ownership (if needed)
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

# optional lightweight healthcheck (customize path)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
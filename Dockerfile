# Stage 1: Build Stage
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:22-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY .env .
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

EXPOSE 3000

CMD ["pnpm", "start"]
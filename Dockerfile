# Builder Stage
FROM node:18-alpine AS builder

WORKDIR /app

# ติดตั้ง pnpm
RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Production Stage 
FROM node:18-alpine AS production

WORKDIR /app

# ติดตั้ง pnpm
RUN npm install -g pnpm

# Copy the built artifacts from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Set the environment variables (if needed)
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
FROM node:22-alpine

ENV NODE_ENV=production

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "run", "start"]

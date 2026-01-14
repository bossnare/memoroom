# -------- Base ---------
FROM node:20-alpine AS base
WORKDIR /app

# -------- Dependencies ---------
FROM base AS deps
RUN npm install -g bun

COPY package.json bun.lock ./
RUN bun install

# -------- Build ---------
FROM deps AS build
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL 

RUN bunx prisma generate
RUN bun run build

# -------- Production ---------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=build /app/prisma ./prisma

EXPOSE 3000
CMD [ "node", "dist/src/main.js" ]



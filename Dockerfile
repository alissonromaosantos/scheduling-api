FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS runner
RUN npm run build
EXPOSE 3333
CMD ["node", "dist/server.js"]

LABEL org.opencontainers.image.source="https://github.com/panindar/Contact-keeper"

FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
USER node
CMD ["node", "server.js"]
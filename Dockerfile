FROM node:22-slim
LABEL org.opencontainers.image.source="https://github.com/panindar/Contact-keeper"
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
USER node
CMD ["node", "server.js"]
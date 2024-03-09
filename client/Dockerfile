# Stage 1: Build the application
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Set up the production environment
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/build /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public /app
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "run", "start"]
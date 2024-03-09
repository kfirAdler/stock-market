# Stage 1: Build React app
FROM node:14.7.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY public/ public/
COPY src/ src/
RUN npm run build

# Stage 2: Build production image
FROM node:13.12.0-alpine3.11 as production
WORKDIR /app
COPY --from=build /app/build/ ./build/
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --production

# Stage 3: Final image
FROM node:13.12.0-alpine3.11
WORKDIR /app
COPY --from=production /app ./
COPY backend /app/backend

# Install nginx
RUN apk --no-cache add nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
EXPOSE 80

# Set up entrypoint
RUN ["chmod", "+x", "/app/backend/app/runCommands.sh"]
ENTRYPOINT ["/app/backend/app/runCommands.sh"]

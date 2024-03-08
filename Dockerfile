# Stage 1: Build TypeScript React App
FROM node:13.12.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Create the Nginx Server
FROM node:13.12.0-alpine3.11
RUN apk update && apk add nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Create necessary directories
RUN mkdir -p /run/nginx

# Expose port 80
EXPOSE 80

# Running the API server
FROM node:13.12.0-alpine3.11
COPY --from=build /app ./
RUN npm install --legacy-peer-deps

# ... (add the rest of your configurations)

# Make sure to have only one ENTRYPOINT or CMD in your Dockerfile.
# Choose one depending on your use case.
ENTRYPOINT ["/backend/app/runCommands.sh"]
# or CMD ["npm", "start"]

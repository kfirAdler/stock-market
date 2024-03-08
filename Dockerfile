FROM node:14.7.0-alpine as base
WORKDIR /stock-market/
COPY public/ /stock-market/public
COPY src/ /stock-market/src
COPY package.json /stock-market/
RUN npm install --legacy-peer-deps
RUN apk update 
RUN apk add nginx
COPY . .

RUN mkdir -p usr/share/nginx
RUN mkdir -p usr/share/nginx/html
# COPY build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
EXPOSE 80

FROM base as production
RUN npm run build

# running the API server
FROM node:13.12.0-alpine3.11
COPY --from=production /stock-market /stock-market
WORKDIR /stock-market
RUN npm install --legacy-peer-deps
RUN apk update

RUN ["chmod", "+x", "/stock-market/backend/app/runCommands.sh"]
ENTRYPOINT ["/stock-market/backend/app/runCommands.sh"]

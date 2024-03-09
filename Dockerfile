FROM node:14.7.0-alpine as base
WORKDIR /stock-market/
COPY package.json /stock-market/
RUN apk --no-cache add nginx && \
    npm install --legacy-peer-deps && \
    rm -rf /var/cache/apk/*
COPY public/ /stock-market/public
COPY src/ /stock-market/src
COPY . .

RUN mkdir -p usr/share/nginx
RUN mkdir -p usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
EXPOSE 80

WORKDIR /stock-market/backend/app

FROM base as production
RUN npm run build

FROM node:13.12.0-alpine3.11
COPY --from=production /stock-market /stock-market
WORKDIR /stock-market
RUN npm install --legacy-peer-deps
RUN apk del .build-deps  # Clean up unnecessary packages

RUN ["chmod", "+x", "/stock-market/backend/app/runCommands.sh"]
ENTRYPOINT ["/stock-market/backend/app/runCommands.sh"]

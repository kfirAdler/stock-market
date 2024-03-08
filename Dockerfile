## running the Client
# FROM node:13.12.0-alpine
# COPY ./ ./
# RUN npm install --legacy-peer-deps --silent
# RUN npm install react-scripts@3.4.1 -g --silent 
# RUN npm run build
# ENTRYPOINT ["npm", "start"]



FROM node:14.7.0-alpine as build
RUN apk update 
RUN apk add nginx
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm run build
RUN mkdir -p usr/share/nginx
RUN mkdir -p usr/share/nginx/html
COPY build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /run/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
EXPOSE 80
# running the API server
FROM node:13.12.0-alpine3.11
COPY --from=build ./ ./
COPY ./ ./
RUN npm install --legacy-peer-deps
RUN apk update
#RUN apk add ruby
#RUN gem install fernet-cli
#RUN apk add --no-cache \
#    python3 \
#    py3-pip \
#    && pip3 install --upgrade pip \
#    && pip3 install \
#    awscli \
#    && rm -rf /var/cache/apk/*

#RUN aws --version 

RUN ["chmod", "+x", "/backend/app/runCommands.sh"]
ENTRYPOINT ["/backend/app/runCommands.sh"]
